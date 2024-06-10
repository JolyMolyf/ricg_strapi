module.exports = ({ env }) => ({
    // ...
    "strapi-google-auth": {
      enabled: true,
    },
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMPT_SERVER', 'smtp.example.com'),
          port: env('SMTP_PORT', 587),
          auth: {
            user: env('SENDER_EMAIL'),
            pass: env('SENDER_PASSWORD'),
          },
        },
        settings: {
          defaultFrom: 'info@szkolenia.ricg.eu',
          defaultReplyTo: 'info@szkolenia.ricg.eu',
        },
      },
    },
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    // ...
  });