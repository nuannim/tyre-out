//swab tabs
const tab_btn = document.querySelectorAll('.tab-btn');
const tab_ctn = document.querySelectorAll('.tab-content');


const showPan = (indx, clrCde) =>{
    tab_btn.forEach(element => {
        element.style.backgroundColor = "";
        element.style.color = "";
    });
    tab_btn[indx].style.color="#00000";
    tab_btn[indx].style.backgroundColor ="#eee";

    tab_ctn.forEach(element => {
        element.style.display="none";
    });
    tab_ctn[indx].style.display="block";
}

showPan(0,'#1abc9c');










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
function bac4(){
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
    document.getElementById("popup-edit").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-edit").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;

    let inputs = document.querySelectorAll(".popup-input");
    inputs.forEach(input => {
        originalInfo[input.id] = input.value; //เก็บค่าแรกเริ่มไว้
    });
});
});
function bac2(){
    document.getElementById("popup-edit").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-edit").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;

    let inputs = document.querySelectorAll(".popup-input");
    inputs.forEach(input => {
        input.value = originalInfo[input.id]; // ถ้ากดปิด ดึงเอาค่าที่เก็บไว้กลับมา
        input.setAttribute("disabled", true);
    });
}

//ปุ่มแก้ไขข้อมูล
function edit_info(){
    let inputs = document.querySelectorAll(".popup-input");
    inputs.forEach(input => input.removeAttribute("disabled"));

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "inline-block");

    isEditing = true;
}

//ปุ่มบันทึกข้อมูล
function save_info(){
    let inputs = document.querySelectorAll(".popup-input");
    inputs.forEach(input => input.setAttribute("disabled", true)); //กลับไป disabled

    inputs.forEach(input => { 
        originalInfo[input.id] = input.value; //บันทึกค่าใหม่ลง
    });

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "none");

    isEditing = false;
    alert("บันทึกข้อมูลสำเร็จ")
}
//ล็อคไม่ให้ปิด
document.getElementById("bac").addEventListener("click", function(event){{
    if (isEditing) {
        alert("กรุณากดบันทึกการแก้ไขข้อมูลหรือยกเลิกการแก้ไขข้อมูล");
        event.preventDefault();
    }else {
        bac();
    }
}});

//กดปิด Popup view
function bac2(){
    document.getElementById("popup-edit").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-edit").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;

    let inputs = document.querySelectorAll(".popup-input");
    inputs.forEach(input => {
        input.value = originalInfo[input.id]; // เอาค่าเดิม
        input.setAttribute("disabled", true);
    });
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

