if (!process.env.IS_BROWSER) {
  var email = require('../../server/email');
  var config = require('../../config/config.email');
}

export default {
  sendContact: (values) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        replyTo: values.email,
        to: config.recipient,
        subject: 'New message on Relational Dataset Repository',
        html: `
          <p><strong>From:</strong> <a href="mailto:${values.email}">${values.email}</a></p>
          <p><strong>Message:</strong> ${values.message}</p>
        `
      };

      email.sendMail(mailOptions, (error, info) => {
        if (error) return reject(error);
        return resolve(true);
      });
    });
  }
};
