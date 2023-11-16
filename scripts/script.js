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
// config
let config = {
    "token": localStorage.getItem('token'), // token donationalerts(localstorage or hard code value here)
    "duration" : Number(localStorage.getItem('duration')), // duration show alert(localstorage or hard code value here)
    "animation": {
        "startAnim": "slide-left", // animation class name 
        "startAnim2": "slide-right", // animation class name 
        "finishAnim": "text-blur-out", // animation class name 
    },
    "sounds":{
        "defaultSound": "./resource/sfxdonate.mp3", // url to sound alert
        "specialSound": "./resource/specialSound.mp3",
    },
    "other": {
        "flag" : true, // on/off other
        "url" : "./resource/gif.gif"    // default gif/pic for other 
        },
}

// functions
//special img/gif a certain amount (хуево выглядит согласен, потом переделаю...)
function special(alert,topAlert,username_alert,amount_alert,bottomAlert,otherAlert,amount){
    switch(true){
        case(amount >= 500): //example alert amount = 500
            sound = config['sounds']['specialSound']; // change sound alert
            otherAlert.src = "./resource/1.jpg"; // !! need other.flag == true !! if ==false alert will not work 
            username_alert.style.backgroundColor = 'gold'; // change top alert backgroundcolor to gold
            username_alert.style.color = 'black'; // change top alert textcolor to gold
            bottomAlert.style.backgroundColor = 'white' // change bottom alert backgroundcolor to white
            bottomAlert.style.color = 'black' // change bottom alert textcolor to black
            console.log('special show');
            break;
        
    }
}
//tts (MAX CHAR FOR TTS 200)
function speak(txt,alertSoundDuration) {
    setTimeout(function() {
        let url = 'https://translate.google.com/translate_tts?ie=UTF-8&q='+ txt.replace(" ","%20") +'&tl=ru&client=tw-ob';
        var audio = new Audio(url);
        audio.play();
        console.log(alertSoundDuration)
     }, alertSoundDuration*1000)
}
// create and show donate alert
function showdonate(alert_type,username,message,amount,currency,amount2rub)
{
    switch(alert_type){
        //donation
        case "1":
        case 1:
            // default sound find
            sound = config['sounds']['defaultSound']
            // create alert form
            var alert = document.createElement("div");
            alert.className = "alert";
            document.body.appendChild(alert);
            // top
            var top_alert = document.createElement("div");
            top_alert.className = "topAlert";

            var username_alert = document.createElement("div");
            username_alert.innerText = username;
            username_alert.className += config.animation.startAnim
            username_alert.className += ' usernameAlert';

            var amount_alert = document.createElement("div");
            amount_alert.innerText = Math.trunc(amount)+' '+currency;
            amount_alert.className += ' amountAlert';

            top_alert.appendChild(amount_alert)
            top_alert.appendChild(username_alert)
            
            alert.appendChild(top_alert);
            // bottom
            var bottom_alert = document.createElement("div");
            bottom_alert.innerText = message;
            if (message != ''){ // гавно. временное решение.. потом переделаю...
                bottom_alert.className = "bottom";
                bottom_alert.className += " bottomAlert"; // eng - A space is required before the second class. рус - Пробел обязателен перед вторым классом 
                bottom_alert.className += " " + config.animation.startAnim2;}
            alert.appendChild(bottom_alert);
            // other alert elements(below is an example picture)
            if (config.other.flag != false){
                var other = document.createElement("img");
                other.src = config.other.url;
                other.className = "otherAlert";
                other.className += " " + config.animation.startAnim2;
                alert.appendChild(other);
            }
            // Update for special alerts
            special(alert,top_alert,username_alert,amount_alert,bottom_alert,other,amount2rub)
            //playSound
            var audio = new Audio(sound);
            audio.play();
            //speak tts
            audio.onloadeddata =  function(){speak(message,this.duration)};// audio.onloadeddata find alert sound duration
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
socket.emit('add-user', { token: config.token, type: "alert_widget" });

socket.on('donation',function(msg) {
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
}, config.duration+3000);

//last update 17.11.23