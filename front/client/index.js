function bac(){
    document.getElementById("popup-bg").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-bg").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}
function showpop(){
    document.getElementById("popup-bg").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-bg").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
}
const sel1 = document.getElementById("sel1");
const sel2 = document.getElementById("sel2");
const sel3 = document.getElementById("sel3");
const sel4 = document.getElementById("sel4");
function checkshowpop(){
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
    if (sel1.value != "" & sel2.value != "" & sel3.value != "" & sel4.value != ""){
        showpop()
    }
}
function showpromotion(){
    document.getElementById("content").innerHTML = "";
    showpop();
}
function gotoapp(){
    // ไว้ส่ง value ของ dropdown ไปหน้า appointment
    // const sel1 = document.getElementById("sel1").value;
    // const sel2 = document.getElementById("sel2").value;
    // const sel3 = document.getElementById("sel3").value;
    // const sel4 = document.getElementById("sel4").value;
    const letsend = `appointment.html?option1=${encodeURIComponent(sel1.value)}&option2=${encodeURIComponent(sel2.value)}&option3=${encodeURIComponent(sel3.value)}&option4=${encodeURIComponent(sel4.value)}`;
    window.location.href = letsend;
}