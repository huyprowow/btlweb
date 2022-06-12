require("dotenv").config();
const Account = require("../models/account");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
// const emailValidator = require("deep-email-validator");//luoi xac thuc
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');

const {ADMIN_EMAIL_ADDRESS,GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET, GOOGLE_MAILER_REFRESH_TOKEN} = process.env;
// Khởi tạo OAuth2Client với Client ID và Client Secret
const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

exports.get_account_list = (req, res, next) => {
  Account.find().exec((err, accounts) => {
    if (err) return next(err);
    res.json(accounts);
  });
};

exports.create_account = [
  //sannitized data
  body("userName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("userName is required")
    .isAlphanumeric()
    .withMessage("userName must be alphanumeric"),
  body("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isAlphanumeric()
    .withMessage("Password must be alphanumeric"),
  body("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  //create
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const account = await new Account({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
      });
      Account.find({
        $or: [{ userName: req.body.userName }, { email: req.body.email }],
      }).exec((err, accounts) => {
        if (err) return next(err);
        if (accounts.length > 0) {
          res
            .status(409)
            .json({ errors: [{ msg: "userName or email already exists" }] });
        } else {
          try {
            // async function isEmailValid(email) {
            //   return emailValidator.validate(email)
            // }
            // const {valid, reason, validators} = await isEmailValid(req.body.email);
            // if (!valid) {
            //   return res.status(400).json({
            //     errors: [{
            //       msg: `email address not valid: ${ validators[reason].reason}`,
            //      }]
            //   });
            // }
            const createdAccount = async () => {
              const result = await account.save();
              const myAccessTokenObject = await myOAuth2Client.getAccessToken();
              // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
              const myAccessToken = myAccessTokenObject?.token;
              console.log(account);
              //send email
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  type: 'OAuth2',
                  user: ADMIN_EMAIL_ADDRESS,
                  clientId: GOOGLE_MAILER_CLIENT_ID,
                  clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                  accessToken: myAccessToken
                }
              });

              const mailOptions = {
                from: "playbnskorean1@gmail.com",
                to: req.body.email,
                subject:
                  "Thank you to register this is your userName and password",
                text: `
                Your userName: ${req.body.userName} \n
                Your password: ${req.body.password}
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
                    message: "Account created successfully, please check your email",
                    createdAccount: {
                      _id: result._id,
                      userName: result.userName,
                      password: result.password,
                      email: req.body.email,
                    },
                  });
                  // return res.status(200).json({"message": "userName and password sent to email"});
                }
              });
            };
            createdAccount();
          } catch (err) {
            console.log(err);
            next(err);
          }
        }
      });
    }
  },
];

exports.signin_account = [
  //sannitized data
  body("userName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("userName is required")
    .isAlphanumeric()
    .withMessage("userName must be alphanumeric"),
  body("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isAlphanumeric()
    .withMessage("Password must be alphanumeric"),
  //sigin
  async (req, res, next) => {
    const errors = validationResult(req);
    // console.log(req.body);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const { userName, password } = req.body;
      Account.findOne({ userName: userName }).exec((err, account) => {
        if (err) return next(err);
        if (account) {
          account.comparePassword(password).then((isMatch) => {
            if (isMatch) {
              const signedToken = jwt.sign(
                account.toJSON(),
                process.env.TOKEN_SECRET_KEY
              );

              const accessToken = "Bearer " + signedToken;
              res.status(200).json({
                message: "Account signed in successfully",
                account: {
                  _id: account._id,
                  userName: account.userName,
                  role: account.role,
                },
                token: accessToken,
              });
            } else {
              res.status(401).json({
                errors: [{ msg: "userName or password is incorrect" }],
              });
            }
          });
        } else {
          res.status(401).json({
            errors: [{ msg: "userName or password is incorrect" }],
          });
        }
      });
    }
  },
];
