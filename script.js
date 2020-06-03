var socket = io("wss://socket.donationalerts.ru:443");
socket.emit('add-user', { token: "YOURTOKEN", type: "minor" });

let donates = 0;
socket.on('donation', async function(msg) {


    console.log(msg);

    ms = JSON.parse(msg); // получаем все переменные доната

    const username = ms.username;
    const message = ms.message;
    const valute = ms.currency;
    const amount = ms.amount;
    const alerttype = ms.alert_type;
    const months = ms.months;

    const userdonate = username + ' — ' + amount + ' ' + valute;

    const soundannouncement = ["/sfxdonate.mp3"] // массив с саунданонсерами, будут выбираться случайно

    let time = 8000; // ДЛИНА ДОНАТА(ЕСЛИ НАДО ДОНАТ ДОЛЬШЕ ОБЯЗАТЕЛЬНО МЕНЯТЬ.Лучшее время - ~15-20 сек)


    // функция для синтеза речи
    function speak(txt, audiofile) {

        var mp3file = audiofile;

        var audioContext = new(window.AudioContext || window.webkitAudioContext)();

        var request = new XMLHttpRequest();
        request.open('GET', mp3file, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            audioContext.decodeAudioData(request.response, function(buffer) {
                var duration = buffer.duration * 1000;
                setTimeout(function() {
                    const say = new SpeechSynthesisUtterance();
                    say.lang = "ru-RU";
                    say.text = txt;
                    window.speechSynthesis.speak(say);
                }, duration)
            });
        };
        request.send();
    }

    // функция для выбора случайного элемента из массива
    function arrayRandElement(arr) {
        var rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    // функция создания элемента на странице
    function creatediv(name, id) {
        var name;
        var name = document.createElement("div");
        name.id = id;
        document.body.appendChild(name);
    }

    // функция удаления элемента с страницы
    function removediv(divid) {
        //
        document.getElementById(divid).remove();
    }

    // функция анимации появления и отрисовки бэков
    function animate(name, id, anim, type, background) {
        creatediv(name, id);
        document.getElementById(id).innerHTML = type;
        document.getElementById(id).classList.add(background);
        document.getElementById(id).classList.add(anim);
    }

    // показ донатов в соотвествии с типом анонса
    function show(type) {
        switch (type) {
            case "donate":
                animate("users", "userdonate", "text-focus-in", userdonate, "semilayer");
                animate("soobsenie", "message", "text-focus-in", message, "semilayer1");
                break;
                //
            case "sub":

                animate("users", "userdonate", "text-focus-in", usersub, "semilayer");
                break;
                //
            case "follow":

                animate("users", "userdonate", "text-focus-in", userfollow, "semilayer");
                break;
                //
        }
    }

    // функция остановки доната
    function stop(type) {

        donates = donates - 1;

        if (type == "donate") {
            document.getElementById("userdonate").classList.add("text-focus-out");
            document.getElementById("message").classList.add("text-focus-out");
            setTimeout(function() {
                removediv("userdonate");
                removediv("message");
            }, 2000);
        } else {
            document.getElementById("userdonate").classList.add("text-focus-out");
            setTimeout(function() {

                removediv("userdonate");
            }, 2000);
        }
    }

    // функция проигрывания аудио
    function playaudio(audiofile) {
        var audio = new Audio(audiofile);
        audio.play();
    }

    // функция показа + саунданонс + синтез речи + остановка  
    function shws(type) {
        const audio = arrayRandElement(soundannouncement);
        playaudio(audio);
        speak(message, audio)
        show(type);
        setTimeout(() => { stop(type) }, time);
    }

    // финальная функция показа в соответствии с алерт тайпом
    function showall() {
        switch (alerttype) {
            case 1:
                //
                shws("donate");
                break;
                //
            case '4':
                //
                shws("sub");
                break;
                // честно говоря я сам не ебу почему при вроде одинаковом алертайпе
                // один из них при саб от 2-х считается как число
                // а другой который самый первый саб считается как текст
                // но я в рот ебал того кто это придумал
                // или я сам себя в рот ебал потому что что то не понял
            case 4:
                //
                shws("sub");
                break;
                //
            case '6':
                //
                shws("follow");
                break;
        }
    }

    // ну и ебанная очередь которая ебучий костыль
    // иногда багается и происходит нечто что ломает нахуй всё
    if (donates == 0) {
        donates = donates + 1;
        showall();
    } else {
        donates = donates + 1;
        koef = time * donates + 1000
        setTimeout(function() {
            showall();
        }, koef);
    }
});
