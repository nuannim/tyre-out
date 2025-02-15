const today = new Date().toISOString().split('T')[0];
const dateinput = document.getElementById("dateinput");
dateinput.value = today;
dateinput.min = today;

const prevbtn = document.querySelectorAll(".btn-prev");
const nextbtn = document.querySelectorAll(".btn-next");
const formstep = document.querySelectorAll(".form-step");

let formstepnum = 0;

nextbtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        formstepnum++;
        updateform();
    });
});
prevbtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        formstepnum--;
        updateform();
    });
});
function updateform(){
    formstep.forEach((f) => {
        f.classList.contains("form-step-active") &&
          f.classList.remove("form-step-active");
    });
    formstep[formstepnum].classList.add("form-step-active");
}