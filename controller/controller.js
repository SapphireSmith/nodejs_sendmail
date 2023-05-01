const nodemailer = require('nodemailer');
const { PASSWORD, EMAIL } = require('../env');
const Mailgen = require('mailgen');


//** Sending email using test account */
const signUp = async (req, res) => {

   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing
   let testAccount = await nodemailer.createTestAccount();

   // console.log(testAccount.user);
   // console.log(testAccount.pass);

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: testAccount.user, // generated ethereal user
         pass: testAccount.pass, // generated ethereal password
      },
   });


   //Creating Mail...
   let message = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world? ddfwfsw", // plain text body
      html: "<b>Hello world?</b>", // html body
   }


   transporter.sendMail(message).then((info) => {
      return res.status(201).json({
         msg: "You Should reseave an email",
         info: info.messageId,
         preview: nodemailer.getTestMessageUrl(info)
      })
   })
      .catch((err) => {
         return res.status(500).json({ err })
      })

}

const getBill = async (req, res) => {

   const { userEmail } = req.body

   let config = {
      service: 'gmail',
      auth: {
         user: EMAIL,
         pass: PASSWORD
      }
   }

   let transporter = nodemailer.createTransport(config);

   let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
         name: 'Mailgen',
         link: 'https://mailgen.js'
      }
   })

   let response = {
      body: {
         name: 'Sapphire smith',
         intro: "Your bill of purchace!",
         table: {
            data: [
               {
                  item: "MERN Stack Guid",
                  description: "Mongo DB, React, Node, Express",
                  price: '$20.99'
               },
               {
                  item: "MEAN Stack Guid",
                  description: "Mongo DB, Angular, Node, Express",
                  price: '$30.99'
               }
            ]
         },
         outro: " Thanks for shopping With Us"
      }
   }

   let mail = mailGenerator.generate(response)

   //I need to send email to 2 or more person what can i do
   let message = {
      from: EMAIL,
      to: [userEmail, 'smithsapphire85@gmail.com', 'unnikannan185@gmail.com'],
      subject: "Order Placed",
      html: mail
   }

   transporter.sendMail(message).then((item) => {
      return res.status(201).json({
         msg: "You should receive an email"
      })
   }).catch((err) => {
      return res.status(500).json({
         err: err.message
      })
   })

}




module.exports = {
   signUp,
   getBill
}