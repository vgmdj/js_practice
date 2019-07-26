window.onload = initPage;


function initPage(){
    let pageHit = cookieVal("pageHit");

    document.getElementById("pageCookie").innerText = "you have visited this page "+ pageHit + " times";

    setCookie("pageHit",parseInt(pageHit)+1);

}

function cookieVal(key) {
    let cookies = document.cookie.split(";");

    for (let i = 0;  i < cookies.length; i++){
        if (cookies[i].split("=")[0] === key) {
            return cookies[i].split("=")[1];
        }
    }

    return 0;
}

function setCookie(key,value) {
    let expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate()+2);

    document.cookie = key + "=" + value + ";expires=" + expiresDate.toGMTString();


}

