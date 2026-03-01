import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::contact-request.contact-request',
  ({ strapi }) => ({

    async create(ctx) {
      const response = await super.create(ctx);
      const { name, email, phone, message, type, project } = ctx.request.body.data;
      const service = strapi.service('api::contact-request.contact-request');

      await service.sendNotificationEmail({ name, email, phone, message, type, project });
      await service.sendConfirmationEmail({ name, email, type, project });

      return response;
    },

  })
);