<p align="center">
  <img src="https://acc-gt.ru/wp-content/uploads/2021/03/ch_129310_UnSh.png">
  <br>
  <h1 align="center">Custom overlay donationalerts</h1>
  <h3 align="center">Custom alert donationalerts</h3>
</p>


## Description.
Flexible wrapper for donation notifications. Full customization of animations and appearance of the alert. There will be many more changes. 

---

## Setting up.
Before starting, you must first configure ```let config``` (in script.js).
All descriptions of variables are in the comments to the code.

*After downloading, if you are not using the old version, then you need to delete the OLD_VERSION folder.*
-

How find token donationalerts:
* Go to SETTINGS -> MAIN SETTINGS 
* Copy secret token 

---

## Deploy on heroku.
**not work**

**!TTS DOESN'T WORK!**
* Create project on heroku
* Connect **github repository(it should be private)**
* Deploy branch

**not work**

---

## How usage:

###  Run locally (preferably)
* Create browser in OBS scene
* add the URL to the file like:
```
file:///<Index.html file location>
``` 
### Run heroku (tts doesn't work)
* Create browser in OBS scene
* Add URL app heroku

---

## Settings alert (animation customization and more):

### Alert design:
* Class ```topAlert``` - The appearance of the top of the donation (name and amount)
* Class ```bottomAlert``` - The appearance of the bottom of the donation (message)

### Animation:
For new animations need add css class with animation in ```style.css``` and add this class for object. You can just change the names of the animations in ```let config```

### Add sounds alert:
Add in ```config['sounds']``` the code by example:
```js
"YOUR_NAME_SOUND":{
            "durationSound": DURATION SOUND + 1000MS,
            "alertSound": "PATH TO SOUND FILE"
        }
```


### Setting special alerts for a certain amount:

A ```special``` function is responsible for special alerts. To add an alert for a certain amount, you need to add a construction to the ```switch(true)``` according to the example:
```js
case(amount > YOUR AMOUNT): 
            sound = config['sounds']['YOUR SOUND']; // change sound alert
            otherAlert.src = "YOUR GIF/PIC"; // !! need other.flag == true !! if ==false alert will not work 
            topAlert.style.backgroundColor = 'gold'; // change top alert backgroundcolor to gold.You can change for any other color.
            topAlert.style.color = 'black'; // change top alert textcolor to gold. You can change for any other color.
            // You can also change bottomAlert
            bottomAlert.style.backgroundColor = 'white' // change bottom alert backgroundcolor to white. You can change for any other color.
            bottomAlert.style.color = 'black' // change bottom alert textcolor to black. You can change for any other color.
            break;
```
Other check comment code in script config.

---

## DEMO:
<img src="https://i.imgur.com/TjA0dkl.gif" width="500">
<img src="https:https://i.imgur.com/530NMUW.gif" width="500">
*(with gif/img)*

---
### OFFTOP
Пофиксил все баги, которые были в прошлой версии. Ну и к тому же код сделал более читаемым(ну на сколько смог). Еще будет много изменений.

Version 2. 
