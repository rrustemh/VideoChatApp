const nodemailer = require('nodemailer');
const fs = require('fs');
const bodyParser = require('body-parser')
 
exports.sendEmail = (req, res, next) => {
    var jsonString = '';
    req.on('data', function (data) {
        jsonString += data;
    });
    req.on('end', function () {
        var data=JSON.parse(jsonString);
        sendEmail(data['email']);
    });
    res.sendStatus(200);
};
const sendEmail = (userEmail) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rrustem.hyseni@student.uni-pr.edu',
          pass: '**rrh1234'
        }
      });
      

      var template = fs.readFileSync('./public/email.html',{encoding:'utf-8'});
      var mailOptions = {
        from: 'rrustem.hyseni@student.uni-pr.edu',
        to: userEmail,
        subject: 'Sending Email using Node.js',
        html: template
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}