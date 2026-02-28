/**
 * contact-request controller
 */

import { factories } from '@strapi/strapi';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default factories.createCoreController(
  'api::contact-request.contact-request',
  ({ strapi }) => ({

    async create(ctx) {
      const response = await super.create(ctx);

      const { name, email, phone, message } = ctx.request.body.data;

      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: 'jchubrega@gmail.com',
          subject: `Nuevo contacto de ${name}`,
          text: `
            Nombre: ${name}
            Email: ${email}
            Teléfono: ${phone}
            Mensaje: ${message}
          `,
        });

        strapi.log.info('Email enviado correctamente con Resend');

      } catch (error) {
        strapi.log.error('Error enviando email con Resend', error);
      }

      return response;
    },
  })
);