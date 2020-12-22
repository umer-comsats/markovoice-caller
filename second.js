exports.handler = function(context, event, callback) {
    const callBackUrl = 'https://0b816081074d.ngrok.io/get-response';
    const twiml = new Twilio.twiml.VoiceResponse();
    
    const command = event.SpeechResult.toLowerCase();
    
    console.log(command);
  
    if(command.includes('how are you') || 
        command.includes('how are') || 
        command.includes('and you') || 
        command.includes('about you')){
        twiml.gather({
            input: 'speech',
            timeout: 4,
            hints: 'good, bad',
            action: 'https://ruby-millipede-6609.twil.io/ask-interested',
            partialResultCallback: callBackUrl,
            partialResultCallbackMethod: 'POST'
        }).say(
            {
                voice: 'man',
                language: 'en'
            },
            'I am doing good, thanks for asking. We have a plot at the prime location. Are you looking to purchase a plot?.'
        );
        
        callback(null, twiml);
    }else if(
        command.includes('not too good') ||
        command.includes('bad') ||
        command.includes('not good') ||
        command.includes('not feeling')
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
            'Oh I am sorry to hear that. I will give you a call back. Please take care of yourself. Good Bye.'
        );
        
        callback(null, twiml);
    }else if(command.includes('good') || 
    command.includes('good') || 
    command.includes('great') || 
    command.includes('wonderful') || 
    command.includes('fine') || 
    command.includes('fantastic') || 
    command.includes('nothing') || 
    command.includes('not too bad') || 
    command.includes('awesome')){
        twiml.gather({
            input: 'speech',
            timeout: 4,
            hints: 'good, bad',
            action: 'https://ruby-millipede-6609.twil.io/ask-interested',
            partialResultCallback: callBackUrl,
            partialResultCallbackMethod: 'POST'
        }).say(
            {
                voice: 'man',
                language: 'en'
            },
            'That is great. We have a plot at the prime location. Are you looking to purchase a plot?.'
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
            hints: 'good, bad',
            action: 'https://ruby-millipede-6609.twil.io/ask-interested',
            partialResultCallback: callBackUrl,
            partialResultCallbackMethod: 'POST'
        }).say(
            {
                voice: 'man',
                language: 'en'
            },
            'Okay. We have a plot at the prime location. Are you looking to purchase a plot?'
        );
        
        callback(null, twiml);
    }
};