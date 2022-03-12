function openNav() {
  if ($(window).width() < 650) {
    document.getElementById("mySlideNav").style.width = "100%";
    document.getElementById("mySlideNav").style.height = "250px";
    document.getElementById("navOpener").style.width = "0px";
    document.getElementById("navOpener").style.overflow = "hidden";
  } else {
    document.getElementById("mySlideNav").style.width = "250px";
    document.getElementById("navOpener").style.width = "0px";
    document.getElementById("navOpener").style.overflow = "hidden";
  }
}

function closeNav() {
  document.getElementById("mySlideNav").style.width = "0";
  document.getElementById("navOpener").style.width = "40px";
  document.getElementById("navOpener").style.overflow = "visible";
}

function toAbout(){
  if (navigator.userAgent.match(/Chrome|AppleWebKit/)) { 
    window.location.href = "#About";
    window.location.href = "#About";  /* these take twice */
} else {
    window.location.hash = "#About";
}
}