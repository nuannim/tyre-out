
//กดไอคอนคลิปบอร์ด แล้วแสดง Popup ใบเสนอราคา
document.querySelectorAll('.quotation-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-quotation").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-quotation").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
function bac4(){
    document.getElementById("popup-quotation").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-quotation").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}

//กดปุ่มไอคอนดู แล้วแสดง Popup view
document.querySelectorAll('.view-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-view").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-view").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
function bac(){
    document.getElementById("popup-view").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-view").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}






//กดปุ่มลบ แล้วแสดง Popup delete
document.querySelectorAll('.assign-button').forEach(a => {
    a.addEventListener('click', function() {
    document.getElementById("popup-assign").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-assign").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
});
});
function cancel(){
    bac3()
}
function confirm(){
    alert("รับการดูแลลูกค้าสำเร็จ")
    bac3()
}
function bac3(){
    document.getElementById("popup-assign").style.visibility = "hidden";
    document.getElementById("popup-ov").style.visibility = "hidden";
    document.getElementById("popup-assign").style.opacity = 0;
    document.getElementById("popup-ov").style.opacity = 0;
}

function openPopup3(button){
    const row = button.closest('.info-row');

    const service = row.querySelector('#info-service-history').textContent;

    document.getElementById("show-price-chemi").innerHTML = ""

    fetch(`/service-history-Goods?id=${service}`)
    .then(response => response.json())
    .then(data => {
        if (data) {
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

                document.getElementById('show-branch').textContent = data.centerName;
                document.getElementById('show-date').textContent = data.caseStartDatetime;
                document.getElementById('show-model').textContent = data.carModel;
                document.getElementById('show-kilo').textContent = data.caseSummary;
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

function acceptcase(serviceHistoryId) {
    document.getElementById("popup-assign").style.visibility = "visible";
    document.getElementById("popup-ov").style.visibility = "visible";
    document.getElementById("popup-assign").style.opacity = 1;
    document.getElementById("popup-ov").style.opacity = 1;
    console.log(serviceHistoryId);
    document.querySelector('.confirm-button').addEventListener('click', function() {
        fetch('/acceptCase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serviceHistoryId })
        })
        .then(response => {
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                return response.json();
            } else {
                throw new Error('Unexpected response format');
            }
        })
        .then(data => {
            if (data.success) {
                alert("รับการดูแลลูกค้าสำเร็จ");
                location.reload();
            } else {
                alert('Failed to update service history');
            }
        })
    });
}