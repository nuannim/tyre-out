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