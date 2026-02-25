/**
 * contact-request controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::contact-request.contact-request',
  ({ strapi }) => ({

    async create(ctx) {
      const response = await super.create(ctx);

      const { name, email, phone, message } = ctx.request.body.data;

      try {
        await strapi.plugins['email'].services.email.send({
          to: 'jchubrega@gmail.com',
          subject: `Nuevo contacto de ${name}`,
          text: `
            Nombre: ${name}
            Email: ${email}
            Teléfono: ${phone}
            Mensaje: ${message}
          `,
        });
      } catch (error) {
        strapi.log.error('Error enviando email', error);
      }

      return response;
    },
  })
);