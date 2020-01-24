const nodemailer = require('nodemailer');

function CreateEmailText(course){
    return "Html of email content"
}


 function SendMail (toMail,subject,text)
{
   const fromMail="lextorah@gmail.com"
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: fromMail ,
        pass: ''
    }
    });

    let mailOptions = {
        from: fromMail,
        to: toMail,
        subject: subject,
        text: text
        };

      transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
            }
            console.log(response)
            });
        
}

module.exports={
    "SendMail":SendMail,
    "CreateEmailText":
}