var socket = io("wss://socket.donationalerts.ru:443");
socket.emit('add-user', {token: "YOUR TOKEN", type: "minor"}); // токен вставлять без token=

let donates = 0;
socket.on('donation', function(msg){

 ms = JSON.parse(msg); // Получаем var msg (т.е. все переменные доната)

 username = ms.username;
 message = ms.message;
 valute = ms.currency;
 amount = ms.amount;
 alerttype = ms.alert_type;

donate = amount + ' ' + valute; 
//
userdonate = username + ' — ' + donate;
usersub = username + ' — ' + "Подписался!";
userfollow = username + ' — ' + "Зафолловился!";

// на всякий случай для вывода всего 
// all = username + ' ' + message + ' ' + amount + ' ' + valute; 

// функция создания элемента
function creatediv(name,id){ 
	var name;
	var name = document.createElement("div"); // создаем элемент div
	name.id = id; // придаем ему id
	document.body.appendChild(name); // добавляем его в тело
	donates = donates + 1; // переменная для очереди(костыль который надо сделать нормально)
}

// функция удаления элемента
function removediv(divid){
document.getElementById(divid).remove(); // удаление элемента по id
donates = donates - 1; // костыль x2
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
function shws(time,types)
{
	let timerId = setInterval(() => stop(),time);
	show(types); // тип алерта
	setTimeout(() => { clearInterval(timerId);},time+1000);
}



// функция покзаа доната
function showall(){
	switch(alerttype){
 case 1:
 playaudio("/sfxdonate.mp3"); // путь к звуку
	shws(10000,"donate"); // показ алерттайп донат
	break;
	//
	// честно говоря я сам не ебу почему при вроде одинаковом алертайпе
	// один из них при саб от 2-х считается как число
	// а другой который самый первый саб считается как текст
	// но я в рот ебал того кто это придумал
	// или я сам себя в рот ебал потому что что то не понял
	//
 case '4':
 playaudio("/sfxdonate.mp3"); // путь к звуку
	shws(10000,"sub"); // показ алерттайп саб
	break;
	//
 case 4:
 playaudio("/sfxdonate.mp3"); // путь к звуку
	shws(10000,"sub"); // показ алерттайп саб
	break;	
	//
 case '6':
 playaudio("/sfxdonate.mp3"); // путь к звуку
    shws(10000,"follow"); // показ алерттайп фолов
	break;	 
    }
}

// сам показ доната + очередь, которая работает через костыль
// пока что тестовый вариант, очередь макс. 2 доната 
// т.е. 1 показывается 1 в очереди

if (donates == 0 ){
	console.log("well");
	showall();
}

else
{
setTimeout(function(){ showall();},14000)
}


});
