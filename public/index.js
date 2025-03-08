function bac() {
    document.getElementById("popup-bg").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-bg").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}


function bac2() {
    document.getElementById("hid-drop-content").style.display = "none";
    document.getElementById("popup-ov2").style.visibility = "hidden";
}



function showpop() {
    document.getElementById("popup-bg").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-bg").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
}

function showpromotion(promotion) {
    console.log("popuppppppppppp");
    console.log(promotion.promotionId);

    const content = `<h3>${promotion.promotionName}</h3>
                    <p>${promotion.promotionDescription}</p>
                    <img class="pic" src="${promotion.promotionPhotoURL}" alt="${promotion.promotionName}">
                    `;

                    document.getElementById("content").innerHTML = content;
    showpop();
}

let sel1 = document.getElementById("sel1");
let sel2 = document.getElementById("sel2");
let sel3 = document.getElementById("sel3");
let sel4 = document.getElementById("sel4");
let sel5 = document.getElementById("carchoose");

let car_regis = document.getElementById("car-regis");

function checkshowpop() {
    const selectedCar = sel5.value;
    if (selectedCar) {
        const carParts = selectedCar.split(" - ");

        if (carParts.length === 3) {
            sel1.value = carParts[0];
            sel2.value = carParts[1];
            sel3.value = carParts[2];
        }
    }
    sel4.value = "twentythousand";
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
    divbtn.innerHTML = '<button class="btn-pop" id="btn-pop" onclick="gotoapp()">นัดหมาย</button>';
    div.appendChild(divbtn);

    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(div);
    showpop();
}


    const carModel = document.getElementById("sel1").value;
    const carYear = document.getElementById("sel2").value;
    const carGrade = document.getElementById("sel3").value;
    const mileage = document.getElementById("sel4").value;

    console.log("🚗 carModel:", carModel);
    console.log("📅 carYear:", carYear);
    console.log("📏 mileage:", mileage);

    if (!carModel || !carYear || !mileage) {
        alert("กรุณาเลือกรุ่นรถยนต์, ปีรถยนต์ และ ระยะทาง");
        return;
    }

    try {
        const response = await fetch(`/getMaintenanceGoods?carModel=${carModel}&carYear=${carYear}&carGrade=${carGrade}&mileage=${mileage}`);
        const data = await response.json();

        console.log("🦌🦌🦌🦌🦌🦌🦌 response:", response);
        console.log("🦌🦌🦌🦌🦌🦌🦌 data:", data);

        if (data.length === 0) {
            alert("ไม่พบรายการสินค้า");
            return;
        }

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
        divbtn.innerHTML = '<button class="btn-pop" id="btn-pop" onclick="gotoapp()">นัดหมาย</button>';
        div.appendChild(divbtn);

        document.getElementById("content").innerHTML = "";
        document.getElementById("content").appendChild(div);

        showpop();
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
}


function gotoapp2() {
    console.log('===== START function gotoapp2() =====');
    
    const selectedCar = sel5.value;
    let carRegisNo;

    if (selectedCar) {
        const carParts = selectedCar.split(" - ");
        
        if (carParts.length === 4) {
            sel1.value = carParts[0];
            sel2.value = carParts[1];
            sel3.value = carParts[2];

            carRegisNo = carParts[3];
        }
    }


    const letsend = `/appointment?option1=${(sel1.value)}&option2=${(sel2.value)}&option3=${(sel3.value)}&carRegisNo=${carRegisNo}`;
    window.location.href = letsend;

    console.log('===== END function gotoapp2() =====');
}

function gotoapp() {
    const letsend = `/appointment?option1=${(sel1.value)}&option2=${(sel2.value)}&option3=${(sel3.value)}&option4=${(sel4.value)}`;
    window.location.href = letsend;
}

function shownav() {
    document.getElementById("hid-drop-content").style.display = "block";
    document.getElementById("popup-ov2").style.visibility = "visible";
}

document.addEventListener("DOMContentLoaded", function () {
    const provinceSelect = document.getElementById("branchvince");
    const districtSelect = document.getElementById("branch-district");

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

    }


    districtSelect.disabled = true;


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
            document.getElementById("area").innerHTML = '';
            districts.forEach(district => {
                    document.getElementById("area").innerHTML = '<div id="branch-area" data-aos="fade-up" data-aos-offset="150">' + `<div id="forimg" style="background-image: url('` + district.branchPhotoURL + `');">` + '</div>' + '<div id="fortext">' + '<h3>' + district.centerName + '</h3>' + '<p>' + district.address + ' ' + district.subdistrict + ' ' + district.district + ' ' + district.province + ' ' + district.postcode + '</p>' + '<p>' + 'โทรศัพท์ ' + district.telephone + '</p>' + '<p>' + 'เปิดให้บริการเวลา ' + district.openTime + ' - ' + district.closedTime + '</p>' + '</div>' + '</div>';
                });
            })
            .catch(error => console.error("Error loading districts:", error));
    }
    else if (selectedProvince && !selectedDistrict){
        fetch(`/province?province=${selectedProvince}`)
        .then(response => response.json())
        .then(districts => {
            document.getElementById("area").innerHTML = '';
            districts.forEach(district => {
                    document.getElementById("area").innerHTML += '<div id="branch-area" data-aos="fade-up" data-aos-offset="150">' + `<div id="forimg" style="background-image: url('` + district.branchPhotoURL + `');">` + '</div>' + '<div id="fortext">' + '<h3>' + district.centerName + '</h3>' + '<p>' + district.address + ' ' + district.subdistrict + ' ' + district.district + ' ' + district.province + ' ' + district.postcode + '</p>' + '<p>' + 'โทรศัพท์ ' + district.telephone + '</p>' + '<p>' + 'เปิดให้บริการเวลา ' + district.openTime + ' - ' + district.closedTime + '</p>' + '</div>' + '</div>';
                });
            })
            .catch(error => console.error("Error loading districts:", error));
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sel1 = document.getElementById("sel1");
    const sel3 = document.getElementById("sel3");

    function loadGrade() {
        const selectedsel1 = sel1.value;
        if (!selectedsel1) {
            sel3.innerHTML = '<option value="" selected>เลือกเกรด</option>';
            sel3.disabled = true;
            return;
        }
        sel3.disabled = false;

        fetch(`/getModel?c=${selectedsel1}`)
            .then(response => response.json())
            .then(grade => {
                sel3.innerHTML = '<option value="" selected>เลือกเกรด</option>';
                grade.forEach(g => {
                    const option2 = document.createElement("option");
                    option2.value = g.carGrade;
                    option2.textContent = g.carGrade;
                    sel3.appendChild(option2);
                });
            })
            .catch(error => console.error("Error loading cars:", error));
    }

    sel3.disabled = true;

    sel1.addEventListener("change", loadGrade);
});
