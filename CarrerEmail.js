
const nodemailer = require('nodemailer');
var base64 = require('base-64');
var fs = require('fs');
const AdmZip = require('adm-zip');

exports.setCarrer = function (carrerData) {
  var pixel = carrerData.file
var buffer = Buffer.from(pixel, "base64");
        if(carrerData){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'career@grapsnextsocial.com',
                  pass: 'wnmcdtwhaynbkpof'
                }
              });
      

              var mailOptions = {
                from: 'career@grapsnextsocial.com',
              
                to: carrerData.email,
                subject: 'sent email confirmed',
                // text:`Dear ${emailData.name},

                // Thanks for reserving your table at ECHOES.
                // Please find your reservation details below.

                
                // Date: ${emailData.date}.
                // Time: ${emailData.time}.
                // Partysize: ${emailData.partyType}`,
                attachments:[{

                 fileName: 'resume.pdf',
                 path: './images/resume.pdf'
              
            
            
                }],

                html:`<h4>Dear ${carrerData.name}, <br>
                Thanks for enquirying us.
                </h4>
                <table border="3px">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  
                    <th>Mobile</th>
                   
                  </tr>
                  <tr>
                    <td>${carrerData.name}</td>
                    <td>${carrerData.email}</td>
                    <td>${carrerData.mobile}</td>
                   
                
                  </tr>
             
                 
                </table>  <br>
                <br>
                <h4>
                Thanks and Regards <br>
                GRAPSNEXTSOCIAL, BBSR
                <h4>
                `,

              };
              
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return false
                } else {
                  console.log('Email sent: ' + info.response);
                  return true
                }
              });
        }
  };

