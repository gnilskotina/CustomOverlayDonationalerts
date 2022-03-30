<p align="center">
  <img src="https://acc-gt.ru/wp-content/uploads/2021/03/ch_129310_UnSh.png">
  <br>
  <h1 align="center">Custom overlay donationalerts</h1>
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
**!TTS DOESN'T WORK!**
* Create project on heroku
* Connect **github repository(it should be private)**
* Deploy branch

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

## Animation customization and more:

Alert design:
* Class ```topAlert``` - The appearance of the top of the donation (name and amount)
* Class ```bottomAlert``` - The appearance of the bottom of the donation (message)

Animation:

For new animations need add css class with animation in ```style.css``` and add this class for object. You can just change the names of the animations in ```let config```

---

## DEMO:
![An open source player](https://i.imgur.com/TjA0dkl.gif)

---
### OFFTOP
Пофиксил все баги, которые были в прошлой версии. Ну и к тому же код сделал более читаемым(ну на сколько смог). Еще будет много изменений.

Version 2. 
