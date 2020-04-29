function pageVerticalResolution() {
    var navbarHeight = document.getElementById('navbar').clientHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    var finalCarouselHeight = window.innerHeight - navbarHeight - footerHeight + "px";
    document.getElementById("carousel-inner-ID").style.height = finalCarouselHeight ;
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
    window.location= window.location.hostname + 'landmarks.html?filter=' + numberOfLandmark;
}
