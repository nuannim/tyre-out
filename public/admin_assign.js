// const tab_btn = document.querySelectorAll('.tab-btn');
// const tab_ctn = document.querySelectorAll('.tab-content');


// const showPan = (indx, clrCde) =>{
//     tab_btn.forEach(element => {
//         element.style.backgroundColor = "";
//         element.style.color = "";
//     });
//     tab_btn[indx].style.color="#00000";
//     tab_btn[indx].style.backgroundColor ="#eee";

//     tab_ctn.forEach(element => {
//         element.style.display="none";
//     });
//     tab_ctn[indx].style.display="block";
// }

// showPan(0,'#1abc9c');

// //กดปิด Popup view
// function bac(){
//     document.getElementById("popup-bg").style.visibility = "hidden";
//     document.getElementById("popup-ov").style.visibility = "hidden";
//     document.getElementById("popup-bg").style.opacity = 0;
//     document.getElementById("popup-ov").style.opacity = 0;
// }

//กดไอคอนคลิปบอร์ด แล้วแสดง Popup ใบเสนอราคา
document.querySelectorAll('.quotation-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-quotation").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-quotation").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
function bac4(){
    document.getElementById("popup-quotation").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-quotation").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}

//กดปุ่มไอคอนดู แล้วแสดง Popup view
document.querySelectorAll('.view-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-view").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-view").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
function bac(){
    document.getElementById("popup-view").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-view").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}