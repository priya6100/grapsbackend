
const nodemailer = require('nodemailer');

exports.setEmail = function (newsData) {
        if(newsData){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'business@grapsnextsocial.com',
                  pass: 'udcpnourdhvvhbah'
                }
              });
              
              
              var mailOptions = {
                from: 'business@grapsnextsocial.com',
                cc: 'priyaranjan@grapsnextsocial.com',
                to: newsData.email,
                subject: 'contact@grapsnextsocial.com',
                // text:`Dear ${newsData.name},

                // Thanks for reserving your table at ECHOES.
                // Please find your reservation details below.

                
                // Date: ${newsData.date}.
                // Time: ${newsData.time}.
                // Partysize: ${newsData.partyType}`,

                html:`<h4>Dear ${newsData.email}, <br> 'Embedded image: <img src="cid:newsletter"/>' <br>
                Thanks for Contacting Us.
                Please find your query details Below.
                </h4>
                <table border="3px">
                  <tr>
                 
                    <th>Email</th>
                   
                    
                   
                  </tr>
                  <tr>
                   
                    <td>${newsData.email}</td>
              
               
                  </tr>
             
                 
                </table>  <br>
                <br>
                <h4>
                Thanks and Regards <br>
                Graps Next Social, BBSR
                <h4>
                `,
                
                attachments: [{
                    filename: '1.png',
                    path: __dirname + '/upload/1.png',
                    cid: 'newsletter' //same cid value as in the html img src
                }]

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