var myButton = document.getElementById("apointmentsbtn");
var myPopup = document.getElementById("myPopup");
var closePopup = document.getElementById("close-btn");

myButton.onclick = function() {
  myPopup.style.display = "block";
}

closePopup.onclick = function() {
  myPopup.style.display = "none";
}


// close btn
var myPopup1 = document.getElementById("myPopup1");

const popbtn2=document.getElementById("pop-btn2");

popbtn2.onclick=function(){
  myPopup1.style.display="block"
}



