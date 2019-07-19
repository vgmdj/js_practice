

window.onload = initAll;


function initAll() {
    for (let i =0 ; i < document.links.length; i++ ){
        document.links[i].target = "ifm";
    }
}

function initLinks() {
    for (var i=0; i<document.links.length; i++) {
        document.links[i].onclick = writeContent;
        document.links[i].thisPage = i+1;
    }
}

function writeContent() {
    var newText = "<h1>You are now looking at Example " + this.thisPage + ".<\/h1>";

    document.getElementById("ifm").contentWindow.document.body.innerHTML = newText;
    return false;
}
