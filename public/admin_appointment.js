//swap tabs
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






//POPUPS & BUTTONS FUNCTIOON

//กดไอคอนคลิปบอร์ด แล้วแสดง Popup ใบเสนอราคา
document.querySelectorAll('.quotation-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-quotation").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-quotation").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
function bac1(){
    document.getElementById("popup-quotation").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-quotation").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}



















//กดปุ่มไอคอนดู แล้วแสดง Popup view
let originalInfo = {}; //เก็บค่า
let isEditing = false; //เก็บบสถานะการกำลังทำการแก้ไข

// document.querySelectorAll('.view-button').forEach(a => {
//     a.addEventListener('click', function() {
//     document.getElementById("popup-view").style.visibility = "visible";
//     document.getElementById("popup-ov").style.visibility = "visible";
//     document.getElementById("popup-view").style.opacity = 1;
//     document.getElementById("popup-ov").style.opacity = 1;

//     let inputs = document.querySelectorAll(".popup-input");
//     inputs.forEach(input => {
//         originalInfo[input.id] = input.value; //เก็บค่าแรกเริ่มไว้
//     });
// });
// });
function closeViewPopup() {
    document.getElementById('popup-view').style.visibility = 'hidden';
    document.getElementById('popup-ov').style.visibility = 'hidden';
    document.getElementById('popup-view').style.opacity = 0;
    document.getElementById('popup-ov').style.opacity = 0;
}

function openPopup(button) {
    document.getElementById("popup-view").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-view").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;

    const row = button.closest('.info-row');
    // const serviceHistoryId = row.querySelector('#info-date-time').textContent + 0;
    // const phoneNumber = row.querySelector('#info-phone').textContent;
    // const firstName = row.querySelector('#info-firstname').textContent;
    // const lastName = row.querySelector('#info-lastname').textContent;
    // const caseCategory = row.querySelector('#info-service').textContent;
    // const centerName = row.querySelector('#info-branch').textContent;
    const service = row.querySelector('#info-service-history').textContent;
    // const customer = row.querySelector('#info-customer-id').textContent;

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

                document.getElementById('edit-service').value = data.caseCategory;
                document.getElementById('edit-date-time').value = data.caseStartDatetime;
                document.getElementById('car').value = data.carModel;
                document.getElementById('lenght').value = data.mileage;
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

    

    document.getElementById('edit-service').value = caseCategory;
    document.getElementById('edit-date-time').value = serviceHistoryId;
    document.getElementById('edit-branch').value = centerName;
    document.getElementById('edit-first-name').value = firstName;
    document.getElementById('edit-last-name').value = lastName;
    document.getElementById('edit-phone').value = phoneNumber;


    
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
            input.value = originalInfo[input.id]; // ดึงค่าที่เก็บไว้
            input.setAttribute("disabled", true);
        });
    
        isEditing = false;
    }
}

//ปุ่มแก้ไขข้อมูล
function edit_info(){
    document.getElementById("edit-service").removeAttribute("disabled");
    document.getElementById("edit-date-time").removeAttribute("disabled");

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".cancel-edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "inline-block");

    isEditing = true;
}

//ปุ่มบันทึกข้อมูล
function save_info(){
    document.getElementById("edit-service").setAttribute("disabled", true);
    document.getElementById("edit-date-time").setAttribute("disabled", true);


    const servicehis = document.getElementById('serviceHistoryId').value;
    const service = document.getElementById('edit-service').value;
    const dated = document.getElementById('edit-date-time').value;
    
    fetch('/update-service-history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ service, dated, servicehis})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Service history updated successfully');
            location.reload();
        } else {
            alert('Failed to update service history');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the service history.');
    });


    

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".cancel-edit-button").forEach(btn => btn.style.display = "none");

    

    isEditing = false;
    alert("บันทึกข้อมูลสำเร็จ")
}

setAttribute("disabled", true);

function cancel_edit(){

    document.getElementById("edit-service").setAttribute("disabled", true);
    document.getElementById("edit-date-time").setAttribute("disabled", true);

    // fetch(`/service-history?id=${service}`)
    // .then(response => response.json())
    // .then(data => {
    //     if (data) {
    //         console.log(data);

    //         document.getElementById('edit-service').value = data.caseCategory;
    //         document.getElementById('edit-date-time').value = data.caseStartDatetime;
    //         document.getElementById('car').value = data.carModel;
    //         document.getElementById('lenght').value = data.mileage;
    //         document.getElementById('edit-car-license').value = data.carRegisNo;
    //         document.getElementById('edit-first-name').value = data.firstName;
    //         document.getElementById('edit-last-name').value = data.lastName;
    //         document.getElementById('edit-phone').value = data.phoneNumber;
    //         document.getElementById('edit-email').value = data.email;
    //     } else {
    //         alert('No data found for this service history.');
    //     }
    // })
    // .catch(error => {
    //     console.error('Error fetching service history:', error);
    //     alert('An error occurred while fetching the service history.');
    // });

    document.querySelectorAll(".edit-button").forEach(btn => btn.style.display = "inline-block");
    document.querySelectorAll(".save-button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".cancel-edit-button").forEach(btn => btn.style.display = "none");

    isEditing = false;
}

function deleteServiceHistory(serviceHistoryId) {
    if (confirm('Are you sure you want to delete this service history?')) {
        fetch(`/service-history/${serviceHistoryId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Service history deleted successfully');
                location.reload();
            } else {
                alert('Failed to delete service history');
            }
        })
        .catch(error => {
            console.error('Error deleting service history:', error);
            alert('An error occurred while deleting the service history.');
        });
    }
}




function updateTabContent(tabId, url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tabContent = document.getElementById(tabId);
            tabContent.innerHTML = ''; // Clear existing content

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











//กดปุ่มลบ แล้วแสดง Popup delete
document.querySelectorAll('.delete-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-delete").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-delete").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
//ปุ่มยกเลิกการลบข้อมูล
function cancel_del(){
    bac3()
}

//ปุ่มยืนยันการลบข้อมูล
function confirm_del(){
    alert("ทำการยกเลิกการนัดหมายสำเร็จ")
    bac3()
}
//กดปิด Popup delete
function bac3(){
    document.getElementById("popup-delete").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-delete").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}

