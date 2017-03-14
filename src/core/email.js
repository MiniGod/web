/* eslint-disable import/prefer-default-export */
import { createTransport } from 'nodemailer';
import { AWS_SES } from '../config';
import { Submission } from '../data/models';
import reviewTemplate from '../data/emailTemplates/review.handlebars';

export const sendReviewEmail = async (email, submissionId) => {
  console.log('Sending grant review email', email, submissionId);

  const submission = await Submission.findOne({
    id: submissionId,
  });

  if (!submission) throw Error('Submission not found');

  const transport = createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
      user: AWS_SES.user,
      pass: AWS_SES.password,
    },
  });

  const html = reviewTemplate({
    id: submission.id,
    name: submission.name,
    phone: submission.phone,
    email: submission.email,
    askAmount: submission.askAmount,
    totalCost: submission.totalCost,
  });

  const mailOptions = {
    html,
    from: 'Community Fund <hello@communityfund.co>',
    to: 'Kristjan <kristjanmik@gmail.com>',
    subject: 'New grant application',
  };

  // send mail with defined transport object
  transport.sendMail(mailOptions, (error /* , response */) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent');
    }

    transport.close(); // shut down the connection pool, no more messages
  });
};
