const express = require('express');
require('dotenv').config();
const client = require('twilio')(process.env.SID, process.env.AUTH);
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const bodyParser = require('body-parser');
const twiml = new VoiceResponse();
// const xml = require('xml');
const appPath = "http://59058a221ea8.ngrok.io";
const phoneNumber = [
    "+923155979449"
    // "+923069852676"
]


const server = express();
server.use(bodyParser.urlencoded({ extended: false }))


server.get('/', async (req, res) => {
    for(let i = 0; i < phoneNumber.length; i++){
        await client.calls
        .create({
           url: 'https://ruby-millipede-6609.twil.io/welcome',
           to: phoneNumber[i],
           from: '+13237963030'
         });
    }
      res.send('Called');
});

server.get('/test', (req, res) => {
    res.send('Working');
})

server.post('/greet', (req, res) => {
    const response = twiml.gather({
            input: 'speech',
            timeout: 4,
            partialResultCallback: appPath+'/next',
            partialResultCallbackMethod: 'POST'
        }).say('Hey, this is Tracy from real estate company. How are you doing today?');

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
});

server.post('/next', (req, res) => {
    const response = JSON.parse(JSON.stringify(req.body));
    console.log(response.StableSpeechResult.toLowerCase());

    if(response.StableSpeechResult.includes('how are you') || 
        response.StableSpeechResult.includes('how are') || 
        response.StableSpeechResult.includes('and you') || 
        response.StableSpeechResult.includes('about you')){
        client.calls(response.CallSid).update({
            twiml: `<Response><Say>I am doing good, the reason I am calling you is we are selling a plot at a very premium location.</Say><Redirect method="POST">${appPath}/wait-to-qualify</Redirect></Response>`});
    }if(response.StableSpeechResult.includes('good') || 
    response.StableSpeechResult.includes('good') || 
    response.StableSpeechResult.includes('great') || 
    response.StableSpeechResult.includes('wonderful') || 
    response.StableSpeechResult.includes('fine') || 
    response.StableSpeechResult.includes('fantastic') || 
    response.StableSpeechResult.includes('awesome')){
        client.calls(response.CallSid).update({
            twiml: `<Response><Say>Great, the reason I am calling you is we are selling a plot at a very premium location.</Say><Redirect method="POST">${appPath}/wait-to-qualify</Redirect></Response>`});
    }if(response.StableSpeechResult.includes('not interested') ||
    response.StableSpeechResult.includes('I\'m not interested') ||
    response.StableSpeechResult.includes('i am not interested')){
        client.calls(response.CallSid).update({twiml: '<Response><Say>I understand you are not interested. Thanks for the time have a wonderful day.</Say></Response>'});
    }else if(response.StableSpeechResult.includes('call back')){
        client.calls(response.CallSid).update({twiml: '<Response><Say>Okay I give you a call back later. Have a good day.</Say></Response>'});
    }else if(response.StableSpeechResult.includes('bad')){
        client.calls(response.CallSid).update({twiml: '<Response><Say>Oh, sorry to hear that. I will give you a call back later. Good bye.</Say></Response>'});
    }

    res.send('Done');
});

server.post('/get-response', (req, res) => {
    const response = JSON.parse(JSON.stringify(req.body));
    if(response.StableSpeechResult.toLowerCase()){
        console.log(response.StableSpeechResult);
    }
});

server.post('/wait-to-qualify', async (req, res) => {
    const response = JSON.parse(JSON.stringify(req.body));
    console.log(response)
    client.calls(response.CallSid).update({twiml: `<Response><Gather input="speech" timeout="4" partialResultCallback="${appPath}/interested" partialResultCallbackMethod="POST"><Say>Do you want to buy it?</Say></Gather></Response>`});

    res.send('Done');

})

server.post('/interested', (req, res) => {
    const response = JSON.parse(JSON.stringify(req.body));
    console.log(response.StableSpeechResult)
    if(response.StableSpeechResult.includes('yes')){
        client.calls(response.CallSid).update({twiml: '<Response><Say>Thanks for taking interest, One of my representative will give you a call back soon. Have a wonderful day.</Say></Response>'});
    }else if(response.StableSpeechResult.includes('no')){
        client.calls(response.CallSid).update({twiml: '<Response><Say>Okay, no problem. Have a good day. Bye.</Say></Response>'});
    }
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Running server');
})