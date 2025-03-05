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

// นี่คือฟังก์ชันที่ทำให้ popup เปืดขึ้นมา
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

// async function showDetail(serviceHistoryId) {
//     console.log('showDetail', serviceHistoryId);

//     const response = await fetch(`/getShowDetail/${serviceHistoryId}`);
//     const showDetail = await response.json();

// }

function showDetail(detailObject) {
    console.log('showDetail', detailObject);

    document.getElementById('centerName').innerHTML = detailObject.centerName;
    document.getElementById('address').innerHTML = detailObject.address;
    document.getElementById('telephone').innerHTML = detailObject.telephone;
    document.getElementById('time').innerHTML = detailObject.openTime + ' - ' + detailObject.closedTime;

    document.getElementById('caseCategory').innerHTML = detailObject.caseCategory;
    document.getElementById('caseStartDatetime').innerHTML = detailObject.caseStartDatetime;
    document.getElementById('carModel').innerHTML = detailObject.carModel;
    document.getElementById('mileage').innerHTML = detailObject.mileage;
}