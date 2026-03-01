/**
 * contact-request service
 */

import { factories } from '@strapi/strapi';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default factories.createCoreService(
  'api::contact-request.contact-request',
  ({ strapi }) => ({

    async sendConfirmationEmail(data: {
        name: string;
        email: string;
        type: string;
        project?: string;
        }) {
        const { name, email, type, project } = data;

        const isQuote = type?.toLowerCase().includes('cot');

        const dynamicMessage = isQuote
            ? `
            <p>
                Hemos recibido correctamente tu solicitud de <strong>cotización</strong>
                ${project ? `para el servicio <strong>${project}</strong>` : ''}.
            </p>
            <p>
                Nuestro equipo técnico evaluará la información y te enviará una propuesta detallada a la brevedad.
            </p>
            `
            : `
            <p>
                Hemos recibido correctamente tu consulta.
            </p>
            <p>
                Nuestro equipo se pondrá en contacto contigo dentro de las próximas 24 horas.
            </p>
            `;

        const html = `
            <div style="font-family: Arial, sans-serif; background-color: #f2f4f7; padding: 40px;">
            <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.06);">
                
                <div style="background: linear-gradient(90deg, #111827, #1f2937); color: #ffffff; padding: 24px;">
                <h2 style="margin: 0;">Confirmación de recepción</h2>
                </div>

                <div style="padding: 35px; color: #374151; font-size: 15px; line-height: 1.6;">
                <p>Hola <strong>${name}</strong>,</p>

                ${dynamicMessage}

                <div style="margin-top: 30px; padding: 18px; background: #f9fafb; border-radius: 8px;">
                    <p style="margin: 0 0 8px 0; font-weight: 600;">Resumen de tu solicitud:</p>
                    <p style="margin: 4px 0;"><strong>Tipo:</strong> ${type}</p>
                    ${project ? `<p style="margin: 4px 0;"><strong>Servicio:</strong> ${project}</p>` : ''}
                </div>

                <p style="margin-top: 30px;">
                    Si deseas agregar información adicional, simplemente responde este correo.
                </p>

                <p style="margin-top: 30px;">
                    Saludos cordiales,<br/>
                    <strong>Equipo de Atención</strong>
                </p>
                </div>

                <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
                Este es un mensaje automático de confirmación. Por favor no lo respondas si no es necesario.
                </div>

            </div>
            </div>
        `;

        await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Contacto Web <onboarding@resend.dev>',
            to: email,
            subject: isQuote
            ? `Recibimos tu solicitud de cotización${project ? ` - ${project}` : ''}`
            : 'Recibimos tu consulta',
            html,
            text: `
                Hola ${name},

                Recibimos correctamente tu ${isQuote ? 'solicitud de cotización' : 'consulta'}.
                ${project ? `Servicio: ${project}` : ''}

                Te responderemos a la brevedad.

                Saludos,
                Equipo de Atención
            `,
        });
        }

  })
);
