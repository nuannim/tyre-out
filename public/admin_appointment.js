
const tab_btn = document.querySelectorAll('.tab-btn');
const tab_ctn = document.querySelectorAll('.tab-content');
const showPan = (indx) =>{
    tab_btn.forEach(element => {
        element.style.backgroundColor = "";
        element.style.color = "";
    });
    tab_btn[indx].style.color="white";
    tab_btn[indx].style.backgroundColor ="#104B82";

    tab_ctn.forEach(element => {
        element.style.display="none";
    });
    tab_ctn[indx].style.display="block";
}
showPan(0);


function shownav(){
    document.getElementById("hid-drop-content").style.display = "block";
    document.getElementById("popup-ov2").style.visibility = "visible";
}

function bac1(){
    document.getElementById("popup-quotation").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-quotation").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;

    document.getElementById("show-price-chemi").innerHTML = "";
    document.getElementById("show-price-labor").textContent = "";
    document.getElementById("show-price-total").textContent = "";
}






let originalInfo = {};
let isEditing = false;


function closeViewPopup() {
    document.getElementById('popup-view').style.visibility = 'hidden';
    document.getElementById('popup-ov').style.visibility = 'hidden';
    document.getElementById('popup-view').style.opacity = 0;
    document.getElementById('popup-ov').style.opacity = 0;

    

}

function openPopup3(button){
    const row = button.closest('.info-row');
    const service = row.querySelector('#info-service-history').textContent;

    console.log(service);

    document.getElementById("show-price-chemi").innerHTML = ""

    fetch(`/service-history-Goods?id=${service}`)
    .then(response => response.json())
    .then(data => {
        if (data) {
            data.forEach(element => {
                console.log(element);
            })
                document.getElementById("popup-quotation").style.visibility = "visible";
                document.getElementById("popup-ov").style.visibility = "visible";
                document.getElementById("popup-quotation").style.opacity = 1;
                document.getElementById("popup-ov").style.opacity = 1;
            let sum = 500;
            data.forEach(element => {
                sum += element.goodsPrice;
                let d = document.createElement('div');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');

                p1.textContent = element.goodsName;
                p2.textContent = element.goodsPrice + " บาท";

                d.appendChild(p1);
                d.appendChild(p2);
                
                d.style.display = "flex"
                d.style.justifyContent = "space-between"

                
                document.getElementById("show-price-chemi").appendChild(d);
            });
            document.getElementById("show-price-labor").textContent = "500 บาท";
            document.getElementById("show-price-total").textContent = sum + " บาท";

        } else {
            alert('No data found for this service history.');
        }
    })
    .catch(error => {
        console.error('Error fetching service history:', error);
        alert('An error occurred while fetching the service history.');
    });

    fetch(`/service-history?id=${service}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);
                document.getElementById("popup-quotation").style.visibility = "visible";
                document.getElementById("popup-ov").style.visibility = "visible";
                document.getElementById("popup-quotation").style.opacity = 1;
                document.getElementById("popup-ov").style.opacity = 1;

                if (data.slot === 1){
                    document.getElementById('show-time').textContent = "ช่วงเช้า"
                }
                else if (data.slot === 2){
                    document.getElementById('show-time').textContent = "ช่วงบ่าย"
                }
                else if (data.slot === 3){
                    document.getElementById('show-time').textContent = "ช่วงเย็น"
                }

                document.getElementById('show-branch').textContent = data.centerName;
                document.getElementById('show-date').textContent = data.caseStartDatetime;
                document.getElementById('show-model').textContent = data.carModel;
                document.getElementById('show-kilo').textContent = data.mileage;
                document.getElementById('carregis').value = data.carRegisNo;
                document.getElementById('name').value = data.firstName;
                document.getElementById('last').value = data.lastName;
                document.getElementById('tel').value = data.phoneNumber;
                document.getElementById('email').value = data.email;
            } else {
                alert('No data found for this service history.');
            }
        })
        .catch(error => {
            console.error('Error fetching service history:', error);
            alert('An error occurred while fetching the service history.');
        });

    
}


function openPopup2(button){
    document.getElementById("popup-view").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-view").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;

    document.querySelector(".edit-button").style.display = "none";
    document.querySelector(".cancel-edit-button").style.display = "none";
    document.querySelector(".save-button").style.display = "none";

    const row = button.closest('.info-row');
    const service = row.querySelector('#info-service-history').textContent;
    console.log(service);

    fetch(`/service-history?id=${service}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);
                const d = document.createElement('input');
                d.value = data.serviceHistoryId;
                d.id = 'serviceHistoryId';
                d.type = 'hidden';
                document.getElementById("popup-view").appendChild(d);
                document.getElementById("popup-view").style.visibility = "visible";
                document.getElementById("popup-ov").style.visibility = "visible";
                document.getElementById("popup-view").style.opacity = 1;
                document.getElementById("popup-ov").style.opacity = 1;

                
                document.getElementById('edit-time').value = data.slot
                document.querySelector("#image").style.backgroundImage = `url(${data.branchPhotoURL})`;
                document.querySelector('#branch-text .show').textContent = "สาขา " + data.centerName;
                document.querySelector('#branch-text .address').textContent = "ที่อยู่ " + data.address;
                document.querySelector('#branch-text .telephone').textContent = "เบอร์โทร " + data.telephone;
                document.querySelector('#branch-text .openclose .open').textContent = "เวลาเปิด - ปิด " + data.openTime;
                document.querySelector('#branch-text .openclose .close').textContent = data.closedTime;
                document.getElementById('edit-service').value = data.caseCategory;
                document.getElementById('edit-date-time').value = data.caseStartDatetime;
                document.getElementById('car').value = data.carModel;
                document.getElementById('lenght').value = data.caseSummary;
                document.getElementById('edit-car-license').value = data.carRegisNo;
                document.getElementById('edit-first-name').value = data.firstName;
                document.getElementById('edit-last-name').value = data.lastName;
                document.getElementById('edit-phone').value = data.phoneNumber;
                document.getElementById('edit-email').value = data.email;
            } else {
                alert('No data found for this service history.');
            }
        })
        .catch(error => {
            console.error('Error fetching service history:', error);
            alert('An error occurred while fetching the service history.');
        });

    


}



function openPopup(button) {
    document.getElementById("popup-view").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-view").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;

    document.querySelector(".edit-button").style.display = "ิblock";

    const row = button.closest('.info-row');
    const service = row.querySelector('#info-service-history').textContent;

    fetch(`/service-history?id=${service}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);
                const d = document.createElement('input');
                d.value = data.serviceHistoryId;
                d.id = 'serviceHistoryId';
                d.type = 'hidden';
                document.getElementById("popup-view").appendChild(d);
                document.getElementById("popup-view").style.visibility = "visible";
                document.getElementById("popup-ov").style.visibility = "visible";
                document.getElementById("popup-view").style.opacity = 1;
                document.getElementById("popup-ov").style.opacity = 1;

                document.querySelector("#image").style.backgroundImage = `url(${data.branchPhotoURL})`;
                document.querySelector('#branch-text .show').textContent = "สาขา " + data.centerName;
                document.querySelector('#branch-text .address').textContent = "ที่อยู่ " + data.address;
                document.querySelector('#branch-text .telephone').textContent = "เบอร์โทร" + data.telephone;
                document.querySelector('#branch-text .openclose .open').textContent = "เวลาเปิด - ปิด " + data.openTime;
                document.querySelector('#branch-text .openclose .close').textContent = data.closedTime;
                document.getElementById('edit-service').value = data.caseCategory;
                document.getElementById('edit-date-time').value = data.caseStartDatetime;
                document.getElementById('car').value = data.carModel;
                document.getElementById('lenght').value = data.caseSummary;
                document.getElementById('edit-car-license').value = data.carRegisNo;
                document.getElementById('edit-first-name').value = data.firstName;
                document.getElementById('edit-last-name').value = data.lastName;
                document.getElementById('edit-phone').value = data.phoneNumber;
                document.getElementById('edit-email').value = data.email;
            } else {
                alert('No data found for this service history.');
            }
        })
        .catch(error => {
            console.error('Error fetching service history:', error);
            alert('An error occurred while fetching the service history.');
        });




}



function bac2(){
    if (isEditing) {
        alert("กรุณาบันทึกหรือยกเลิกการแก้ไขข้อมูล");
    } else {
        document.getElementById("popup-view").style.visibility = "hidden";
        document.getElementById("popup-ov").style.visibility = "hidden";
        document.getElementById("popup-view").style.opacity = 0;
        document.getElementById("popup-ov").style.opacity = 0;
    
        let inputs = document.querySelectorAll(".popup-input");
        inputs.forEach(input => {
            input.value = originalInfo[input.id];
            input.setAttribute("disabled", true);
        });
    
        isEditing = false;
    }
}


function edit_info(){
    document.getElementById("edit-service").removeAttribute("disabled");
    document.getElementById("edit-date-time").removeAttribute("disabled");
    document.getElementById("edit-time").removeAttribute("disabled");

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".cancel-edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "inline-block");

    isEditing = true;
}


function save_info(){
    document.getElementById("edit-service").setAttribute("disabled", true);
    document.getElementById("edit-date-time").setAttribute("disabled", true);


    const servicehis = document.getElementById('serviceHistoryId').value;
    const service = document.getElementById('edit-service').value;
    const dated = document.getElementById('edit-date-time').value;
    const time = document.getElementById('edit-time').value;
    
    fetch('/update-service-history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ service, dated, servicehis, time})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('บันทึกข้อมูลสำเร็จ');
            location.reload();
        } else {
            alert('บันทึกข้อมูลไม่สำเร็จ');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดขณะเปลี่ยนแปลงข้อมูล');
    });


    

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".cancel-edit-button").forEach(btn => btn.style.display = "none");

    

    isEditing = false;
}


function cancel_edit(){

    document.getElementById("edit-service").setAttribute("disabled", true);
    document.getElementById("edit-date-time").setAttribute("disabled", true);

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".cancel-edit-button").forEach(btn => btn.style.display = "none");

    isEditing = false;
}

function deleteServiceHistory(serviceHistoryId) {

    document.getElementById("popup-delete").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-delete").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;


    document.querySelector(".confirm-del-button").addEventListener('click', function() {
        fetch(`/service-history/${serviceHistoryId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            } else {
                alert('Failed to delete service history');
            }
        })
        .catch(error => {
            console.error('Error deleting service history:', error);
            alert('An error occurred while deleting the service history.');
        });
    });
}




function updateTabContent(tabId, url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tabContent = document.getElementById(tabId);
            tabContent.innerHTML = '';

            data.forEach(element => {
                const row = document.createElement('tr');
                row.className = 'info-row';
                row.innerHTML = `
                    <td data-label="วัน-เวลา">${element.serviceHistoryId}</td>
                    <td data-label="เบอร์โทร">${element.phoneNumber}</td>
                    <td data-label="ชื่อ">${element.firstName}</td>
                    <td data-label="นามสกุล">${element.lastName}</td>
                    <td data-label="บริการ">${element.caseCategory}</td>
                    <td data-label="ศูนย์บริการ">${element.centerName}</td>
                    <td>
                        <div class="button-con">
                            <button class="quotation-button"><i class='far'>&#xf328;</i></button>
                            <button class="view-button" onclick="openPopup('${element.serviceHistoryId}', '${element.phoneNumber}', '${element.caseCategory}')"><i class="far fa-calendar-alt"></i></button>
                            <button class="delete-button"><i class="fa fa-trash-o"></i></button>
                        </div>
                    </td>
                `;
                tabContent.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching tab content:', error);
        });
}



function cancel_del(){
    bac3()
}


function confirm_del(){
    alert("ทำการยกเลิกการนัดหมายสำเร็จ")
    bac3()
}

function bac3(){
    document.getElementById("popup-delete").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-delete").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;

}

