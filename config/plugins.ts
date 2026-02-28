export default ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_CLOUD_NAME"),
        api_key: env("CLOUDINARY_API_KEY"),
        api_secret: env("CLOUDINARY_API_SECRET"),
      },
    },
  },

  email: {
    config: {
      provider: "resend",
      providerOptions: {
        apiKey: env("RESEND_API_KEY")
      },
      settings: {
        defaultFrom: env("EMAIL_FROM", "onboarding@resend.dev"),
        defaultReplyTo: env("EMAIL_REPLY_TO", "onboarding@resend.dev"),
      },
    },
  },
});