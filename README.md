<p align="center">
  <img src="https://acc-gt.ru/wp-content/uploads/2021/03/ch_129310_UnSh.png">
  <br>
  <h1 align="center">Custom overlay donationalerts</h1>
  <h3 align="center">Custom alert donationalerts</h3>
</p>


## Description📋
Flexible wrapper for donation notifications. Full customization of animations and appearance of the alert. There will be many more changes. 



## Setting up💾

### 😁Easy setting:
Click on the <span style='background: red'>config</span> button in the lower left corner and fill out the form, click <span style='background: green'>save</span>

<details>
  <summary>Screenshots</summary>
  <img src="https://i.imgur.com/9RbhhRE.png">

  <img src="https://i.imgur.com/NH2rzm0.png">
</details>

### 😥Advanced setting:
Before starting, you must first configure ```let config``` (in script.js).
All descriptions of variables are in the comments to the code.


---
<b>*After downloading, if you are not using the old version, then you need to delete the OLD_VERSION folder.*</b>

---

### 🔍How find token donationalerts:
* Go to SETTINGS -> MAIN SETTINGS 
* Copy secret token 


## ▶️How usage:

### 💻Run locally (preferably)
* Create browser in OBS scene
* add the URL to the file like:
```
file:///<Index.html file location>
``` 
* Configure it through interaction with the browser in the OBS or through the code in alert.js
### ❌Run heroku (tts doesn't work)❌
* Create browser in OBS scene
* Add URL app heroku


## ⚙️Settings alert (animation customization and more):

### ✨Alert design:
* Class ```topAlert``` - The appearance of the top of the donation (username & amount)
* Class ```bottomAlert``` - The appearance of the bottom of the donation (message)
* Class ```otherAlert``` - The appearance of image/gif and others
* Class ```amountAlert``` - The appearance of amount
* Class ```usernameAlert``` - The appearance of username

### 👾Animation:
For new animations need add css class with animation in ```style.css``` and add this class for object. You can just change the names of the animations in ```let config```

### 🎶Add sounds alert:
Add in ```config['sounds']``` the code by example:
```js
"YOUR_NAME_SOUND": "PATH TO SOUND FILE",
```


### 🔅Setting special alerts for a certain amount:

A ```special``` function is responsible for special alerts. To add an alert for a certain amount, you need to add a construction to the ```switch(true)``` according to the example:
```js
case(amount > YOUR AMOUNT): 
            sound = config['sounds']['YOUR SOUND']; // change sound alert
            otherAlert.src = "YOUR GIF/PIC"; // !! need other.flag == true !! if ==false alert will not work 
            username_alert.style.backgroundColor = 'gold'; // change top alert backgroundcolor to gold.You can change for any other color.
            username_alert.style.color = 'black'; // change top alert textcolor to gold. You can change for any other color.
            // You can also change bottomAlert
            bottomAlert.style.backgroundColor = 'white' // change bottom alert backgroundcolor to white. You can change for any other color.
            bottomAlert.style.color = 'black' // change bottom alert textcolor to black. You can change for any other color.
            break;
```
You can set any style for any part of the alert.

<details>
  <summary>Example</summary>
  <img src="https://i.imgur.com/FvmOuaW.gif" width="500">
</details>

Other check comment code in script config.


## 🎬DEMO:
<details>
  <summary>🎬🎬🎬DEMO🎬🎬🎬</summary>
  <img src="https://i.imgur.com/mAVNPdz.gif" width="500">
</details>

---
### OFFTOP
Contact with me: gnilskotina@gmail.com
