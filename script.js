var socket = io("wss://socket.donationalerts.ru:443");
socket.emit('add-user', {token: "YOURTOKEN", type: "minor"}); // токен вставлять без token=

let donates = 0;
socket.on('donation', function(msg){

 ms = JSON.parse(msg); // Получаем var msg (т.е. все переменные доната)

 username = ms.username;
 message = ms.message;
 valute = ms.currency;
 amount = ms.amount;

donate = amount + ' ' + valute; 
userdonate = username + ' — ' + donate;

// проверка на саб
if(amount == 0){
	userdonate = username;
	message = "Новый саб!";
}	

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

function show(){

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
//
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

// функция покзаа доната
function showall(time){
	let timerId = setInterval(() => stop(), time);
	playaudio("/sfxdonate.mp3"); // можно любой другой путь к нужному звуку
	show();
	setTimeout(() => { clearInterval(timerId);}, time + 1000);
}

// сам показ доната + очередь, которая работает через костыль
// пока что тестовый вариант, очередь макс. 2 доната 
// т.е. 1 показывается 1 в очереди

if (donates == 0 ){
	console.log("well");
	showall(11000);
}

else
{
setTimeout(function(){ showall(11000);},14000)
}


});
