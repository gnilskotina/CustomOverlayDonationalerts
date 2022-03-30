let config = {
    "token": "yourtoken",
    "duration" : 10000,
    "startAnim": "slide-left",
    "startAnim2": "slide-right",
    "finishAnim": "text-blur-out",
    "durationTTS": 2000
}



// functions

//tts
function speak(txt, audiofile) {
    setTimeout(function() {
        let url = 'https://translate.google.com/translate_tts?ie=UTF-8&q='+ txt.replace(" ","%20") +'&tl=ru&client=tw-ob';
        console.log('suka...')
        var audio = new Audio(url);
        audio.play();
     }, config.durationTTS)
}
// create and show donate alert
function showdonate(alert_type,username,message,amount,currency,)
{
    switch(alert_type){
        case "1":
            //playSound
            var audio = new Audio("./scripts/sfxdonate.mp3");
            audio.play();
            speak(message,"./scripts/sfxdonate.mp3")
            // top
            var top_alert = document.createElement("div");
            top_alert.innerHTML = username + " — "+amount+' '+currency;
            top_alert.className = "top";
            top_alert.className += " topAlert"; // eng - A space is required before the second class. рус - Пробел обязателен перед вторым классом 
            top_alert.className += " " + config.startAnim;
            document.body.appendChild(top_alert);
            // bottom
            var bottom_alert = document.createElement("div");
            bottom_alert.innerHTML = message;
            bottom_alert.className = "bottom";
            bottom_alert.className += " bottomAlert"; // eng - A space is required before the second class. рус - Пробел обязателен перед вторым классом 
            bottom_alert.className += " " + config.startAnim2;
            document.body.appendChild(bottom_alert);
            // close donation (ебанный костыль. хуй знает как это по-человечьи сделать)
            setTimeout(function(){
                top_alert.className += " " + config.finishAnim;
                bottom_alert.className += " " + config.finishAnim;
                setTimeout(function(){
                    top_alert.remove();
                    bottom_alert.remove();
                },2000);
            },config.duration);
            break;
    }
}
//

let donations = [];
//create and active socket 
var socket = io("wss://socket.donationalerts.ru:443");
socket.emit('add-user', { token: "5UseBxkPpv2QrLxyzrXt", type: "minor" });

socket.on('donation',function(msg) {
    pars_msg = JSON.parse(msg);
    data = {
        alert_type: pars_msg.alert_type,
        username: pars_msg.username,
        message: pars_msg.message,
        amount: pars_msg.amount,
        currency: pars_msg.currency
    }
    donations.push(data)

    console.log(data);
    console.log(donations.length)
});


let timer = setInterval(() => {
    if(donations.length != 0){
        showdonate(donations[0].alert_type,
            donations[0].username,
            donations[0].message,
            donations[0].amount,
            donations[0].currency);
        donations.shift()
        console.log('показываю')
    }
}, config.duration+2000);