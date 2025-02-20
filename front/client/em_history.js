//กดปิด Popup view
function bac(){
    document.getElementById("popup-bg").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-bg").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}
//กดปิด Popup edit
function bac2(){
    document.getElementById("popup-edit").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-edit").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}

//ปุ่มันทึกข้อมูล
function save_info(){
    alert("บันทึกข้อมูลสำเร็จ")
}
//ปุ่มลบข้อมูล
function delete_info(){
    alert("ทำการยกเลิกการนัดหมายสำเร็จ")
}

//กดดูแล้วแสดง Popup view
document.querySelectorAll('.info').forEach(a => {
        a.addEventListener('click', function() {
            //ให้แยกกับปุ่ม
            if (event.target.closest('button')) return;
        document.getElementById("popup-bg").style.visibility = "visible";
        document.getElementById("popup-ov").style.visibility = "visible";
        document.getElementById("popup-bg").style.opacity = 1;
        document.getElementById("popup-ov").style.opacity = 1;
    });
});

//กดปุ่มแก้ไขแล้วแสดง Popup edit
document.querySelectorAll('.edit-button').forEach(a => {
        a.addEventListener('click', function() {
            event.stopPropagation(); // กันไว้ให้แยกจากการกดแถว
        document.getElementById("popup-edit").style.visibility = "visible";
        document.getElementById("popup-ov").style.visibility = "visible";
        document.getElementById("popup-edit").style.opacity = 1;
        document.getElementById("popup-ov").style.opacity = 1;
    });
});