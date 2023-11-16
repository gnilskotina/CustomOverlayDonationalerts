function saveConf(idToken,idDuration){
    localStorage.setItem('token', document.getElementById(idToken).value);
    localStorage.setItem('duration', document.getElementById(idDuration).value);
    document.location.reload();
  }

function addCustom(){
    console.log(document.getElementById("custom"));
}


function disp(form) {
    if (form.style.display == "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

try{
    document.getElementById('idToken').value = localStorage.getItem('token');
    document.getElementById('idDuration').value = localStorage.getItem('duration');
}
catch{
    alert('Config not found');
}