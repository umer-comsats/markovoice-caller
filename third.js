exports.handler = function(context, event, callback) {
    const callBackUrl = 'https://0b816081074d.ngrok.io/get-response';
    const twiml = new Twilio.twiml.VoiceResponse();
    
    const command = event.SpeechResult.toLowerCase();
    
    if(
        command.includes('yes') ||
        command.includes('talk to') ||
        command.includes('ask') ||
        command.includes('think') ||
        command.includes('thinking') ||
        command.includes('maybe') 
    ){
        twiml.gather({
            input: 'speech',
            timeout: 4,
            hints: 'good, bad',
            partialResultCallback: callBackUrl,
            partialResultCallbackMethod: 'POST'
        }).say(
            {
                voice: 'man',
                language: 'en'
            },
            'Alright I have noted your contact number. One of my associate will give you a call back to discuss more about this. Thanks for taking interest, have a wonderful day. Good Bye'
        );
        
        callback(null, twiml);
    } else if(
        command.includes('no') ||
        command.includes('hello') ||
        command.includes('don\'t need')
    ){
        twiml.gather({
            input: 'speech',
            timeout: 4,
            hints: 'good, bad',
            partialResultCallback: callBackUrl,
            partialResultCallbackMethod: 'POST'
        }).say(
            {
                voice: 'man',
                language: 'en'
            },
            'Alright, that\'s not a problem. Have a wonderful day. Good bye.'
        );
        
        callback(null, twiml);
    }else if(
        command.includes('not interested') ||
        command.includes('I\'m not interested') ||
        command.includes('don\'t need') ||
        command.includes('i am not interested')
    ){
        twiml.gather({
            input: 'speech',
            timeout: 4,
            partialResultCallback: callBackUrl,
            partialResultCallbackMethod: 'POST'
        }).say(
            {
                voice: 'man',
                language: 'en'
            },
            'Alright I understand you are not interested. Have a wonderful day. Good bye'
        );
        
        callback(null, twiml);
    }else if(
        command.includes('busy') ||
        command.includes('call back') ||
        command.includes('call me back') ||
        command.includes('have to go')
    ){
        twiml.gather({
            input: 'speech',
            timeout: 4,
            partialResultCallback: callBackUrl,
            partialResultCallbackMethod: 'POST'
        }).say(
            {
                voice: 'man',
                language: 'en'
            },
            'Okay, I will give you a call back later. Have a wonderful day. Good Bye.'
        );
        
        callback(null, twiml);
    }else if(
        command.includes('stop calling') ||
        command.includes('do not call') ||
        command.includes('no call') ||
        command.includes('keep on calling') ||
        command.includes('tierd of')
    ){
        twiml.gather({
            input: 'speech',
            timeout: 4,
            partialResultCallback: callBackUrl,
            partialResultCallbackMethod: 'POST'
        }).say(
            {
                voice: 'man',
                language: 'en'
            },
            'I really appologize, let me put your number on do not call list. Have a good day. Good Bye.'
        );
        
        callback(null, twiml);
    } else {
        twiml.gather({
            input: 'speech',
            timeout: 4,
            partialResultCallback: callBackUrl,
            partialResultCallbackMethod: 'POST'
        }).say(
            {
                voice: 'man',
                language: 'en'
            },
            'Okay. Let me ask my associate to give you a call back to discuss more with you. Good bye'
        );
        
        callback(null, twiml);
    }
};