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
  .then (daily_json => {currencylist['EUR'] = daily_json['Valute']['EUR']['Value']/daily_json['Valute']['EUR']['Nominal'];
                        currencylist['USD'] = daily_json['Valute']['USD']['Value']/daily_json['Valute']['USD']['Nominal'];
                        currencylist['TRY'] = daily_json['Valute']['TRY']['Value']/daily_json['Valute']['TRY']['Nominal'];
                        currencylist['BRL'] = daily_json['Valute']['BRL']['Value']/daily_json['Valute']['BRL']['Nominal'];
                        currencylist['PLN'] = daily_json['Valute']['PLN']['Value']/daily_json['Valute']['PLN']['Nominal'];})
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
function special(alert,topAlert,username_alert,icons_alert,amount_alert,bottomAlert,otherAlert,amount){
    switch(true){
        case(amount >= 500): //example alert amount = 500
            sound = config['sounds']['specialSound']; // change sound alert
            otherAlert.src = "./resource/1.jpg"; // !! need other.flag == true !! if ==false alert will not work 
            username_alert.style.backgroundColor = 'gold'; // change top alert backgroundcolor to gold
            username_alert.style.color = 'black'; // change top alert textcolor to gold
            icons_alert.style.color = 'gold';
            amount_alert.style.color = 'gold';
            bottomAlert.style.backgroundColor = 'white'; // change bottom alert backgroundcolor to white
            bottomAlert.style.color = 'black'; // change bottom alert textcolor to black
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
        console.log(alertSoundDuration);
     }, alertSoundDuration*1000)
}
// create and show donate alert
function showdonate(data)
{
    switch(data['alert_type']){
        //donation
        case "1":
        case 1:
            // default sound find
            sound = config['sounds']['defaultSound'];
            // create alert form
            var alert = document.createElement("div");
            alert.className = "alert";
            document.body.appendChild(alert);
            // top
            var top_alert = document.createElement("div");
            top_alert.className = "topAlert";
            // username block
            var username_alert = document.createElement("div");
            username_alert.innerText = data['username'];
            username_alert.className += config.animation.startAnim;
            username_alert.className += ' usernameAlert';
            // amount block
            var amount_alert = document.createElement("div");
            amount_alert.innerText = Math.trunc(data['amount'])+' '+data['currency'];
            amount_alert.className += ' amountAlert';
            // icons block
            var icons_alert = document.createElement("div");
            if(data['commission'] == 1){
                icons_alert.innerText += '♥ ';
            }
            if(data['payer_data'] != null){
                icons_alert.innerText += '✔';
            }
            icons_alert.className += 'iconsAlert';
            // container for icons and amount
            var container = document.createElement('div');
            container.style.display = 'flex';
            container.appendChild(amount_alert);
            container.appendChild(icons_alert);
            
            top_alert.appendChild(container);
            top_alert.appendChild(username_alert);
            
            alert.appendChild(top_alert);
            // bottom
            var bottom_alert = document.createElement("div");
            bottom_alert.innerText = data['message'];
            if (data['message'] != '' & data['message'] != null){ // гавно. временное решение.. потом переделаю...
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
            special(alert,top_alert,username_alert,icons_alert,amount_alert,bottom_alert,other,data['amount2rub']);
            //playSound
            var audio = new Audio(sound);
            audio.play();
            //speak tts
            audio.onloadeddata =  function(){speak(data['message'],this.duration)};// audio.onloadeddata find alert sound duration
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
var socket = io("wss://socket.donationalerts.ru:443", { transports: ["websocket"] });
socket.emit('add-user', { token: config.token, type: "alert_widget" });

socket.on('donation',function(msg) {
    pars_msg = JSON.parse(msg);
    additional_data = JSON.parse(pars_msg['additional_data']);
    console.log(pars_msg);
    console.log(additional_data);
    data = {
        alert_type: pars_msg.alert_type,
        username: pars_msg.username,
        message: pars_msg.message,
        amount: pars_msg.amount,
        currency: pars_msg.currency,
        amount2rub: pars_msg.amount*currencylist[pars_msg.currency],
        commission: additional_data['is_commission_covered'],
        payer_data: additional_data['payer_data']
    }
    donations.push(data);
    console.log(data);
    console.log(donations.length);
});


let timer = setInterval(() => {
    if(donations.length != 0){
        showdonate(donations[0]);
        donations.shift();
        console.log('show');
    }
}, config.duration+3000);

//last update 06.05.25
//по хорошему все донаты в класс переписать, но я давно это делал поэтому просто хотфикс, ща лень разбираться
//да и ваще надо всё переписывать на чистый вебсокет без сокет ио, ибо ДА поддерживают ток старые 2.х.х версии
//короче кто хочет тот сделает