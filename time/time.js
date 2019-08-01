window.onload = initAll;

let display ;
let timeout ;

function initAll() {
    document.getElementById("submit").onclick = timeDisplay;
    document.getElementById("reset").onclick = displayReset;

    display = document.getElementById("modifiable");
    
}

function timeDisplay(){
    let radios = document.getElementsByName("actions");
    let isInputNull = !checkInput();
    let selectedIndex = -1;
    
    for (let i = 0; i< radios.length; i++ ){
        if (radios[i].checked ){
           selectedIndex = i;
           break
        }
    }

    if (selectedIndex > 0 && isInputNull){
        alert("please input the date!");
        return false;
    }

    switch (selectedIndex){
        case 0:
            showNow();
            break;

        case 1:
            showSub();
            break;

        case 2:
            countDown();
            break;

        default:
            alert("error selected :"+selectedIndex);
            return false;
    }

    console.log("execute finish!")

}

function checkInput() {
    let inputs = document.getElementsByName("time");
    for (let i =0 ; i < inputs.length; i++){
        if (inputs[i].value === ""){
            return false
        }
    }

    return true
}

function displayReset() {
    let inputs = document.getElementsByName("time");
    for (let i =0 ; i < inputs.length; i++){
        inputs[i].value = "";
    }

    let radios = document.getElementsByName("actions");
    for (let i =0 ; i < inputs.length; i++){
        radios[i].checked = false;
    }

    display.innerHTML = "";

    clearTimeout(timeout)
}

function showSub() {
    let date = getDate();

    if (!date){
        alert("invalid time format!");
        return;
    }

    let now = new Date();

    if (date.getTime() < now.getTime()){
        addText("当前距离 "+dateFormat(date)+"已过了 "+dayTill(now,date)+"天");
        return
    }

    addText("当前距离 "+dateFormat(date)+"还剩下 "+dayTill( date,now)+"天");

    function dayTill(late,early){
        return Math.ceil((late.getTime()-early.getTime())/(1000*60*60*24))
    }
}

function getDate(){
    let year = parseInt(document.getElementById("year").value);
    let month = parseInt(document.getElementById("month").value);
    let day = parseInt(document.getElementById("day").value);


    return new Date(year,month-1,day);
}

function showNow() {
    let now = new Date();

    addText("dateFormat: "+dateFormat(now));
    addText("toString: "+now.toString());
    addText("toTimeString: "+now.toTimeString());
    addText("toUTCString: " + now.toUTCString());
    addText("toDateString: "+now.toDateString());
    addText("getDate: "+ now.getDate());
    addText("getTime: "+now.getTime());

}

function countDown() {
    if (!checkInput()){
        display.innerHTML = "";
        return
    }

    let now = new Date();
    let date = getDate();
    let relation = "还剩下 ";
    let distance = date.getTime()-now.getTime();

    if (date.getTime() < now.getTime()){
        relation = "已过了 ";
        distance = now.getTime()-date.getTime();
    }

    let day = distance/(1000*60*60*24);
    let hour =distance/(1000*60*60)%24;
    let min =distance/(1000*60)%60;
    let second = distance/1000%60;

    let text = "距离 "+dateFormat(date)+"年"+relation+
        Math.floor(day)+"d "+
        Math.floor(hour)+"h "+
        Math.floor(min)+"m "+
        Math.floor(second)+"s";
    
    let paragraph  = document.getElementById("countDownDisplayParagraph");
    if (!paragraph){
        paragraph = document.createElement("p");
        paragraph.id = "countDownDisplayParagraph";
        paragraph.appendChild(document.createTextNode(""));

        if (display.childElementCount > 0){
            display.insertBefore(paragraph,display.firstChild)

        }else{
            display.appendChild(paragraph)
        }
    }

    paragraph.innerText = text;

    timeout = setTimeout(countDown,1000)

}

function addText(content) {
    let text = document.createTextNode(content);
    let paragraph = document.createElement("p");
    paragraph.appendChild(text);

    display.appendChild(paragraph);

}

function dateFormat(date){
    let month = date.getMonth()+1;
    if (month < 10){
        month = "0"+month;
    }

    let day = date.getDate();
    if (day < 10){
        day = "0"+day;
    }

    return date.getFullYear()+"-"+
        month+"-"+day+" ";

}