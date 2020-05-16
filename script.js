var socket = io("wss://socket.donationalerts.ru:443");
socket.emit('add-user', {token: "BaoWXhE4UhFWxDBcPXdG", type: "minor"}); // токен вставлять без token=

let donates = 0;
socket.on('donation', function(msg){

//
let time = 10000; // длительность доната в мс
//

 ms = JSON.parse(msg); // Получаем var msg (т.е. все переменные доната)

const username = ms.username;
const  message = ms.message;
const  valute = ms.currency;
const  amount = ms.amount;
const  alerttype = ms.alert_type;

const donate = amount + ' ' + valute; 
//
const userdonate = username + ' — ' + donate;
const usersub = username + ' — ' + "Подписался!";
const userfollow = username + ' — ' + "Зафолловился!";

// на всякий случай для вывода всего 
// all = username + ' ' + message + ' ' + amount + ' ' + valute; 

// функция создания элемента
function creatediv(name,id){ 
	var name;
	var name = document.createElement("div"); // создаем элемент div
	name.id = id; // придаем ему id
	document.body.appendChild(name); // добавляем его в тело
}

// функция удаления элемента
function removediv(divid){
document.getElementById(divid).remove(); // удаление элемента по id

}

function show(type){

switch(type){
case "donate":
// создание элемента userdonate( username + сумма доната с влаютой )
creatediv("users","userdonate");
document.getElementById("userdonate").innerHTML = userdonate;
document.getElementById("userdonate").classList.add("semilayer");
document.getElementById("userdonate").classList.add("slideInLeft");
// а так же добавление ему анимации и стиля через класс

// то же самое для сообщения
creatediv("soobsenie","message");
document.getElementById("message").innerHTML = message;
document.getElementById("message").classList.add("slideInUp");
document.getElementById("message").classList.add("semilayer1");
break;
//
case "sub":
creatediv("users","userdonate");
document.getElementById("userdonate").innerHTML = usersub;
document.getElementById("userdonate").classList.add("semilayer");
document.getElementById("userdonate").classList.add("slideInLeft");
break;
//
case "follow":
creatediv("users","userdonate");
document.getElementById("userdonate").innerHTML = userfollow;
document.getElementById("userdonate").classList.add("semilayer");
document.getElementById("userdonate").classList.add("slideInLeft");
break;
}
}

// удаление эллементов доната
function stop(){
//
donates = donates - 1;
//
removediv("userdonate");
//
removediv("message");
//
}

// функция для воспроизведения аудио
function playaudio(audiofile){
var audio = new Audio(audiofile);
audio.play();
}
// 

// функция показа алерта с учетом 
function shws(types)
{
	playaudio("LINKONSOUND");
	show(types);
	setTimeout(stop,time);
}



// функция покзаа доната
function showall(){
	switch(alerttype){
 case 1:
	shws("donate"); // показ алерттайп донат
	break;
	//
	// честно говоря я сам не ебу почему при вроде одинаковом алертайпе
	// один из них при саб от 2-х считается как число
	// а другой который самый первый саб считается как текст
	// но я в рот ебал того кто это придумал
	// или я сам себя в рот ебал потому что что то не понял
	//
 case '4':
	shws("sub"); // показ алерттайп саб
	break;
	//
 case 4:
	shws("sub"); // показ алерттайп саб
	break;	
	//
 case '6':
    shws("follow"); // показ алерттайп фолов
	break;	 
    }
}

// ебучая очередь донатов я рот ее ебал
// сделал жопой об косяк я ее рот ебал
// иногда багуется наверно пофикшу когда нить

if (donates == 0){
 	donates = donates + 1;
 	showall();
 }
else{
	donates = donates + 1;
	koef = time*donates+1000
	console.log('timer = ' + koef)
	setTimeout(function() { 
		showall();
 	}, koef);
 }


});
