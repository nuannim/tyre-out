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




```sql
-- ดึงประวัติบริการพร้อมสินค้า
SELECT *
FROM ServiceHistory SH
JOIN Customers C ON SH.customerId = C.customerId
JOIN ServiceBranch SB ON SH.centerId = SB.centerId
JOIN RegistrationNumber RN ON SH.regId = RN.regId
JOIN ServiceHistoryDetails SHD ON SH.serviceHistoryId = SHD.serviceHistoryId
JOIN Goods G ON SHD.goodsId = G.goodsId
```

export sqlite to sql

```bash
sqlite3 your_database.db .dump > export.sql
```

