const express = require('express');
const bodyParser = require('body-parser')
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
var fs = require('fs');
const AdmZip = require('adm-zip');
const contact = require('./SendMsg');
const SendEmail= require('./SendEmail')
const CarrerEmail = require('./CarrerEmail')
const NewsEmail = require('./NewsLetter')

var app = express();
const port = 5000;
const sessionId = uuid.v4();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));
const router = express.Router();
app.use(router);
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
app.post('/send-msg', (req, res) => {
  
    runSample(req.body.MSG).then(data =>{
        res.send({replay: data})
    })

})

app.get('/', (req, res) => {
  
  res.send("hy")
  })




app.post('/api/data/contact', async(req, res) => {
  console.log('req.body>>>',req.body);
  const isEmailSend= await contact.setEmail(req.body)
  console.log('iseml>>',isEmailSend);
//    return res.json({body:req.body})
 res.send("hi i am post method");

})




var uploadDir = fs.readdirSync(__dirname+"/upload"); 
app.get('/api/booking', async(req, res) => {
 
    const zip = new AdmZip();
 
    for(var i = 0; i < uploadDir.length;i++){
        zip.addLocalFile(__dirname+"/upload/"+uploadDir[i]);
    }
 
    const downloadName = `grapsnextsocial_broucher.zip`;
 
    const data = zip.toBuffer();
 
 
 
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${downloadName}`);
    res.set('Content-Length',data.length);
   await res.send(data);
 
})


app.post('/api/data/post',async(req, res) => {
  console.log('req.body>>>',req.body);
  const isEmailSend= await SendEmail.setEmail(req.body)
  console.log('iseml>>',isEmailSend);
//    return res.json({body:req.body})
 res.send("hi i am post method");
 

})

app.post('/api/data/news',async(req, res) => {
  console.log('req.body>>>',req.body);
  const isEmailSend= await NewsEmail.setEmail(req.body)
  console.log('iseml>>',isEmailSend);
//    return res.json({body:req.body})
 res.send("hi i am post method");
 

})

app.post('/api/data/carrer',async(req, res) => {
  
  console.log('req.body>>>',req.body);
  console.log('req.bodyfile>>>',req.body.file);
  const isCarrerSend= await CarrerEmail.setCarrer(req.body)
  var t= req.body
  console.log('iseml>>',isCarrerSend);
  var base64String = t.file.replace(/^data:application\/pdf;base64,/, "");
  fs.writeFile("./images/resume.pdf", base64String, {encoding: 'base64'}, function(err){
      if(err){
          console.log(err);
      }
      else{
          console.log("file created");
      }
  })
 res.send("hi i am post method");


})


app.post("/imagesupload", function(req, res, next) {
  console.log('imagesupload>>>',req.body);
  var t = req.body;

     var base64String = t.file.replace(/^data:application\/pdf;base64,/, "");
     fs.writeFile("resume.pdf", base64String, {encoding: 'base64'}, function(err){
         if(err){
             console.log(err);
         }
         else{
             console.log("file created");
         }
     })

 })



/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,projectId = 'chart-bot-fqgt') {
  // A unique identifier for the given session


  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    //   keyFilename:"C:/Users/Sunil/Desktop/chatbot/backend/chart-bot-fqgt-43768330495a.json"
    keyFilename:"chart-bot-fqgt-d7b02fa9425c.json"
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText;
}
app.listen(port, console.log("app listen on"+port))