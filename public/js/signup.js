const $ = window.$;
// const nodemailer = require("nodemailer");

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    console.log('', email, password);
    $.post('/api/signup', {
      email: email,
      password: password
    })
      .then((response) => {
        console.log(response);
        //add nodemailer code here
        // async function main() {

        //   // create reusable transporter object using the default SMTP transport
        //   let transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //       user: process.env.node_mailer_email, // generated ethereal user
        //       pass: process.env.node_mailer_password, // generated ethereal password
        //     },
        //   });

        //   //verify connection configuration
        //   transporter.verify(function (error, success) {
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log("Server is ready to take our messages");
        //     }
        //   });

        //   // send mail with defined transport object
        //   let info = await transporter.sendMail({
        //     from: '"My Stream 👻" <mystreamwebsite@gmail.com>', // sender address
        //     to: email, // list of receivers
        //     subject: "Welcome to My Stream", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        //   });
        //   console.log("Message sent: %s", info.messageId);


        // };

        //sends user to their member homepage 
        window.location.replace('/members');

        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
});
