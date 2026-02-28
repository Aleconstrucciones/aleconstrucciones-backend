/**
 * contact-request service
 */

import { factories } from '@strapi/strapi';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default factories.createCoreService(
  'api::contact-request.contact-request',
  ({ strapi }) => ({

    async sendNotificationEmail(data: {
      name: string;
      email: string;
      phone?: string;
      message: string;
      type: string;
      option?: string;
    }) {

      const { name, email, phone, message, type, option } = data;

      const html = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
            
            <div style="background-color: #111827; color: #ffffff; padding: 20px;">
              <h2 style="margin: 0;">Nueva Solicitud de Contacto</h2>
            </div>

            <div style="padding: 30px;">
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Teléfono:</strong> ${phone || 'No especificado'}</p>
              <p><strong>Tipo:</strong> ${type}</p>

              <div style="margin-top: 20px;">
                <p><strong>Mensaje:</strong></p>
                <p style="background: #f9fafb; padding: 15px; border-radius: 6px;">
                  ${message}
                </p>
              </div>
            </div>
          </div>
        </div>
      `;

      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Contacto Web <onboarding@resend.dev>',
          to: 'jchubrega@gmail.com',
          replyTo: email,
          subject: `Nueva consulta - ${name} (${type})`,
          text:
                `Nueva consulta de ${name} - ${type} (${option})

                Nombre: ${name}
                Email: ${email}
                Teléfono: ${phone}
                Tipo: ${type}

                Mensaje:
                ${message}`,
          html,
        });

        strapi.log.info('Email enviado correctamente');
      } catch (error) {
        strapi.log.error('Error enviando email', error);
      }
    },

  })
);