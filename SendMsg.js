
const nodemailer = require('nodemailer');

exports.setEmail = function (emailData) {
        if(emailData){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'info@grapsnextsocial.com',
                  pass: 'asgmouxhsaitsswk'
                }
              });
              
              
              var mailOptions = {
                from: 'info@grapsnextsocial.com',
                cc: 'priyaranjan@grapsnextsocial.com',
                to: emailData.email,
                subject: 'contact@grapsnextsocial.com',
                // text:`Dear ${emailData.name},

                // Thanks for reserving your table at ECHOES.
                // Please find your reservation details below.

                
                // Date: ${emailData.date}.
                // Time: ${emailData.time}.
                // Partysize: ${emailData.partyType}`,

                html:`<h4>Dear ${emailData.username}, <br>
                Thanks for Contacting Us.
                Please find your query details Below.
                </h4>
                <table border="3px">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Ph NO</th>
                    <th>Message</th>
                    
                   
                  </tr>
                  <tr>
                    <td>${emailData.username }</td>
                    <td>${emailData.email}</td>
                    <td>${emailData.mobile}</td>
                    <td>${emailData.message}</td>
               
                  </tr>
             
                 
                </table>  <br>
                <br>
                <h4>
                Thanks and Regards <br>
                Graps Next Social, BBSR
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