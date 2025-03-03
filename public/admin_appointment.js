//swap tabs
const tab_btn = document.querySelectorAll('.tab-btn');
const tab_ctn = document.querySelectorAll('.tab-content');
const showPan = (indx) =>{
    tab_btn.forEach(element => {
        element.style.backgroundColor = "";
        element.style.color = "";
    });
    tab_btn[indx].style.color="white";
    tab_btn[indx].style.backgroundColor ="#104B82";

    tab_ctn.forEach(element => {
        element.style.display="none";
    });
    tab_ctn[indx].style.display="block";
}
showPan(0);


function shownav(){
    document.getElementById("hid-drop-content").style.display = "block";
    document.getElementById("popup-ov2").style.visibility = "visible";
}






//POPUPS & BUTTONS FUNCTIOON

//กดไอคอนคลิปบอร์ด แล้วแสดง Popup ใบเสนอราคา
document.querySelectorAll('.quotation-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-quotation").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-quotation").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
function bac1(){
    document.getElementById("popup-quotation").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-quotation").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}



















//กดปุ่มไอคอนดู แล้วแสดง Popup view
let originalInfo = {}; //เก็บค่า
let isEditing = false; //เก็บบสถานะการกำลังทำการแก้ไข

document.querySelectorAll('.view-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-view").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-view").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;

    let inputs = document.querySelectorAll(".popup-input");
    inputs.forEach(input => {
        originalInfo[input.id] = input.value; //เก็บค่าแรกเริ่มไว้
    });
});
});

function bac2(){
    if (isEditing) {
        alert("กรุณาบันทึกหรือยกเลิกการแก้ไขข้อมูล");
    } else {
        document.getElementById("popup-view").style.visibility = "hidden";
        document.getElementById("popup-ov").style.visibility = "hidden";
        document.getElementById("popup-view").style.opacity = 0;
        document.getElementById("popup-ov").style.opacity = 0;
    
        let inputs = document.querySelectorAll(".popup-input");
        inputs.forEach(input => {
            input.value = originalInfo[input.id]; // ดึงค่าที่เก็บไว้
            input.setAttribute("disabled", true);
        });
    
        isEditing = false;
    }
}

//ปุ่มแก้ไขข้อมูล
function edit_info(){
    let inputs = document.querySelectorAll(".popup-input");
    inputs.forEach(input => input.removeAttribute("disabled"));

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".cancel-edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "inline-block");

    isEditing = true;
}

//ปุ่มบันทึกข้อมูล
function save_info(){
    let inputs = document.querySelectorAll(".popup-input");
    inputs.forEach(input => input.setAttribute("disabled", true));

    inputs.forEach(input => { 
        originalInfo[input.id] = input.value; //บันทึกค่าใหม่
    });

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".cancel-edit-button").forEach(btn => btn.style.display = "none");

    isEditing = false;
    alert("บันทึกข้อมูลสำเร็จ")
}

function cancel_edit(){
    let inputs = document.querySelectorAll(".popup-input");
    inputs.forEach(input => {
        input.value = originalInfo[input.id]; 
        input.setAttribute("disabled", true); // ดึงค่าที่เก็บไว้
    });

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".cancel-edit-button").forEach(btn => btn.style.display = "none");

    isEditing = false;
}

















//กดปุ่มลบ แล้วแสดง Popup delete
document.querySelectorAll('.delete-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-delete").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-delete").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
//ปุ่มยกเลิกการลบข้อมูล
function cancel_del(){
    bac3()
}

//ปุ่มยืนยันการลบข้อมูล
function confirm_del(){
    alert("ทำการยกเลิกการนัดหมายสำเร็จ")
    bac3()
}
//กดปิด Popup delete
function bac3(){
    document.getElementById("popup-delete").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-delete").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}

