// exchange rate to RUB
let currencylist = {
    "EUR": "",
    "USD": "",
    "RUB": 1,
    "TRY": "",
    "BRL": "",
    "PLN": ""
}
fetch('https://www.cbr-xml-daily.ru/daily_json.js') // parse currency
  .then(data => data.json()) //хуево выглядит, потом переделаю...
  .then (daily_json => {currencylist['EUR'] = daily_json['Valute']['EUR']['Value']/daily_json['Valute']['EUR']['Nominal']
                        currencylist['USD'] = daily_json['Valute']['USD']['Value']/daily_json['Valute']['USD']['Nominal']
                        currencylist['TRY'] = daily_json['Valute']['TRY']['Value']/daily_json['Valute']['TRY']['Nominal']
                        currencylist['BRL'] = daily_json['Valute']['BRL']['Value']/daily_json['Valute']['BRL']['Nominal']
                        currencylist['PLN'] = daily_json['Valute']['PLN']['Value']/daily_json['Valute']['PLN']['Nominal']})

let config = {
    "token": "YOUR TOKEN", // token donationalerts
    "duration" : 10000, // duration show alert
    "animation": {
    "startAnim": "slide-left", // animation class name 
    "startAnim2": "slide-right", // animation class name 
    "finishAnim": "text-blur-out", // animation class name 
    },
    "sounds":{
        "defaultSound":{
            "durationSound": 2000, // donation alert sound duration 
            "alertSound": "./resource/sfxdonate.mp3" // url to sound alert
        },
        "specialSound":{
            "durationSound": 3000,
            "alertSound": "./resource/specialSound.mp3"
        }
    },
    "other": {
        "flag" : true, // on/off other
        "url" : "./resource/gif.gif"    // default gif/pic for other 
        },
}

// functions
//special img/gif a certain amount (хуево выглядит согласен, потом переделаю...)
function special(alert,topAlert,bottomAlert,otherAlert,amount){
    switch(true){
        case(amount > 500): //example alert amount = 500
            sound = config['sounds']['specialSound']; // change sound alert
            otherAlert.src = "./resource/1.jpg"; // !! need other.flag == true !! if ==false alert will not work 
            topAlert.style.backgroundColor = 'gold'; // change top alert backgroundcolor to gold
            topAlert.style.color = 'black'; // change top alert textcolor to gold
            bottomAlert.style.backgroundColor = 'white' // change bottom alert backgroundcolor to white
            bottomAlert.style.color = 'black' // change bottom alert textcolor to black
            console.log('special show');
            break;
        
    }
}
//tts (MAX CHAR FOR TTS 200)
function speak(txt,timeout) {
    setTimeout(function() {
        let url = 'https://translate.google.com/translate_tts?ie=UTF-8&q='+ txt.replace(" ","%20") +'&tl=ru&client=tw-ob';
        console.log('suka...')
        var audio = new Audio(url);
        audio.play();
     }, timeout)
}
// create and show donate alert
function showdonate(alert_type,username,message,amount,currency,amount2rub)
{
    switch(alert_type){
        //donation
        case "1":
            // default sound find
            sound = config['sounds']['defaultSound']
            // create alert form
            var alert = document.createElement("div");
            alert.className = "alert";
            document.body.appendChild(alert);
            // other alert elements(below is an example picture)
            if (config.other.flag != false){
                var other = document.createElement("img");
                other.src = config.other.url;
                other.className = "otherAlert";
                other.className += " " + config.animation.startAnim2;
                alert.appendChild(other);
            }
            // top
            var top_alert = document.createElement("div");
            top_alert.innerHTML = username + " — "+amount+' '+currency;
            top_alert.className = "top";
            top_alert.className += " topAlert"; // eng - A space is required before the second class. рус - Пробел обязателен перед вторым классом 
            top_alert.className += " " + config.animation.startAnim;
            alert.appendChild(top_alert);
            // bottom
            var bottom_alert = document.createElement("div");
            bottom_alert.innerHTML = message;
            if (message != ''){ // гавно. временное решение.. потом переделаю...
                bottom_alert.className = "bottom";
                bottom_alert.className += " bottomAlert"; // eng - A space is required before the second class. рус - Пробел обязателен перед вторым классом 
                bottom_alert.className += " " + config.animation.startAnim2;}
            alert.appendChild(bottom_alert);

            // Update for special alerts
            special(alert,top_alert,bottom_alert,other,amount2rub)
            //playSound
            var audio = new Audio(sound.alertSound);
            audio.play();
            //speak tts
            speak(message,sound.durationSound); 
            // close donation (ебанный костыль. хуй знает как это по-человечьи сделать)
            setTimeout(function(){
                top_alert.className += " " + config.animation.finishAnim;
                bottom_alert.className += " " + config.animation.finishAnim;
                other.className += " " + config.animation.finishAnim;
                setTimeout(function(){
                    alert.remove();
                },2000);
            },config.duration);
            break;
    }
}

let donations = [];
//create and active socket 
var socket = io("wss://socket.donationalerts.ru:443");
socket.emit('add-user', { token: config.token, type: "minor" });

socket.on('donation',function(msg) {
    console.log(msg);
    pars_msg = JSON.parse(msg);
    data = {
        alert_type: pars_msg.alert_type,
        username: pars_msg.username,
        message: pars_msg.message,
        amount: pars_msg.amount,
        currency: pars_msg.currency,
        amount2rub: pars_msg.amount*currencylist[pars_msg.currency]
    }
    donations.push(data);

    console.log(data);
    console.log(donations.length);
});


let timer = setInterval(() => {
    if(donations.length != 0){
        showdonate(donations[0].alert_type,
            donations[0].username,
            donations[0].message,
            donations[0].amount,
            donations[0].currency,
            donations[0].amount2rub);
        donations.shift();
        console.log('show');
    }
}, config.duration+2000);

// need add text writing anim - x
// anim conf - x
//