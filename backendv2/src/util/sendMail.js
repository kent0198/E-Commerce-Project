const nodemailer=require('nodemailer')
const asyncHandler=require('express-async-handler')

const sendMail=asyncHandler(async({email, html})=>{

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.net",
            port: 465,
            secure: true,
            service: 'Gmail',
            auth: {
              user: 'tuetran25112002@gmail.com',
              pass: 'dkxtdfytwphbzqzo',
            }
          });
            const info = await transporter.sendMail({
              from: '"DigriTol" <no-relply@digritol.com>', // sender address
              to: email, // list of receivers
              subject: "Forgot password", // Subject line
              text: "Hello world?", // plain text body
              html: html, // html body
            });
          return info
    }
)

module.exports=sendMail