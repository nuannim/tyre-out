const today = new Date().toISOString().split('T')[0];
const dateinput = document.getElementById("dateinput");
dateinput.value = today;
dateinput.min = today;

const prevbtn = document.querySelectorAll(".btn-prev");
const nextbtn = document.querySelectorAll(".btn-next");
const formstep = document.querySelectorAll(".form-step");
const cir = document.querySelectorAll(".cir");
const indi = document.getElementById("indi");

let formstepnum = 0;


// * ของเนยสด ห้ามแตะ ================================================
let carModel;
let carYear;
let carGrade;
let mileage;
let centerId2;
let date;
let time;
let slot;
let caseCategory = 'เช็คระยะ';

let goodsDataForNoeysod; // * json ที่ได้มาจาก popup หน้าแรกของ appointment.ejs

let priceChemi;
let priceLabor = 500;
let priceTotal;

let guestFirstName;
let guestLastName;
let guestTel;
let guestEmail;
let guestCarRegisNo;

let LoggedIncarRegisNo;

let dataForBookingLoggedIn;
// * ================================================================


nextbtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (formstepnum < formstep.length-1) {
            formstepnum++;
            updateform();
        }
    });
});
prevbtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (formstepnum > 0) {
            formstepnum--;
            updateform();
        }
    });
});

function nextpage(){
    if (formstepnum < formstep.length-1) {
        formstepnum++;
        updateform();
    }
}


function updateform(){
    formstep.forEach((f) => {
        f.classList.contains("form-step-active") &&
          f.classList.remove("form-step-active");
    });
    formstep[formstepnum].classList.add("form-step-active");

    cir.forEach((cir, index) => {
        if (index <= formstepnum) {
            cir.classList.add("cir-active");
        }
        else{
            cir.classList.remove("cir-active");
        }
    });

    const progress = (formstepnum/(formstep.length-1)*100);
    indi.style.width = `${progress}%`;
}
function getQueryParam(param){
    const urlparam = new URLSearchParams(window.location.search);
    return urlparam.get(param);
}
// document.getElementById("sel1").value = getQueryParam("option1");
// document.getElementById("sel2").value = getQueryParam("option2");
// document.getElementById("sel3").value = getQueryParam("option3");
// document.getElementById("sel4").value = getQueryParam("option4");
const model = document.getElementById("sel1");
const year = document.getElementById("sel2");
const grade = document.getElementById("sel3");
const kilo = document.getElementById("sel4");
const timeinput = document.getElementsByName("timeinput");

// ^ อธิบาย: getQueryParam() เป็น function ไว้ดึงค่าจาก URL
model.value = getQueryParam("option1") || "";
year.value = getQueryParam("option2") || "";
grade.value = getQueryParam("option3") || "";
kilo.value = getQueryParam("option4") || "";



const showmodel = document.getElementById("show-model");
const showkilo = document.getElementById("show-kilo");
const showbranch = document.getElementById("show-branch");
const showdate = document.getElementById("show-date");
const showtime = document.getElementById("show-time");
// const showBranchId = 

if (getQueryParam("option1") && getQueryParam("option4")){
    showmodel.textContent = model.options[model.selectedIndex].text;
    showkilo.textContent = kilo.options[kilo.selectedIndex].text;
}

if (model.options[model.selectedIndex].value != ""){
    showmodel.textContent = model.options[model.selectedIndex].text;
}
else {
    showmodel.textContent = "-";
}

model.addEventListener("change", function() {
if (model.options[model.selectedIndex].value != ""){
    showmodel.textContent = model.options[model.selectedIndex].text;
}
else {
    showmodel.textContent = "-";
}
});


kilo.addEventListener("change", function() {
    if (kilo.options[kilo.selectedIndex].value != ""){
        showkilo.textContent = kilo.options[kilo.selectedIndex].text;
    }
    else {
        showkilo.textContent = "-";
    }
});

dateinput.addEventListener("change", function() {
    if (dateinput.value != ""){
        showdate.textContent = dateinput.value;
    }
    else {
        showdate.textContent = "-";
    }
});
showdate.textContent = dateinput.value;

timeinput.forEach(radio => {
    radio.addEventListener("change", function(){
        if (radio.checked) {
            showtime.textContent = radio.value;
        }
    });
});

// * ของเนยสด ห้ามแตะ
// const checklogin = document.getElementById("checklogin");
const button = document.querySelector(".abc");

// checklogin.addEventListener("click", function() {
//     button.style.display = "block";
// });


function shownav(){
    document.getElementById("hid-drop-content").style.display = "block";
    document.getElementById("popup-ov2").style.visibility = "visible";
}

function bac2() {
    document.getElementById("hid-drop-content").style.display = "none";
    document.getElementById("popup-ov2").style.visibility = "hidden";
}

function bac() {
    document.getElementById("hid-drop-content").style.display = "none";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-bg").style.visibility = "hidden";
    document.getElementById("popup-bg").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;

}


// let centerId2 = null; // * ของเนยสด ห้ามแตะ

document.addEventListener("DOMContentLoaded", function () {
    const provinceSelect = document.getElementById("branchvince");
    const districtSelect = document.getElementById("branch-district");

    // ฟังก์ชันโหลดอำเภอตามจังหวัดที่เลือก
    function loadDistricts() {
        const selectedProvince = provinceSelect.value;
        if (!selectedProvince) {
            districtSelect.innerHTML = '<option value="" selected>เลือกอำเภอ/เขต</option>';
            districtSelect.disabled = true;
            return;
        }
        districtSelect.disabled = false;

        fetch(`/district?province=${selectedProvince}`)
            .then(response => response.json())
            .then(districts => {
                districtSelect.innerHTML = '<option value="" selected>เลือกอำเภอ/เขต</option>';
                districts.forEach(district => {
                    const option = document.createElement("option");
                    option.value = district.district;
                    option.textContent = district.district;
                    districtSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error loading districts:", error));

        // โหลดอำเภอที่เกี่ยวข้อง
    }

    // ตั้งค่าเริ่มต้นให้ช่องอำเภอถูกปิดใช้งาน
    districtSelect.disabled = true;

    // โหลดอำเภอเมื่อเลือกจังหวัด
    provinceSelect.addEventListener("change", loadDistricts);
});

const findBranch = document.getElementById("btn-branch");
findBranch.addEventListener("click", function() {
    const provinceSelect = document.getElementById("branchvince");
    const districtSelect = document.getElementById("branch-district");
    const selectedProvince = provinceSelect.value;
    const selectedDistrict = districtSelect.value;

    if (selectedProvince && selectedDistrict){
        fetch(`/SelectedProvinceAndDistrict?province=${selectedProvince}&district=${selectedDistrict}`)
        .then(response => response.json())
        .then(districts => {
            document.getElementById("branch-area").innerHTML = '';
            districts.forEach(district => {
                    document.getElementById("branch-area").innerHTML += `<div id="branchh"><div class="serimg"><div id="forimg" style="background-image: url('` + district.branchPhotoURL + `'); height: 20vh;"></div></div><div id="fortext"><h3>` + district.centerName + '</h3><p>' + district.address + ' ' + district.subdistrict + ' ' + district.district + ' ' + district.province + ' ' + district.postcode + '</p>' + '<p>' + 'โทรศัพท์ ' + district.telephone + '</p>' + '<p>' + 'เปิดให้บริการเวลา ' + district.openTime + ' - ' + district.closedTime + `</p><button class="bran-btn" id="bran-btn-nongjam" onclick="selectBranch('` + district.centerId + `', '${district.centerName}')" type="button">เลือก</button></div></div>`;
                });
            })
            .catch(error => console.error("Error loading districts:", error));
    }
    else if (selectedProvince && !selectedDistrict){
        fetch(`/province?province=${selectedProvince}`)
        .then(response => response.json())
        .then(districts => {
            document.getElementById("branch-area").innerHTML = '';
            districts.forEach(district => {
                    document.getElementById("branch-area").innerHTML += `<div id="branchh"><div class="serimg"><div id="forimg" style="background-image: url('` + district.branchPhotoURL + `'); height: 20vh;"></div></div><div id="fortext"><h3 id>` + district.centerName + '</h3><p>' + district.address + ' ' + district.subdistrict + ' ' + district.district + ' ' + district.province + ' ' + district.postcode + '</p>' + '<p>' + 'โทรศัพท์ ' + district.telephone + '</p>' + '<p>' + 'เปิดให้บริการเวลา ' + district.openTime + ' - ' + district.closedTime + `</p><button class="bran-btn" id="bran-btn-nongjam" onclick="selectBranch('` + district.centerId + `', '${district.centerName}')" type="button">เลือก</button></div></div>`;
                });
            })
            .catch(error => console.error("Error loading districts:", error));
    }
});

function selectBranch(branchId, branchName) {
    console.log('centerId:'+ branchId);
    console.log('centerName:'+ branchName);
    let centerId = document.createElement("p");
    centerId.textContent = branchId;
    centerId.style.display = "none";
    showbranch.innerHTML = branchName;
    showbranch.appendChild(centerId);
    centerId2 = branchId; // * ของเนยสด ห้ามแตะ

    const branches = document.querySelectorAll('#branchh');

    branches.forEach(branch => {
        if (branch.innerText.includes(branchName)) {
            branch.classList.add('selected');
        } else {
            branch.classList.remove('selected');
        }
    });

    console.log('centerId2: ' + centerId2);
    
}
const btnGuest = document.getElementById("checklogin");
const forinput = document.getElementById("forinput");
const forlogin = document.querySelector(".forlogin");

btnGuest.addEventListener("click", function (e) {
    e.preventDefault();
    forlogin.style.display = "none";
    forinput.classList.remove("forinput-hidden");
    button.style.display = "block";
});
    



// * copy from index.js
    function showpop() {
        document.getElementById("popup-bg").style.visibility = "visible";
        document.getElementById("popup-ov").style.visibility = "visible";
        document.getElementById("popup-bg").style.opacity = 1;
        document.getElementById("popup-ov").style.opacity = 1;
    }

    let sel1 = document.getElementById("sel1");
    let sel2 = document.getElementById("sel2");
    let sel3 = document.getElementById("sel3");
    let sel4 = document.getElementById("sel4");
    let sel5 = document.getElementById("carchoose");
        // ฟังก์ชันโชว์ pop up ใบเสนอราคา
    
    // // ! ไม่ได้ใช้แล้ว
    // function checkshowpop(){
    //     // const selectedCar = sel5.value;
    //     // if (selectedCar) {
    //     //     const carParts = selectedCar.split(" - ");
    
    //     //     if (carParts.length === 3) {
    //     //         sel1.value = carParts[0];
    //     //         sel2.value = carParts[1];
    //     //         sel3.value = carParts[2];
    //     //     }
    //     // }
    //     // sel4.value = "twentythousand";
    //     const div = document.createElement("div");
    //     div.id = "check-result";
    //     const table = document.createElement("table");
    //     const thead = document.createElement("thead");
    //     const tr = document.createElement("tr");
    //     const th1 = document.createElement("th");
    //     const th2 = document.createElement("th");
    //     const th3 = document.createElement("th");
    //     th1.textContent = "รายการเคมีภัณฑ์และอะไหล่";
    //     th2.textContent = "จำนวน";
    //     th3.textContent = "ราคา";
    //     tr.appendChild(th1);
    //     tr.appendChild(th2);
    //     tr.appendChild(th3);
    //     thead.appendChild(tr);
    //     table.appendChild(thead);
    //     div.appendChild(table);
    
    //     const divbtn = document.createElement("div");
    //     divbtn.id = "check-btn";
    //     // divbtn.innerHTML = '<button class="btn-pop" id="btn-pop" onclick="gotoapp()">นัดหมาย</button>';
    //     divbtn.innerHTML = '<button class="btn btn-next" id="btn-pop">นัดหมาย</button>';
    //     div.appendChild(divbtn);
    
    //     document.getElementById("content").innerHTML = "";
    //     document.getElementById("content").appendChild(div);
    //     // if (sel1.value != "" & sel2.value != "" & sel3.value != "" & sel4.value != ""){
    //     //     showpop()
    //     // }
        
    //     showpop();
    // }

async function checkshowpopLoggedIn(regno) {
    console.log("=== START checkshowpopupguest() ===");

    //^ อธิบาย: ดึงค่าที่เลือกจาก dropdown
    carModel = document.getElementById("sel1").value; // ใช้ carModel
    carYear = document.getElementById("sel2").value; // ใช้ carYear
    carGrade = document.getElementById("sel3").value; // ใช้ carGrade
    mileage = document.getElementById("sel4").value; // mileage

    carRegisNo = regno;

    // const carModel = document.getElementById("sel1").value; // ใช้ carModel
    // const carYear = document.getElementById("sel2").value; // ใช้ carYear
    // const carGrade = document.getElementById("sel3").value; // ใช้ carGrade
    // const mileage = document.getElementById("sel4").value; // mileage

    console.log("🚗 carModel:", carModel);
    console.log("📅 carYear:", carYear);
    console.log("📏 mileage:", mileage);
    console.log("🚗 carRegis:", carRegisNo);

    if (!carModel || !carYear || !mileage) {
        alert("กรุณาเลือกรุ่นรถยนต์, ปีรถยนต์ และ ระยะทาง");
        return;
    }

    // เรียก API ไปดึงข้อมูลจากเซิร์ฟเวอร์
    try {
        // * ของเนยสด ห้ามแตะ ================================================
        const response = await fetch(`/getMaintenanceGoods?carModel=${carModel}&carYear=${carYear}&carGrade=${carGrade}&mileage=${mileage}`);
        const data = await response.json();

        goodsDataForNoeysod = data;

        console.log("🦌🦌🦌🦌🦌🦌🦌 response:", response);
        console.log("🦌🦌🦌🦌🦌🦌🦌 data:", data);

        if (data.length === 0) {
            alert("ไม่พบรายการสินค้า");
            return;
        }
        // * ================================================================

        // สร้างโครงสร้าง popup
        const div = document.createElement("div");
        div.id = "check-result";
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        const th3 = document.createElement("th");
        th1.textContent = "รายการเคมีภัณฑ์และอะไหล่";
        th2.textContent = "จำนวน";
        th3.textContent = "ราคา";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        table.appendChild(thead);

        // สร้าง tbody และเพิ่มข้อมูลลงไป
        const tbody = document.createElement("tbody");
        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.goodsBrand} ${item.goodsName}</td>
                <td>1</td>
                <td>${item.goodsPrice} บาท</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        div.appendChild(table);

        const divbtn = document.createElement("div");
        divbtn.id = "check-btn";
        divbtn.innerHTML = '<div id="but"><button class="btn btn-next" onclick="nextpage()" type="button">นัดหมาย</button></div>';
        div.appendChild(divbtn);

        document.getElementById("content").innerHTML = "";
        document.getElementById("content").appendChild(div);

        console.log("=== END checkshowpopupguest() ===");

        // แสดง popup
        showpop();
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
}
    
async function checkshowpopguest() {
    console.log("=== START checkshowpopupguest() ===");

    //^ อธิบาย: ดึงค่าที่เลือกจาก dropdown
    carModel = document.getElementById("sel1").value; // ใช้ carModel
    carYear = document.getElementById("sel2").value; // ใช้ carYear
    carGrade = document.getElementById("sel3").value; // ใช้ carGrade
    mileage = document.getElementById("sel4").value; // mileage

    // const carModel = document.getElementById("sel1").value; // ใช้ carModel
    // const carYear = document.getElementById("sel2").value; // ใช้ carYear
    // const carGrade = document.getElementById("sel3").value; // ใช้ carGrade
    // const mileage = document.getElementById("sel4").value; // mileage

    console.log("🚗 carModel:", carModel);
    console.log("📅 carYear:", carYear);
    console.log("📏 mileage:", mileage); // เช็คค่าที่ส่งไป

    if (!carModel || !carYear || !mileage) {
        alert("กรุณาเลือกรุ่นรถยนต์, ปีรถยนต์ และ ระยะทาง");
        return;
    }

    // เรียก API ไปดึงข้อมูลจากเซิร์ฟเวอร์
    try {
        // * ของเนยสด ห้ามแตะ ================================================
        const response = await fetch(`/getMaintenanceGoods?carModel=${carModel}&carYear=${carYear}&carGrade=${carGrade}&mileage=${mileage}`);
        const data = await response.json();

        goodsDataForNoeysod = data;

        console.log("🦌🦌🦌🦌🦌🦌🦌 response:", response);
        console.log("🦌🦌🦌🦌🦌🦌🦌 data:", data);

        if (data.length === 0) {
            alert("ไม่พบรายการสินค้า");
            return;
        }
        // * ================================================================

        // สร้างโครงสร้าง popup
        const div = document.createElement("div");
        div.id = "check-result";
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        const th3 = document.createElement("th");
        th1.textContent = "รายการเคมีภัณฑ์และอะไหล่";
        th2.textContent = "จำนวน";
        th3.textContent = "ราคา";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        table.appendChild(thead);

        // สร้าง tbody และเพิ่มข้อมูลลงไป
        const tbody = document.createElement("tbody");
        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.goodsBrand} ${item.goodsName}</td>
                <td>1</td>
                <td>${item.goodsPrice} บาท</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        div.appendChild(table);

        const divbtn = document.createElement("div");
        divbtn.id = "check-btn";
        divbtn.innerHTML = '<div id="but"><button class="btn btn-next" onclick="nextpage()" type="button">นัดหมาย</button></div>';
        div.appendChild(divbtn);

        document.getElementById("content").innerHTML = "";
        document.getElementById("content").appendChild(div);

        console.log("=== END checkshowpopupguest() ===");

        // แสดง popup
        showpop();
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
}



// * ==================================================================================================== //
// * ของเนยสด ห้ามแตะ
// let carModel = document.getElementById("sel1").value;
// let carYear = document.getElementById("sel2").value;
// let carGrade = document.getElementById("sel3").value;
// let mileage = document.getElementById("sel4").value;

// ! ย้ายตัวแปรไปไว้ข้างบนแทน

function selectDate() { // * ปุ่มวันที่ ไฮไลท์สีชมพู
    date = document.getElementById("dateinput").value;
    let timeElements = document.getElementsByName("timeinput");

    console.log('date & timeElements: ', date, timeElements);

    time = [];
    for (let i = 0; i < timeElements.length; i++) {
        if (timeElements[i].checked) {
            time.push(timeElements[i].value);
        }
    }

    // * ทดสอบ slot ชั่วคราว
    if (time.includes("ช่วงเช้า")) {
        slot = 1;
    } else if (time.includes("ช่วงบ่าย")) {
        slot = 2;
    } else if (time.includes("ช่วงเย็น")) {
        slot = 3;
    } else {
        slot = null;
    }

    console.log('date: ', date);
    console.log('time: ', time);
    console.log('slot: ', slot);
    
    // console.log('🗣️🗣️🗣️🗣️🗣️goodsDataForNoeysod: ', goodsDataForNoeysod);

    console.log('🗣️🗣️🗣️🗣️🗣️', 
                'carModel:', carModel, 
                'carYear:', carYear, 
                'carGrade:', carGrade, 
                'mileage:', mileage, 
                'centerId2:', centerId2, 
                'date:', date, 
                'time', time, 
                'slot:', slot, 
                'caseCategory:', caseCategory, 
                'goodsDataForNoeysod:', goodsDataForNoeysod); // * json ที่ได้มาจาก popup หน้าแรกของ appointment.ejs


    priceChemi = goodsDataForNoeysod.reduce((acc, item) => {
        return acc + item.goodsPrice;
    }, 0);

    priceTotal = priceChemi + priceLabor; 


    console.log('priceChemi: ', priceChemi);
    console.log('priceLabor: ', priceLabor);
    console.log('priceTotal: ', priceTotal);


    
// * ไปแสดงใน appointment.ejs 
    document.getElementById("show-price-chemi").textContent = priceChemi;
    document.getElementById("show-price-labor").textContent = priceLabor;
    document.getElementById("show-price-total").textContent = priceTotal;
}

async function booking() {
    guestFirstName = document.getElementById("name").value;
    guestLastName = document.getElementById("last").value;
    guestTel = document.getElementById("tel").value;
    guestEmail = document.getElementById("email").value;
    guestCarRegisNo = document.getElementById("carregis").value;

    console.log('guestFirstName: ', guestFirstName);
    console.log('guestLastName: ', guestLastName);
    console.log('guestTel: ', guestTel);
    console.log('guestEmail: ', guestEmail);
    console.log('guestCarRegisNo: ', guestCarRegisNo);

    let goodsData = goodsDataForNoeysod.map(item => item.goodsId);
    console.log('💯💯💯💯💯💯goodsData: ', goodsData);

    try {
        const response = await fetch('/appointment', { // ! อยู่ที่ server.js เดี๋ยวต้องย้ายด้วย
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carModel: carModel,
                carYear: carYear,
                carGrade: carGrade,
                mileage: mileage,
                centerId: centerId2,
                caseStartDatetime: date,
                slot: slot,
                caseCategory: caseCategory,
                guestFirstName: guestFirstName,
                guestLastName: guestLastName,
                guestTel: guestTel,
                guestEmail: guestEmail,
                guestCarRegisNo: guestCarRegisNo,
                goodsIdList: goodsData
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }

        const data = await response.json();

        console.log('😋😋😋Success:', data);
        // alert('Success:', data);
        // alert('ระบบทำการบันทึกข้อมูลเสร็จสิ้น พนักงานจะติดต่อกลับไป ขอบคุณงับ', data);
        // // redirect('/');
        // window.location.href = "/"; 
        Swal.fire({
            title: 'นัดหมายสำเร็จ!',
html: `
<div class="loader">
<div class="truckWrapper">
<div class="truckBody">
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 198 93"
class="trucksvg"
>
<path
  stroke-width="3"
  stroke="#282828"
  fill="#3D6AF8"
  d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
></path>
<path
  stroke-width="3"
  stroke="#282828"
  fill="#7D7C7C"
  d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
></path>
<path
  stroke-width="2"
  stroke="#282828"
  fill="#282828"
  d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
></path>
<rect
  stroke-width="2"
  stroke="#282828"
  fill="#FFFCAB"
  rx="1"
  height="7"
  width="5"
  y="63"
  x="187"
></rect>
<rect
  stroke-width="2"
  stroke="#282828"
  fill="#282828"
  rx="1"
  height="11"
  width="4"
  y="81"
  x="193"
></rect>
<rect
  stroke-width="3"
  stroke="#282828"
  fill="#DFDFDF"
  rx="2.5"
  height="90"
  width="121"
  y="1.5"
  x="6.5"
></rect>
<rect
  stroke-width="2"
  stroke="#282828"
  fill="#DFDFDF"
  rx="2"
  height="4"
  width="6"
  y="84"
  x="1"
></rect>
</svg>
</div>
<div class="truckTires">
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 30 30"
class="tiresvg"
>
<circle
  stroke-width="3"
  stroke="#282828"
  fill="#282828"
  r="13.5"
  cy="15"
  cx="15"
></circle>
<circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
</svg>
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 30 30"
class="tiresvg"
>
<circle
  stroke-width="3"
  stroke="#282828"
  fill="#282828"
  r="13.5"
  cy="15"
  cx="15"
></circle>
<circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
</svg>
</div>
<div class="road"></div>

<svg
xml:space="preserve"
viewBox="0 0 453.459 453.459"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns="http://www.w3.org/2000/svg"
id="Capa_1"
version="1.1"
fill="#000000"
class="lampPost"
>
<path
d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
></path>
</svg>
</div>
</div>
<p>รอสักครู่...</p>
`,
showConfirmButton: false,
timer: 2500,
customClass: {
popup: 'custom-popup'
}
        }).then(() => {
            window.location.href = "/";
        });
        

    } catch (error) {
        console.error('Error:', error);
        alert('Error:', error.message || error);
    }
}



// let 
async function selectDateLoggedIn(email) {
    console.log('========== START function selectDateLoggedIn() ==========')

    const response = await fetch(`/getLoggedInUser?email=${email}`);
    const data = await response.json();

    dataForBookingLoggedIn = data;

    // ! ปัญหาคือ ถ้าใช้รถที่เซฟไว้

    // let loggedInFirstName = document.getElementById("name");
    // let loggedInLastName = document.getElementById("last");
    // let loggedInTel = document.getElementById("tel");
    // let loggedInEmail = document.getElementById("email");

    document.getElementById("name").value = data.firstName;
    document.getElementById("last").value = data.lastName;
    document.getElementById("tel").value = data.phoneNumber;
    document.getElementById("email").value = data.email;
    // document.getElementById("carregis").value = data.carRegisNo; //! ตอนนี้กำลังใช้รถที่เซฟไว้
    document.getElementById("carregis").value = carRegisNo;

    console.log('selectDateLoggedIn: ', data);
    console.log('selectDateLoggedIn data.customerId: ', data.customerId);
    console.log('selectDateLoggedIn carRegisNo: ', carRegisNo);
    

    console.log('selectDateLoggedIn goodsDataForNoeysod: ', goodsDataForNoeysod);
    
    // ! ก้อปมาจาก from selectDate()

    console.log('=== function selectDateLoggedIn() (copy of selectDate()) ===')
    date = document.getElementById("dateinput").value;
    let timeElements = document.getElementsByName("timeinput");

    console.log('date & timeElements: ', date, timeElements);

    time = [];
    for (let i = 0; i < timeElements.length; i++) {
        if (timeElements[i].checked) {
            time.push(timeElements[i].value);
        }
    }

    // * ทดสอบ slot ชั่วคราว
    if (time.includes("ช่วงเช้า")) {
        slot = 1;
    } else if (time.includes("ช่วงบ่าย")) {
        slot = 2;
    } else if (time.includes("ช่วงเย็น")) {
        slot = 3;
    } else {
        slot = null;
    }

    console.log('date: ', date);
    console.log('time: ', time);
    console.log('slot: ', slot);
    
    // console.log('🗣️🗣️🗣️🗣️🗣️goodsDataForNoeysod: ', goodsDataForNoeysod);

    console.log('🗣️🗣️🗣️🗣️🗣️', 
                'carModel:', carModel, 
                'carYear:', carYear, 
                'carGrade:', carGrade, 
                'mileage:', mileage, 
                'centerId2:', centerId2, 
                'date:', date, 
                'time', time, 
                'slot:', slot, 
                'caseCategory:', caseCategory, 
                'goodsDataForNoeysod:', goodsDataForNoeysod); // * json ที่ได้มาจาก popup หน้าแรกของ appointment.ejs


    priceChemi = goodsDataForNoeysod.reduce((acc, item) => {
        return acc + item.goodsPrice;
    }, 0);

    priceTotal = priceChemi + priceLabor; 


    console.log('priceChemi: ', priceChemi);
    console.log('priceLabor: ', priceLabor);
    console.log('priceTotal: ', priceTotal);


    
// * ไปแสดงใน appointment.ejs 
    document.getElementById("show-price-chemi").textContent = priceChemi;
    document.getElementById("show-price-labor").textContent = priceLabor;
    document.getElementById("show-price-total").textContent = priceTotal;

    console.log('========== END function selectDateLoggedIn() ==========')
}

async function bookingLoggedIn() {
    console.log('========== START function bookingLoggedIn() ==========')

    console.log('dataForBookingLoggedIn: ', dataForBookingLoggedIn);

    // guestFirstName = document.getElementById("first").value;
    // guestLastName = document.getElementById("last").value;
    // guestTel = document.getElementById("tel").value;
    // guestEmail = document.getElementById("email").value;
    // guestCarRegisNo = document.getElementById("carregis").value;

    // console.log('guestFirstName: ', guestFirstName);
    // console.log('guestLastName: ', guestLastName);
    // console.log('guestTel: ', guestTel);
    // console.log('guestEmail: ', guestEmail);
    // console.log('guestCarRegisNo: ', guestCarRegisNo);

    // ! ที่ต้องแก้คือ ใช้ customerId เชื่อมกับ Customers เดิม
    // ! เอา customerId เก่า ใส่ที่ ServiceHistory ไม่ต้องสร้าง Customers ใหม่
    // ! goodsId ไว้เหมือนเดิม
    let goodsData = goodsDataForNoeysod.map(item => item.goodsId);
    console.log('💯💯💯💯💯💯goodsData: ', goodsData);

    console.log('dataForBookingLoggedIn customerId: ', dataForBookingLoggedIn.customerId);
    // let customerId = dataForBookingLoggedIn.customerId;

    try {
        const response = await fetch('/appointmentLoggedIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // carModel: carModel,
                // carYear: carYear,
                // carGrade: carGrade,
                mileage: mileage,
                centerId: centerId2,
                caseStartDatetime: date,
                slot: slot,
                caseCategory: caseCategory,
                // guestFirstName: guestFirstName,
                // guestLastName: guestLastName,
                // guestTel: guestTel,
                // guestEmail: guestEmail,
                // guestCarRegisNo: guestCarRegisNo,
                goodsIdList: goodsData,
                customerId: dataForBookingLoggedIn.customerId
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }

        const data = await response.json();
        
        console.log('😋😋😋Success:', data);
        // alert('Success:', data);
        // alert('ระบบทำการบันทึกข้อมูลเสร็จสิ้น พนักงานจะติดต่อกลับไป ขอบคุณงับ', data);
        // // redirect('/');
        
        // window.location.href = "/history"; 
        Swal.fire({
            title: 'นัดหมายสำเร็จ!',
html: `
<div class="loader">
<div class="truckWrapper">
<div class="truckBody">
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 198 93"
class="trucksvg"
>
<path
  stroke-width="3"
  stroke="#282828"
  fill="#3D6AF8"
  d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
></path>
<path
  stroke-width="3"
  stroke="#282828"
  fill="#7D7C7C"
  d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
></path>
<path
  stroke-width="2"
  stroke="#282828"
  fill="#282828"
  d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
></path>
<rect
  stroke-width="2"
  stroke="#282828"
  fill="#FFFCAB"
  rx="1"
  height="7"
  width="5"
  y="63"
  x="187"
></rect>
<rect
  stroke-width="2"
  stroke="#282828"
  fill="#282828"
  rx="1"
  height="11"
  width="4"
  y="81"
  x="193"
></rect>
<rect
  stroke-width="3"
  stroke="#282828"
  fill="#DFDFDF"
  rx="2.5"
  height="90"
  width="121"
  y="1.5"
  x="6.5"
></rect>
<rect
  stroke-width="2"
  stroke="#282828"
  fill="#DFDFDF"
  rx="2"
  height="4"
  width="6"
  y="84"
  x="1"
></rect>
</svg>
</div>
<div class="truckTires">
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 30 30"
class="tiresvg"
>
<circle
  stroke-width="3"
  stroke="#282828"
  fill="#282828"
  r="13.5"
  cy="15"
  cx="15"
></circle>
<circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
</svg>
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 30 30"
class="tiresvg"
>
<circle
  stroke-width="3"
  stroke="#282828"
  fill="#282828"
  r="13.5"
  cy="15"
  cx="15"
></circle>
<circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
</svg>
</div>
<div class="road"></div>

<svg
xml:space="preserve"
viewBox="0 0 453.459 453.459"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns="http://www.w3.org/2000/svg"
id="Capa_1"
version="1.1"
fill="#000000"
class="lampPost"
>
<path
d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
></path>
</svg>
</div>
</div>
<p>รอสักครู่...</p>
`,
showConfirmButton: false,
timer: 2500,
customClass: {
popup: 'custom-popup'
}
        }).then(() => {
            window.location.href = "/history";
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Error:', error.message || error);
    }
}
