# Tyre-Out
**Tyre-Out**  
<br>
06066302 Fundamental Web Programming  
School of Information Technology, KMITL  
Year 2/2024

# how to use
เปิด terminal แล้ว copy อันนี้ไปวาง
```bash
npm init -y
npm install express ejs sqlite3 express-session
```
### รัน js แบบไม่ต้องกดปิดเปิดใหม่ ให้ลง `nodemon`

ถ้าอยากรู้ว่าเคยลงในเครื่องยัง ใช้วิธีเช็ค version

```bash
nodemon -v
```

พิมพ์คำสั่งใน terminal เพื่อ install nodemon

```bash
npm install -g nodemon
```
<br>
<br>
<br>
<br>
<br>

อันนี้ฝากส่วนตัว
```sql
SELECT * FROM ServiceHistory sh
                INNER JOIN ServiceBranch sb
                ON sh.centerId = sb.centerId
                INNER JOIN Customers c
                ON sh.customerId = c.customerId
                INNER JOIN RegistrationNumber rn
                ON c.customerId = rn.customerId
                INNER JOIN Cars car
                ON rn.carId = car.carId
                WHERE c.email = ?;
```
<br>
อันใหม่

```sql
SELECT * 
FROM ServiceHistory sh
INNER JOIN ServiceBranch sb 
    ON sh.centerId = sb.centerId
INNER JOIN RegistrationNumber rn  -- เชื่อม ServiceHistory กับ RegistrationNumber ผ่าน regId
    ON sh.regId = rn.regId        
INNER JOIN Customers c            
    ON rn.customerId = c.customerId  -- ใช้ customerId จาก RegistrationNumber เชื่อมต่อ
INNER JOIN Cars car 
    ON rn.carId = car.carId
WHERE c.email = 'max@gmail.com';
```


```sql
SELECT * 
FROM ServiceHistory sh
INNER JOIN ServiceBranch sb 
    ON sh.centerId = sb.centerId
INNER JOIN RegistrationNumber rn  -- เชื่อม ServiceHistory กับ RegistrationNumber ผ่าน regId
    ON sh.regId = rn.regId        
INNER JOIN Customers c            
    ON rn.customerId = c.customerId  -- ใช้ customerId จาก RegistrationNumber เชื่อมต่อ
INNER JOIN Cars car 
    ON rn.carId = car.carId
WHERE sh.centerId = 2 and sh.handledByEmployeeId is NULL;
```


```javascript
    createAppointment: async () => {
        return new Promise((resolve, reject) => {
            const query = ``;
            const values = [];
    
            db.all(query, values, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
```
