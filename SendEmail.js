
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
                from: 'service@grapsnextsocial.com',
                cc: 'priyaranjan@grapsnextsocial.com',
                to: emailData.email,
                subject: 'Service Downloaded',
                // text:`Dear ${emailData.name},

                // Thanks for reserving your table at ECHOES.
                // Please find your reservation details below.

                
                // Date: ${emailData.date}.
                // Time: ${emailData.time}.
                // Partysize: ${emailData.partyType}`,

                html:`<h4>Dear ${emailData.name}, <br>
                Thanks for enquirying us, Please Find Your Details Below.
                </h4>
                <table border="3px">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>services</th>
                    <th>Mobile</th>
                   
                  </tr>
                  <tr>
                    <td>${emailData.name}</td>
                    <td>${emailData.email}</td>
                    <td>Our Services</td>
                    <td>${emailData.mobile}</td>
                
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