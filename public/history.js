function bac(){
    document.getElementById("popup-bg").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-bg").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}

function bac2(){
    document.getElementById("hid-drop-content").style.display = "none";
    document.getElementById("popup-ov2").style.visibility = "hidden";
}
// function showpop(){
//     document.getElementById("popup-bg").style.visibility = "visible";
//     document.getElementById("popup-ov").style.visibility = "visible";
//     document.getElementById("popup-bg").style.opacity = 1;
//     document.getElementById("popup-ov").style.opacity = 1;
// }
document.querySelectorAll('.app').forEach(a => {
    a.addEventListener('click', function() {
        document.getElementById("popup-bg").style.visibility = "visible";
        document.getElementById("popup-ov").style.visibility = "visible";
        document.getElementById("popup-bg").style.opacity = 1;
        document.getElementById("popup-ov").style.opacity = 1;
    });
});

function shownav(){
    document.getElementById("hid-drop-content").style.display = "block";
    document.getElementById("popup-ov2").style.visibility = "visible";
}