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
    document.getElementById("popup-ov").style.visibility = "visible";
}

function bac() {
    document.getElementById("hid-drop-content").style.display = "none";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-bg").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
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
                    document.getElementById("branch-area").innerHTML += `<div id="branchh"><div class="serimg"><div id="forimg" style="background-image: url('` + district.branchPhotoURL + `'); height: 20vh;"></div></div><div id="fortext"><h3>` + district.centerName + '</h3><p>' + district.address + ' ' + district.subdistrict + ' ' + district.district + ' ' + district.province + ' ' + district.postcode + '</p>' + '<p>' + 'โทรศัพท์ ' + district.telephone + '</p>' + '<p>' + 'เปิดให้บริการเวลา ' + district.openTime + ' - ' + district.closedTime + `</p><button class="bran-btn" id="bran-btn-nongjam" onclick="selectBranch('<%= element.centerId %>', '<%= element.centerName %>')" type="button">เลือก</button></div></div>`;
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
    function checkshowpop(){
        // const selectedCar = sel5.value;
        // if (selectedCar) {
        //     const carParts = selectedCar.split(" - ");
    
        //     if (carParts.length === 3) {
        //         sel1.value = carParts[0];
        //         sel2.value = carParts[1];
        //         sel3.value = carParts[2];
        //     }
        // }
        // sel4.value = "twentythousand";
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
        div.appendChild(table);
    
        const divbtn = document.createElement("div");
        divbtn.id = "check-btn";
        // divbtn.innerHTML = '<button class="btn-pop" id="btn-pop" onclick="gotoapp()">นัดหมาย</button>';
        divbtn.innerHTML = '<button class="btn btn-next" id="btn-pop">นัดหมาย</button>';
        div.appendChild(divbtn);
    
        document.getElementById("content").innerHTML = "";
        document.getElementById("content").appendChild(div);
        // if (sel1.value != "" & sel2.value != "" & sel3.value != "" & sel4.value != ""){
        //     showpop()
        // }
        
        showpop();
    }

    
async function checkshowpopguest() {
    // ดึงค่าที่เลือกจาก dropdown
    console.log("hello");
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
        const response = await fetch('/appointment', {
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
        console.log('Success:', data);
        alert('Success:', data);
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

    // let loggedInFirstName = document.getElementById("name");
    // let loggedInLastName = document.getElementById("last");
    // let loggedInTel = document.getElementById("tel");
    // let loggedInEmail = document.getElementById("email");

    document.getElementById("name").value = data.firstName;
    document.getElementById("last").value = data.lastName;
    document.getElementById("tel").value = data.phoneNumber;
    document.getElementById("email").value = data.email;
    document.getElementById("carregis").value = data.carRegisNo;

    console.log('selectionDateLoggedIn: ', data);
    console.log('selectionDateLoggedIn customerId: ', data.customerId);

    console.log('selectionDateLoggedIn goodsDataForNoeysod: ', goodsDataForNoeysod);
    
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

// document.addEventListener("DOMContentLoaded", function () {
//     const provinceSelect = document.getElementById("branchvince");
//     const districtSelect = document.getElementById("branch-district");

//     // ฟังก์ชันโหลดอำเภอตามจังหวัดที่เลือก
//     function loadDistricts() {
//         const selectedProvince = provinceSelect.value;
//         if (!selectedProvince) {
//             districtSelect.innerHTML = '<option value="" selected>เลือกอำเภอ/เขต</option>';
//             districtSelect.disabled = true;
//             return;
//         }
//         districtSelect.disabled = false;

//         fetch(`/district?province=${selectedProvince}`)
//             .then(response => response.json())
//             .then(districts => {
//                 districtSelect.innerHTML = '<option value="" selected>เลือกอำเภอ/เขต</option>';
//                 districts.forEach(district => {
//                     const option = document.createElement("option");
//                     option.value = district.district;
//                     option.textContent = district.district;
//                     districtSelect.appendChild(option);
//                 });
//             })
//             .catch(error => console.error("Error loading districts:", error));

//         // โหลดอำเภอที่เกี่ยวข้อง
//     }

//     // ตั้งค่าเริ่มต้นให้ช่องอำเภอถูกปิดใช้งาน
//     districtSelect.disabled = true;

//     // โหลดอำเภอเมื่อเลือกจังหวัด
//     provinceSelect.addEventListener("change", loadDistricts);
// });

// const findBranch = document.getElementById("btn-branch");
// findBranch.addEventListener("click", function() {
//     const provinceSelect = document.getElementById("branchvince");
//     const districtSelect = document.getElementById("branch-district");
//     const selectedProvince = provinceSelect.value;
//     const selectedDistrict = districtSelect.value;

//     if (selectedProvince && selectedDistrict){
//         fetch(`/SelectedProvinceAndDistrict?province=${selectedProvince}&district=${selectedDistrict}`)
//         .then(response => response.json())
//         .then(districts => {
//             document.getElementById("branch-area").innerHTML = '';
//             districts.forEach(district => {
//                     document.getElementById("branch-area").innerHTML += `<div id="branchh"><div class="serimg"><div id="forimg" style="background-image: url('` + district.branchPhotoURL + `'); height: 20vh;"></div></div><div id="fortext"><h3>` + district.centerName + '</h3><p>' + district.address + ' ' + district.subdistrict + ' ' + district.district + ' ' + district.province + ' ' + district.postcode + '</p>' + '<p>' + 'โทรศัพท์ ' + district.telephone + '</p>' + '<p>' + 'เปิดให้บริการเวลา ' + district.openTime + ' - ' + district.closedTime + `</p><button class="bran-btn" id="bran-btn-nongjam" onclick="selectBranch('<%= element.centerId %>', '<%= element.centerName %>')" type="button">เลือก</button></div></div>`;
//                 });
//             })
//             .catch(error => console.error("Error loading districts:", error));
//     }
//     else if (selectedProvince && !selectedDistrict){
//         fetch(`/province?province=${selectedProvince}`)
//         .then(response => response.json())
//         .then(districts => {
//             document.getElementById("branch-area").innerHTML = '';
//             districts.forEach(district => {
//                     document.getElementById("branch-area").innerHTML += `<div id="branchh"><div class="serimg"><div id="forimg" style="background-image: url('` + district.branchPhotoURL + `'); height: 20vh;"></div></div><div id="fortext"><h3>` + district.centerName + '</h3><p>' + district.address + ' ' + district.subdistrict + ' ' + district.district + ' ' + district.province + ' ' + district.postcode + '</p>' + '<p>' + 'โทรศัพท์ ' + district.telephone + '</p>' + '<p>' + 'เปิดให้บริการเวลา ' + district.openTime + ' - ' + district.closedTime + `</p><button class="bran-btn" id="bran-btn-nongjam" onclick="selectBranch('<%= element.centerId %>', '<%= element.centerName %>')" type="button">เลือก</button></div></div>`;
//                 });
//             })
//             .catch(error => console.error("Error loading districts:", error));
//     }
// });
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
        console.log('Success:', data);
        alert('Success:', data);
    } catch (error) {
        console.error('Error:', error);
        alert('Error:', error.message || error);
    }
}
