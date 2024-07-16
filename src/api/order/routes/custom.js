module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/send/form',
        handler: 'order.sendFormMail',
        config: {
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/send/greeting',
        handler: 'order.sendGreetingMail',
        config: {
          auth: false,
        },
      },
    ],
  };