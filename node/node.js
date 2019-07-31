window.onload = initPage;

let bodyDoc;

function initPage() {
    document.getElementById("changeText").onsubmit = changeText;
    bodyDoc = document.getElementById("modifiable");

    for (let i =0; i< document.getElementsByName("nodeAction").length; i++ ){
        document.getElementsByName("nodeAction")[i].onclick = initRadio;
    }

}

function initRadio(){
    let len = bodyDoc.getElementsByTagName("p").length;
    if (len > 1){
        document.getElementById("selected").options.selectedIndex = 0;
    }
}

function changeText() {
    let selectedAction = -1;
    let actions = document.getElementsByName("nodeAction");
    let ptotal = bodyDoc.getElementsByTagName("p").length;


    for (let i =0; i < actions.length; i++){
        if (actions[i].checked){
            selectedAction = i;
            break;
        }
    }

    switch(selectedAction){
        default:
            alert("you must select the action first!");
            return false;

        case 0:
            addText();
            break;

        case 1:
            insertBefore();
            break;

        case 2:
            if (ptotal < 1){
                alert("you should add a new text first");
                return false;
            }

            removeText();
            break;

        case 3:
            if (ptotal < 1){
                alert("you should add a new text first");
                return false;
            }

            replaceText();
            break;

    }

    document.getElementById("selected").options.length = 0;

    for (let i = 0; i < bodyDoc.getElementsByTagName("p").length; i++ ){
        document.getElementById("selected").options[i] = new Option(i+1);
    }

    initRadio();

    return false;
}

function addText(){
    let originText = document.getElementById("textarea").value;
    let newText = document.createTextNode(originText);

    let newParagraph = document.createElement("p");
    newParagraph.appendChild(newText);

    bodyDoc.appendChild(newParagraph);
    return false;
}

function insertBefore() {
    let selectedIndex = document.getElementById("selected").options.selectedIndex;
    let selectedParagraph = bodyDoc.getElementsByTagName("p").item(selectedIndex);

    let originText = document.getElementById("textarea").value;
    let newText = document.createTextNode(originText);

    let newParagraph = document.createElement("p");
    newParagraph.appendChild(newText);

    bodyDoc.insertBefore(newParagraph,selectedParagraph);
    return false;

}

function removeText() {
    let selectedIndex = document.getElementById("selected").options.selectedIndex;
    let paragraphs = bodyDoc.getElementsByTagName("p");

    if (selectedIndex < 0 || selectedIndex > paragraphs.length-1){
        alert("selected error, now total:"+paragraphs.length+", and you selected :"+selectedIndex);
        return false
    }

    if (paragraphs.length < 1 ) {
        alert("no enough paragraph, you should add one first!");
        return false
    }

    let selected = paragraphs.item(selectedIndex);
    bodyDoc.removeChild(selected);
    return false;
}

function replaceText() {
    let selectedIndex = document.getElementById("selected").options.selectedIndex;
    let selectedParagraph = bodyDoc.getElementsByTagName("p").item(selectedIndex);

    let originText = document.getElementById("textarea").value;
    let newText = document.createTextNode(originText);

    let newParagraph = document.createElement("p");
    newParagraph.appendChild(newText);

    bodyDoc.replaceChild(newParagraph,selectedParagraph);

    return false;
}

