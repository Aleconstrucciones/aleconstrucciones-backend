import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::contact-request.contact-request',
  ({ strapi }) => ({

    async create(ctx) {
      const response = await super.create(ctx);

      const { name, email, phone, message, type } = ctx.request.body.data;

      await strapi
        .service('api::contact-request.contact-request')
        .sendNotificationEmail({ name, email, phone, message, type });

      return response;
    },

  })
);