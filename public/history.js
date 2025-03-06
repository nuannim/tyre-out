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

// * ของเนยสด ห้ามแตะ ============================================================================================

function showDetail(detailObject) {
    console.log('showDetail', detailObject);

    if (detailObject.slot === 1 || detailObject.slot === '1') {
        document.getElementById('caseStartDatetime').innerHTML = detailObject.caseStartDatetime + ' ช่วงเช้า';
    } else if (detailObject.slot === 2 || detailObject.slot === '2') {
        document.getElementById('caseStartDatetime').innerHTML = detailObject.caseStartDatetime + ' ช่วงบ่าย';
    } else if (detailObject.slot === 3 || detailObject.slot === '3') {
        document.getElementById('caseStartDatetime').innerHTML = detailObject.caseStartDatetime + ' ช่วงเย็น';
    }

    document.getElementById('image').style.backgroundImage = `url(${detailObject.branchPhotoURL})`;
    document.getElementById('centerName').innerHTML = detailObject.centerName;
    document.getElementById('address').innerHTML = detailObject.address;
    document.getElementById('telephone').innerHTML = detailObject.telephone;
    document.getElementById('time').innerHTML = detailObject.openTime + ' - ' + detailObject.closedTime;

    document.getElementById('caseCategory').innerHTML = detailObject.caseCategory;
    // document.getElementById('caseStartDatetime').innerHTML = detailObject.caseStartDatetime;
    document.getElementById('carModel').innerHTML = detailObject.carModel;
    // document.getElementById('mileage').innerHTML = detailObject.mileage;
    document.getElementById('caseSummary').innerHTML = detailObject.caseSummary;

    document.getElementById('carRegisNo').innerHTML = detailObject.carRegisNo;
    document.getElementById('firstLastName').innerHTML = detailObject.firstName + ' ' + detailObject.lastName;
    document.getElementById('phoneNumber').innerHTML = detailObject.phoneNumber;
    document.getElementById('email').innerHTML = detailObject.email;

    // console.log(detailObject.caseStartDatetime + ' ช่วงเช้า');

}