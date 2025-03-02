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


function shownav(){
    document.getElementById("hid-drop-content").style.display = "block";
    document.getElementById("popup-ov").style.visibility = "visible";
}

function bac() {
    document.getElementById("hid-drop-content").style.display = "none";
    document.getElementById("popup-ov").style.visibility = "hidden";
}

function selectBranch(branchName) {
    showbranch.innerHTML = branchName;
    const branches = document.querySelectorAll('#branchh');

    branches.forEach(branch => {
        if (branch.innerText.includes(branchName)) {
            branch.classList.add('selected');
        } else {
            branch.classList.remove('selected');
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const btnGuest = document.querySelector(".checklogin:nth-child(2)");
    const btnLogin = document.querySelector(".checklogin:nth-child(1)");
    const forinput = document.getElementById("forinput");
    const forlogin = document.querySelector(".forlogin");

    // ตรวจสอบสถานะจาก Session Storage
    if (sessionStorage.getItem("continueAsGuest")) {
        forinput.classList.remove("forinput-hidden");
        forlogin.style.display = "none";
    }

    // กดปุ่มดำเนินการโดยไม่เข้าสู่ระบบ
    btnGuest.addEventListener("click", function () {
        forinput.classList.remove("forinput-hidden");
        forlogin.style.display = "none";
        sessionStorage.setItem("continueAsGuest", "true");
    });

    // กดปุ่มเข้าสู่ระบบ
    btnLogin.addEventListener("click", function () {
        saveFormData();  // บันทึกข้อมูลไว้ก่อน
        sessionStorage.removeItem("continueAsGuest");
        window.location.href = "/login";
    });

    // ถ้ากลับมาจากการล็อกอิน ให้กู้คืนข้อมูลที่เลือกไว้
    restoreFormData();
});

// ฟังก์ชันบันทึกค่าที่เลือกไว้ก่อน Redirect ไป Login
function saveFormData() {
    const formData = {
        sel1: document.getElementById("sel1").value,
        sel2: document.getElementById("sel2").value,
        sel3: document.getElementById("sel3").value,
        sel4: document.getElementById("sel4").value,
        branchvince: document.getElementById("branchvince").value,
        branchDistrict: document.getElementById("branch-district").value,
        reserveDay: document.getElementById("dateinput").value,
        reserveTime: document.querySelector('input[name="timeinput"]:checked')?.value || "",
    };
    sessionStorage.setItem("formData", JSON.stringify(formData));
}

// ฟังก์ชันกู้คืนค่าที่เลือกไว้หลังจากกลับมาหน้าเดิม
function restoreFormData() {
    const formData = JSON.parse(sessionStorage.getItem("formData"));
    if (formData) {
        document.getElementById("sel1").value = formData.sel1;
        document.getElementById("sel2").value = formData.sel2;
        document.getElementById("sel3").value = formData.sel3;
        document.getElementById("sel4").value = formData.sel4;
        document.getElementById("branchvince").value = formData.branchvince;
        document.getElementById("branch-district").value = formData.branchDistrict;
        document.getElementById("dateinput").value = formData.reserveDay;
        if (formData.reserveTime) {
            document.querySelector(`input[name="timeinput"][value="${formData.reserveTime}"]`).checked = true;
        }
    }
}