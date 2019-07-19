window.onload = initAll;
window.onunload = function(){};

function initAll(){
    initIframe("default");

    document.getElementById("select").selectedIndex = 1;

    document.getElementById("form").onsubmit = initSelect;

    document.getElementById("form2").onsubmit = initInput;

}

function initSelect() {
    this.target = "ifm";

}

function initIframe(option) {
    let h1 = "<h1> this is a iframe and form's test, and the selected content is : <br>"+
        option + " . <\/h1>";
    document.getElementById("ifm").contentWindow.document.body.innerHTML = h1;
}

function initInput(){
    this.target = "ifm";

    let allTags  = document.getElementsByTagName("*");
    let allGood = true;

    for (let i =0 ; i< allTags.length; i++ ){
        if (!allGoodTags(allTags[i])){
            allGood = false;
        }
    }

    return allGood;

    function allGoodTags(tag) {
        let allClasses = tag.className.split(" ");

        for (let i =0; i < allClasses.length; i++){
            if (allClasses[i] === "normal" && allGood && tag.value === "") {
                tag.className = "invalid";
                tag.focus();
                if (tag.nodeName === "INPUT"){
                    tag.select();
                }

                return false;
            }

            if (allClasses[i] === "invalid" && tag.value !== ""){
                tag.className = "normal";
            }

        }

        return true;


    }



}