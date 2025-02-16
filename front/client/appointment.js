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