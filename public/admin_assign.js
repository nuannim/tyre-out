
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






//กดปุ่มลบ แล้วแสดง Popup delete
document.querySelectorAll('.assign-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-assign").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-assign").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
function cancel(){
    bac3()
}
function confirm(){
    alert("รับการดูแลลูกค้าสำเร็จ")
    bac3()
}
function bac3(){
    document.getElementById("popup-assign").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-assign").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}

function acceptcase(serviceHistoryId) {
    document.getElementById("popup-assign").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-assign").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
    console.log(serviceHistoryId);
    document.querySelector('.confirm-button').addEventListener('click', function() {
        fetch('/acceptCase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serviceHistoryId })
        })
        .then(response => {
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                return response.json();
            } else {
                throw new Error('Unexpected response format');
            }
        })
        .then(data => {
            if (data.success) {
                alert("รับการดูแลลูกค้าสำเร็จ");
                location.reload();
            } else {
                alert('Failed to update service history');
            }
        })
    });
}