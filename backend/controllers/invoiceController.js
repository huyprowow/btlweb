const Invoice = require("../models/invoice");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const moneyDollarFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 4,
  roundingIncrement: 1,
});

const {
  ADMIN_EMAIL_ADDRESS,
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET,
  GOOGLE_MAILER_REFRESH_TOKEN,
} = process.env;
// Khởi tạo OAuth2Client với Client ID và Client Secret
const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

exports.get_all_invoice = (req, res, next) => {
  Invoice.find().exec((err, invoices) => {
    if (err) return next(err);
    res.json(invoices);
  });
};

exports.create_invoice = [
  //sannitized data
  body("address")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("address is required"),
  async (req, res, next) => {
    //gui email,name,price,number
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const invoice = await new Invoice({
        userName: req.body.userName,
        email: req.body.email,
        name: req.body.name,
        price: req.body.price,
        number: req.body.number,
        address: req.body.address,
      });

      try {
        const createdInvoice = async () => {
          const result = await invoice.save();
          const myAccessTokenObject = await myOAuth2Client.getAccessToken();
          // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
          const myAccessToken = myAccessTokenObject?.token;
          console.log(invoice);
          //send email
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: ADMIN_EMAIL_ADDRESS,
              clientId: GOOGLE_MAILER_CLIENT_ID,
              clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
              refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
              accessToken: myAccessToken,
            },
          });

          const mailOptions = {
            from: "playbnskorean1@gmail.com",
            to: req.body.email,
            subject: "Thank you to buy this product",
            text: `
            Hello ${req.body.userName},\n
            Name: ${req.body.name} 
            Price: $${req.body.price} 
            Number: ${req.body.number} 
            Total: ${moneyDollarFormat.format(req.body.price * req.body.number)} \n
            We will soon deliver this product to: ${
              req.body.address
            }, address that you have provided to us.\n
            Thank you for your purchase.
            Sincerely.
            Huy
                    `,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res
                .status(500)
                .json({ errors: [{ msg: "Email not sent" }] });
            } else {
              console.log("Email sent: " + info.response);
              res.status(201).json({
                message:
                  "Invoice created successfully, please check your email",
                createdInvoice: {
                  _id: result._id,
                  name: result.name,
                  price: result.price,
                  number: result.number,
                  email: result.email,
                  address: result.address,
                },
              });
            }
          });
        };
        createdInvoice();
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  },
];

exports.delete_invoice = (req, res, next) => {
  Invoice.findByIdAndRemove(req.params.id, (err, invoice) => {
    if (err) return next(err);
    res.json(invoice);
  });
};
