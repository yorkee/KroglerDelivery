var INTERVAL_TIME=3*60000;  //TODO:  please do not increase internval time faster than a minute.  It will hammer kroger's server and slow down EVERYONE trying to use it.  Please be responsible.  

var BACK_TIME=30000;

var theTimeout = null, theBeepInterval = null

 
a = new AudioContext();

 

function k(w, x, y) {
    v = a.createOscillator();
    u = a.createGain();
    v.connect(u);
    v.frequency.value = x;
    v.type = "square";
    u.connect(a.destination);
    u.gain.value = w * 0.01;
    v.start(a.currentTime);
    v.stop(a.currentTime + y * 0.001);
}

function goBackToCart() {
    var hehe = document.getElementsByTagName("a");
    for (i = 0; i < hehe.length; i++) {
        console.log((hehe[i].getAttribute("to") + ""));
        if ((hehe[i].getAttribute("to") + "").indexOf("cart") >= 0) {
            hehe[i].click();
        }
    };
}

function submitStuff() {
    var haha = document.getElementsByTagName("button")
    for (i = 0; i < haha.length; i++) {
        if ((haha[i].textContent).indexOf("Check Out Delivery Items") >= 0) {
            console.log("hit!");
            haha[i].click();
        }
    }
}

function recursiveCheck() {
    if (theTimeout && theTimeout.clearTimeout) {
        theTimeout.clearTimeout();
    }
    console.log("recursiveCheck()" + tt);
    submitStuff();
    theTimeout = setTimeout(checkIfSlot, BACK_TIME + Math.round(Math.random()*7500));
}

function checkIfSlot() {
    var warningList = document.getElementsByClassName("kds-Message--warning");
    var errorList = document.getElementsByClassName("kds-Message--error");

    // condition meet!  there is tile slot!!!
    if (warningList.length <= 0 && errorList.length <= 0){



        // clearInterval(theBeepInterval) to stop it

        theBeepInterval = setInterval(()=>{
            k(105,813,500); k(125,613,800);
        }, 2000);        
    } else {
        recursiveBack();
    }
}

function recursiveBack() {
    if (theTimeout && theTimeout.clearTimeout) {
        theTimeout.clearTimeout();
    }
    console.log("recursiveBack() " + tt);
    goBackToCart();
    theTimeout = setTimeout(recursiveCheck, INTERVAL_TIME + Math.round(Math.random()*7500));
}

recursiveCheck();
