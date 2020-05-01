function pageVerticalResolution() {
    var navbarHeight = document.getElementById('navbar').clientHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    var finalCarouselHeight = window.innerHeight - navbarHeight - footerHeight + "px";
    try {
    document.getElementById("carousel-inner-ID").style.height = finalCarouselHeight;
    }
    catch (e) {      
    }
}

window.onresize = pageVerticalResolution;

function transHide() {
    $("#welcomeText").addClass("disabledbutton");
}

function transShow() {
    var element = document.getElementById("loginContainer");
    element.classList.remove("disabledbutton");
}

function transShow() {
    $("#loginContainer").addClass("enablebutton");
}

function visitLandmark()
{
    var numberOfLandmark = Math.floor(Math.random() * 10) + 1;
    var windowName = window.location.href.replace("index.html",  'landmarks.html?filter=' + numberOfLandmark);
    window.location = windowName;
}

window.addEventListener('load', () => {
    registerSW();
});

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('sw.js');
        } catch (e) {
            console.log(`SW registration failed`);
        }
    }
}
