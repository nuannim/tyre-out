PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE Cars (
  carId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  carModel TEXT NOT NULL,
  carYear INTEGER NOT NULL,
  carGrade TEXT DEFAULT NULL
);
INSERT INTO Cars VALUES(1,'Ranger',2020,'Wildtrak');
INSERT INTO Cars VALUES(2,'Ranger',2024,'Wildtrak');
INSERT INTO Cars VALUES(3,'Everest',2024,'Wildtrak');
INSERT INTO Cars VALUES(4,'Everest',2024,'Sport');
INSERT INTO Cars VALUES(5,'Everest',2020,'Wildtrak');
INSERT INTO Cars VALUES(6,'Everest',2020,'Sport');
CREATE TABLE Customers (
  customerId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  customerBirthDate DATE DEFAULT NULL,
  firstServiceDate DATE DEFAULT NULL,
  phoneNumber TEXT DEFAULT NULL,
  email TEXT DEFAULT NULL,
  lineId TEXT DEFAULT NULL
);
INSERT INTO Customers VALUES(25,'max','sareeroop',NULL,NULL,'999157','max@gmail.com',NULL);
INSERT INTO Customers VALUES(26,'cake','cake',NULL,NULL,'1','1',NULL);
INSERT INTO Customers VALUES(27,'cake','serious bacon',NULL,NULL,'2','2',NULL);
INSERT INTO Customers VALUES(28,'patt','patt',NULL,NULL,'patt','patt',NULL);
INSERT INTO Customers VALUES(29,'sea','sea',NULL,NULL,'sea','sea',NULL);
INSERT INTO Customers VALUES(30,'sea','sea',NULL,NULL,'sea','sea',NULL);
INSERT INTO Customers VALUES(31,'sea1','sea1',NULL,NULL,'sea1','sea1',NULL);
INSERT INTO Customers VALUES(32,'c','c',NULL,NULL,'c','c',NULL);
INSERT INTO Customers VALUES(33,'a','a',NULL,NULL,'a','a',NULL);
INSERT INTO Customers VALUES(34,'k','k',NULL,NULL,'k','k',NULL);
INSERT INTO Customers VALUES(35,'o','o',NULL,NULL,'o','o',NULL);
INSERT INTO Customers VALUES(36,'','',NULL,NULL,'','',NULL);
INSERT INTO Customers VALUES(37,'0','0',NULL,NULL,'0','0',NULL);
CREATE TABLE EmployeeAccount (
  employeeAccountId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  employeeId INTEGER DEFAULT NULL,
  password TEXT NOT NULL,
  FOREIGN KEY (employeeId) REFERENCES Employees(employeeId)
);
INSERT INTO EmployeeAccount VALUES(1,1,'15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225');
INSERT INTO EmployeeAccount VALUES(2,2,'15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225');
INSERT INTO EmployeeAccount VALUES(3,3,'15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225');
INSERT INTO EmployeeAccount VALUES(4,4,'15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225');
INSERT INTO EmployeeAccount VALUES(5,5,'15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225');
INSERT INTO EmployeeAccount VALUES(6,6,'15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225');
INSERT INTO EmployeeAccount VALUES(7,7,'15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225');
INSERT INTO EmployeeAccount VALUES(8,8,'15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225');
CREATE TABLE Employees (
  employeeId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  centerId INTEGER DEFAULT NULL,
  empBirthDate DATE DEFAULT NULL,
  hiredDate DATE DEFAULT NULL,
  terminationDate DATE DEFAULT NULL,
  role TEXT DEFAULT NULL,
  phoneNumber TEXT DEFAULT NULL,
  email TEXT DEFAULT NULL,
  lineId TEXT DEFAULT NULL,
  FOREIGN KEY (centerId) REFERENCES ServiceBranch(centerId)
);
INSERT INTO Employees VALUES(1,'Vitita','Srasreesom',1,'2004-12-15','2019-10-26','2025-10-27','DCRC','809999999','vitita@gmail.com','kaning.id');
INSERT INTO Employees VALUES(2,'Manichar','Aimdilokwong',1,'1999-11-07','2019-10-26','2025-10-27','SA','819999999','manichar@gmail.com','marmink.id');
INSERT INTO Employees VALUES(3,'Penpichaya','Boonsaner',2,'2003-02-27','2023-04-02','2029-04-02','DCRC','829999999','penpichaya@gmail.com','nana.id');
INSERT INTO Employees VALUES(4,'Phitchayapha','Supanya',2,'2002-11-01','2019-10-26','2025-10-27','SA','839999999','phitchayapha@gmail.com','nenie.id');
INSERT INTO Employees VALUES(5,'Sita','Teeradechsakul',3,'2003-06-25','2019-10-26','2025-10-27','DCRC','849999999','sita@gmail.com','sita.id');
INSERT INTO Employees VALUES(6,'Thidatip','Jiraphan',3,'2008-03-04','2024-10-26','2030-10-26','SA','859999999','thidatip@gmail.com','kwan.id');
INSERT INTO Employees VALUES(7,'Salinthip','Panaapichon',4,'2002-07-20','2024-10-26','2030-10-26','DCRC','869999999','salinthip@gmail.com','lingling.id');
INSERT INTO Employees VALUES(8,'Rapeephan','Chaemcharoen',4,'2004-09-16','2019-10-26','2025-10-27','SA','879999999','rapeephan@gmail.com','mei.id');
CREATE TABLE ServiceBranch (
  centerId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  centerName TEXT NOT NULL,
  telephone TEXT DEFAULT NULL,
  email TEXT DEFAULT NULL,
  lineId TEXT DEFAULT NULL,
  address TEXT DEFAULT NULL,
  subdistrict TEXT DEFAULT NULL,
  district TEXT DEFAULT NULL,
  province TEXT DEFAULT NULL,
  postcode TEXT DEFAULT NULL,
  openTime TEXT DEFAULT NULL,
  closedTime TEXT DEFAULT NULL,
  branchPhotoURL TEXT DEFAULT NULL,
  maxslot INTEGER DEFAULT NULL
);
INSERT INTO ServiceBranch VALUES(1,'พระราม 4','027136000',NULL,'ford1','4330 ถนนพระรามที่ 4','พระโขนง','คลองเตย','กรุงเทพ','10110','08:00:00','17:00:00','/img/db/branch/ford-rama4.jpg',1);
INSERT INTO ServiceBranch VALUES(2,'กัลปพฤกษ์-สาทร','024161555',NULL,'ford2','34/9 ถนนกัลปพฤกษ์','บางขุนเทียน','จอมทอง','กรุงเทพ','10150','08:00:00','18:00:00','/img/db/branch/ford-kalapapruk.jpg',1);
INSERT INTO ServiceBranch VALUES(3,'หัวหมาก ลาดพร้าว','027363888',NULL,'ford3','3563/3 ถนนรามคำแหง','หัวหมาก','บางกะปิ','กรุงเทพ','10240','08:00:00','17:00:00','/img/db/branch/ford-huamak.jpg',1);
INSERT INTO ServiceBranch VALUES(4,'ราชพฤกษ์-พระราม 5 เมืองนนทบุรี','024326599',NULL,'ford4','9, 99 ถนนนครอินทร์','บางขุนกอง','บางกรวย','นนทบุรี','11130','08:00:00','18:00:00','/img/db/branch/ford-rama5.jpg',1);
CREATE TABLE Goods (
  goodsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  goodsBrand TEXT DEFAULT NULL,
  goodsName TEXT NOT NULL,
  goodsDescription TEXT DEFAULT NULL,
  goodsPrice NUMERIC DEFAULT NULL,
  inStock INTEGER DEFAULT NULL,
  isActive INTEGER DEFAULT NULL,
  goodsPhotoURL TEXT DEFAULT NULL
);
INSERT INTO Goods VALUES(1,'michelin','LTX Trail','255/70R16',5150,96,1,'/img/db/michelin-ltx-trail.webp');
INSERT INTO Goods VALUES(2,'michelin','LTX Trail','265/65R17',5850,68,1,'/img/db/michelin-ltx-trail.webp');
INSERT INTO Goods VALUES(3,'michelin','Primacy SUV+','265/60R18',7990,52,1,'/img/db/michelin-primacy-suv+.webp');
INSERT INTO Goods VALUES(4,'michelin','Primacy SUV+','275/55R20',7990,59,1,'/img/db/michelin-primacy-suv+.webp');
INSERT INTO Goods VALUES(5,'Ford','ไส้กรองน้ำมันเชื้อเพลิง','for Ford Ranger',2000,23,1,'/img/db/oil-filter.jpg');
INSERT INTO Goods VALUES(6,'Ford','ไส้กรองอากาศ','for Ford Ranger',750,45,1,'/img/db/air-filter.jpeg');
INSERT INTO Goods VALUES(7,'Ford','น้ำมันเบรก','WSS-M6C65-A2',110,55,1,'/img/db/break-oil.png');
INSERT INTO Goods VALUES(8,'Ford','ไส้กรองแอร์ห้องโดยสาร','for Ford Ranger',450,55,1,'/img/db/air-filter-passenger-side.jpg');
INSERT INTO Goods VALUES(9,'COOLANT YELLOW PM','น้ำยาหล่อเย็น','10 ลิตร',1410,46,1,'/img/db/coolant-yellow-pm.jpg');
INSERT INTO Goods VALUES(10,'COOLANT YELLOW PM','น้ำมันเกียร์อัตโนมัติ','ULV WSS-M2C949-A',270,32,1,'/img/db/ULV WSS-M2C949-A.jpg');
INSERT INTO Goods VALUES(11,'Mercon','น้ำมันเกียร์ขับเคลื่อน 4 ล้อ','LV WSS-M2C938-A',280,12,1,'/img/db/WSS-M2C938-A.jpg');
INSERT INTO Goods VALUES(12,'Ford','น้ำมันเฟืองท้ายหน้า','WSP-M2C197-A',300,72,1,'/img/db/WSP-M2C197-A.jpg');
INSERT INTO Goods VALUES(13,'Ford','ปลั๊กถ่ายน้ำมันเฟืองท้ายหน้า','for Ford Ranger',75,7,1,'/img/db/oil-drain-gear-plug.jpg');
INSERT INTO Goods VALUES(14,'Ford','ปลั๊กเติมน้ำมันเฟืองท้ายหน้า','for Ford Ranger',41,69,1,'/img/db/add.png');
INSERT INTO Goods VALUES(15,'Ford','น้ำมันเฟืองท้ายหลัง','WSS-M2C942-A',1100,78,1,'/img/db/WSS-M2C942-A.jpg');
INSERT INTO Goods VALUES(16,'Ford','ปลั๊กถ่ายน้ำมันเฟืองท้ายหลัง','for Ford Everest',195,89,1,'/img/db/letgo.jpg');
INSERT INTO Goods VALUES(17,'Ford','ปลั๊กเติมน้ำมันเฟืองท้ายหลัง','for Ford Everest',195,34,1,'/img/db/back.jpg');
INSERT INTO Goods VALUES(18,'Ford','ตะกั่วถ่วงล้อ','for Ford Everest',15,55,1,'/img/db/takua.jpg');
INSERT INTO Goods VALUES(19,'Ford','ชุดสายพานราวลิ้น','for Ford Everest',9258,25,1,'/img/db/roundrin.jpg');
INSERT INTO Goods VALUES(20,'Ford','น้ำมันเครื่องสังเคราะห์ 100%','WSS-M2C913-D (ขนาด 7 ลิตร)',2500,27,1,'/img/db/01k2ae.jpg');
INSERT INTO Goods VALUES(21,'Ford','ไส้กรองน้ำมันเครื่อง','for Ford Everest',230,81,1,'/img/db/oil-filter.jpg');
INSERT INTO Goods VALUES(22,'Ford','โอริงน๊อตอ่างน้ำมันเครื่อง','for Ford Ranger',51,16,1,'/img/db/oring.jpg');
INSERT INTO Goods VALUES(23,'MicronAir','ไส้กรองแอร์ห้องโดยสาร','รุ่น CABON MICRON AIR เกรด HEPA (H12)',499,22,1,'/img/db/a-c-filter.webp');
INSERT INTO Goods VALUES(31,'Ford','โอริง','for Ford Ranger',170,20,1,'/img/db/oring2.jpg');
INSERT INTO Goods VALUES(32,'Ford','ชุดสายพานราวลิ้น','for Ford Ranger',8389,51,1,'/img/db/e28glm.jpg');
INSERT INTO Goods VALUES(33,'BENDIX ULTRA PREMIUM','B1262 Ultra Premium ดิสเบรคหน้า','ฮอนด้า แจ๊ส 1.5 i-Dsi / 1.5 E-VTEC / 2003-07',2020,30,1,'/img/db/01Bendix.jpg');
INSERT INTO Goods VALUES(34,'BENDIX ULTRA PREMIUM','DB1941 Ultra Premium ดิสเบรคหน้า',replace(replace('MAZDA 2, FORD FIESTA, ECOBOOST / 10-ON\r\n','\r',char(13)),'\n',char(10)),1750,30,1,'/img/db/01Bendix.jpg');
INSERT INTO Goods VALUES(35,'KYB','341408-D โช้คอัพหน้าขวา','TOYOTA VIGO (2WD) TGN15, TGN16, KUN16, GGN15 ปี 2005-2014',1305,30,1,'/img/db/02choke.webp');
INSERT INTO Goods VALUES(36,'KYB','341408-D โช้คอัพหน้าซ้าย','TOYOTA ALTIS ZZE141	143 ปี 2008-2013',1915,30,1,'/img/db/02choke.webp');
INSERT INTO Goods VALUES(37,'MFX','แบตเตอรี่ GS BAGS MFX-60L','50แอมป์/ชั่วโมง	ขั้วบวกซ้ายใหญ่',2410,30,1,'/img/db/03battery.webp');
INSERT INTO Goods VALUES(38,'MFX','แบตเตอรี่ GS BAGS MFX-80L','75แอมป์/ชั่วโมง	ขั้วบวกซ้ายใหญ่',3090,30,1,'/img/db/03battery.webp');
CREATE TABLE Promotion (
  promotionId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  promotionName TEXT NOT NULL,
  promotionDescription TEXT DEFAULT NULL,
  isActive INTEGER DEFAULT NULL,
  promotionPhotoURL TEXT DEFAULT NULL
);
INSERT INTO Promotion VALUES(1,'Michelin Madness','ลดสูงสุด 15% เมื่อซื้อยาง Michelin ครบ 4 เส้น!',1,'/img/db/michelin-4tyres.jpg');
INSERT INTO Promotion VALUES(2,'ซื้อ 3 แถม 1','ซื้อยาง Michelin Primacy SUV+ 3 เส้น รับฟรีอีก 1 เส้น',1,'/img/db/michelin-primacy-suv+.webp');
INSERT INTO Promotion VALUES(3,'ฟรีค่าติดตั้ง','เมื่อลูกค้าซื้อยาง Michelin LTX Trail ครบ 4 เส้น',1,'/img/db/michelin-ltx-trail.webp');
INSERT INTO Promotion VALUES(4,'เช็กช่วงล่างฟรี','ซื้อยาง Michelin รุ่นใดก็ได้ ครบ 2 เส้นขึ้นไป',1,'/img/db/bibendum.jpg');
INSERT INTO Promotion VALUES(5,'โปรเดือนแห่งความรัก','ส่วนลด 10% ทุกเส้น และพิเศษ! แถมแฟน 1 คนสำหรับคนโสด',1,'/img/db/kamink-promotion.jpg');
CREATE TABLE RegistrationNumber (
  regId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  carId INTEGER DEFAULT NULL,
  customerId INTEGER DEFAULT NULL,
  mileage INTEGER DEFAULT NULL, carRegisNo TEXT,
  FOREIGN KEY (carId) REFERENCES Cars(carId),
  FOREIGN KEY (customerId) REFERENCES Customers(customerId)
);
INSERT INTO RegistrationNumber VALUES(21,1,25,90000,'กข0001');
INSERT INTO RegistrationNumber VALUES(22,1,26,15000,'cake1111');
INSERT INTO RegistrationNumber VALUES(23,1,27,15000,'2');
INSERT INTO RegistrationNumber VALUES(24,3,25,15000,NULL);
INSERT INTO RegistrationNumber VALUES(25,6,25,15000,NULL);
INSERT INTO RegistrationNumber VALUES(26,3,25,210000,NULL);
INSERT INTO RegistrationNumber VALUES(27,3,25,15000,'กข0002');
INSERT INTO RegistrationNumber VALUES(28,1,28,150000,'patt');
INSERT INTO RegistrationNumber VALUES(29,5,28,240000,'patt2');
INSERT INTO RegistrationNumber VALUES(30,4,28,135000,'patt3');
INSERT INTO RegistrationNumber VALUES(31,1,29,105000,'sea');
INSERT INTO RegistrationNumber VALUES(32,1,30,45000,'sea');
INSERT INTO RegistrationNumber VALUES(33,1,31,135000,'sea1');
INSERT INTO RegistrationNumber VALUES(34,1,32,120000,'c');
INSERT INTO RegistrationNumber VALUES(35,1,33,60000,'a');
INSERT INTO RegistrationNumber VALUES(36,5,32,120000,'juju');
INSERT INTO RegistrationNumber VALUES(37,NULL,32,210000,NULL);
INSERT INTO RegistrationNumber VALUES(38,NULL,32,120000,NULL);
INSERT INTO RegistrationNumber VALUES(39,1,34,15000,'k');
INSERT INTO RegistrationNumber VALUES(40,5,32,15000,'999157');
INSERT INTO RegistrationNumber VALUES(41,1,35,15000,'o');
INSERT INTO RegistrationNumber VALUES(42,1,36,135000,'');
INSERT INTO RegistrationNumber VALUES(43,1,37,15000,'0');
INSERT INTO RegistrationNumber VALUES(44,1,37,'','0000');
CREATE TABLE Maintenance (
  maintenanceId INTEGER PRIMARY KEY AUTOINCREMENT,  -- primary key ที่ auto increment
  carId INTEGER,                                     -- carId จะเป็น fk จากตาราง Cars
  mileage INTEGER,                                   -- mileage เป็นตัวเลข
  FOREIGN KEY (carId) REFERENCES Cars(carId)         -- สร้าง foreign key ให้ carId อ้างอิงจากตาราง Cars
);
INSERT INTO Maintenance VALUES(1,3,15000);
INSERT INTO Maintenance VALUES(2,3,30000);
INSERT INTO Maintenance VALUES(3,3,45000);
INSERT INTO Maintenance VALUES(4,3,60000);
INSERT INTO Maintenance VALUES(5,3,75000);
INSERT INTO Maintenance VALUES(6,3,90000);
INSERT INTO Maintenance VALUES(7,3,105000);
INSERT INTO Maintenance VALUES(8,3,120000);
INSERT INTO Maintenance VALUES(9,3,135000);
INSERT INTO Maintenance VALUES(10,3,150000);
INSERT INTO Maintenance VALUES(11,3,165000);
INSERT INTO Maintenance VALUES(12,3,180000);
INSERT INTO Maintenance VALUES(13,3,195000);
INSERT INTO Maintenance VALUES(14,3,210000);
INSERT INTO Maintenance VALUES(15,3,225000);
INSERT INTO Maintenance VALUES(16,3,240000);
INSERT INTO Maintenance VALUES(17,4,15000);
INSERT INTO Maintenance VALUES(18,4,30000);
INSERT INTO Maintenance VALUES(19,4,45000);
INSERT INTO Maintenance VALUES(20,4,60000);
INSERT INTO Maintenance VALUES(21,4,75000);
INSERT INTO Maintenance VALUES(22,4,90000);
INSERT INTO Maintenance VALUES(23,4,105000);
INSERT INTO Maintenance VALUES(24,4,120000);
INSERT INTO Maintenance VALUES(25,4,135000);
INSERT INTO Maintenance VALUES(26,4,150000);
INSERT INTO Maintenance VALUES(27,4,165000);
INSERT INTO Maintenance VALUES(28,4,180000);
INSERT INTO Maintenance VALUES(29,4,195000);
INSERT INTO Maintenance VALUES(30,4,210000);
INSERT INTO Maintenance VALUES(31,4,225000);
INSERT INTO Maintenance VALUES(32,4,240000);
INSERT INTO Maintenance VALUES(33,5,15000);
INSERT INTO Maintenance VALUES(34,5,30000);
INSERT INTO Maintenance VALUES(35,5,45000);
INSERT INTO Maintenance VALUES(36,5,60000);
INSERT INTO Maintenance VALUES(37,5,75000);
INSERT INTO Maintenance VALUES(38,5,90000);
INSERT INTO Maintenance VALUES(39,5,105000);
INSERT INTO Maintenance VALUES(40,5,120000);
INSERT INTO Maintenance VALUES(41,5,135000);
INSERT INTO Maintenance VALUES(42,5,150000);
INSERT INTO Maintenance VALUES(43,5,165000);
INSERT INTO Maintenance VALUES(44,5,180000);
INSERT INTO Maintenance VALUES(45,5,195000);
INSERT INTO Maintenance VALUES(46,5,210000);
INSERT INTO Maintenance VALUES(47,5,225000);
INSERT INTO Maintenance VALUES(48,5,240000);
INSERT INTO Maintenance VALUES(62,1,15000);
INSERT INTO Maintenance VALUES(63,1,30000);
INSERT INTO Maintenance VALUES(64,1,45000);
INSERT INTO Maintenance VALUES(65,1,60000);
INSERT INTO Maintenance VALUES(66,1,75000);
INSERT INTO Maintenance VALUES(67,1,90000);
INSERT INTO Maintenance VALUES(68,1,105000);
INSERT INTO Maintenance VALUES(69,1,120000);
INSERT INTO Maintenance VALUES(70,1,135000);
INSERT INTO Maintenance VALUES(71,1,150000);
INSERT INTO Maintenance VALUES(72,1,165000);
INSERT INTO Maintenance VALUES(73,1,180000);
INSERT INTO Maintenance VALUES(74,1,195000);
INSERT INTO Maintenance VALUES(75,1,210000);
INSERT INTO Maintenance VALUES(76,1,225000);
INSERT INTO Maintenance VALUES(77,1,240000);
INSERT INTO Maintenance VALUES(78,2,15000);
INSERT INTO Maintenance VALUES(79,2,30000);
INSERT INTO Maintenance VALUES(80,2,45000);
INSERT INTO Maintenance VALUES(81,2,60000);
INSERT INTO Maintenance VALUES(82,2,75000);
INSERT INTO Maintenance VALUES(83,2,90000);
INSERT INTO Maintenance VALUES(84,2,105000);
INSERT INTO Maintenance VALUES(85,2,120000);
INSERT INTO Maintenance VALUES(86,2,135000);
INSERT INTO Maintenance VALUES(87,2,150000);
INSERT INTO Maintenance VALUES(88,2,165000);
INSERT INTO Maintenance VALUES(89,2,180000);
INSERT INTO Maintenance VALUES(90,2,195000);
INSERT INTO Maintenance VALUES(91,2,210000);
INSERT INTO Maintenance VALUES(92,2,225000);
INSERT INTO Maintenance VALUES(93,2,240000);
INSERT INTO Maintenance VALUES(193,6,15000);
INSERT INTO Maintenance VALUES(194,6,30000);
INSERT INTO Maintenance VALUES(195,6,45000);
INSERT INTO Maintenance VALUES(196,6,60000);
INSERT INTO Maintenance VALUES(197,6,75000);
INSERT INTO Maintenance VALUES(198,6,90000);
INSERT INTO Maintenance VALUES(199,6,105000);
INSERT INTO Maintenance VALUES(200,6,120000);
INSERT INTO Maintenance VALUES(201,6,135000);
INSERT INTO Maintenance VALUES(202,6,150000);
INSERT INTO Maintenance VALUES(203,6,165000);
INSERT INTO Maintenance VALUES(204,6,180000);
INSERT INTO Maintenance VALUES(205,6,195000);
INSERT INTO Maintenance VALUES(206,6,210000);
INSERT INTO Maintenance VALUES(207,6,225000);
INSERT INTO Maintenance VALUES(208,6,240000);
CREATE TABLE MaintenanceGoods (
  maintenanceGoodsId INTEGER PRIMARY KEY AUTOINCREMENT,  -- primary key ที่ auto increment
  maintenanceId INTEGER,                                 -- maintenanceId เป็น foreign key จากตาราง Maintenance
  goodsId INTEGER,                                       -- goodsId เป็น foreign key จากตาราง Goods
  FOREIGN KEY (maintenanceId) REFERENCES Maintenance(maintenanceId),  -- เชื่อมโยงกับตาราง Maintenance
  FOREIGN KEY (goodsId) REFERENCES Goods(goodsId)       -- เชื่อมโยงกับตาราง Goods
);
INSERT INTO MaintenanceGoods VALUES(545,1,18);
INSERT INTO MaintenanceGoods VALUES(546,2,18);
INSERT INTO MaintenanceGoods VALUES(547,3,18);
INSERT INTO MaintenanceGoods VALUES(548,4,18);
INSERT INTO MaintenanceGoods VALUES(549,5,18);
INSERT INTO MaintenanceGoods VALUES(550,6,18);
INSERT INTO MaintenanceGoods VALUES(551,7,18);
INSERT INTO MaintenanceGoods VALUES(552,8,18);
INSERT INTO MaintenanceGoods VALUES(553,9,18);
INSERT INTO MaintenanceGoods VALUES(554,10,18);
INSERT INTO MaintenanceGoods VALUES(555,11,18);
INSERT INTO MaintenanceGoods VALUES(556,12,18);
INSERT INTO MaintenanceGoods VALUES(557,13,18);
INSERT INTO MaintenanceGoods VALUES(558,14,18);
INSERT INTO MaintenanceGoods VALUES(559,15,18);
INSERT INTO MaintenanceGoods VALUES(560,16,18);
INSERT INTO MaintenanceGoods VALUES(561,2,8);
INSERT INTO MaintenanceGoods VALUES(562,4,8);
INSERT INTO MaintenanceGoods VALUES(563,6,8);
INSERT INTO MaintenanceGoods VALUES(564,8,8);
INSERT INTO MaintenanceGoods VALUES(565,10,8);
INSERT INTO MaintenanceGoods VALUES(566,12,8);
INSERT INTO MaintenanceGoods VALUES(567,14,8);
INSERT INTO MaintenanceGoods VALUES(568,16,8);
INSERT INTO MaintenanceGoods VALUES(569,3,6);
INSERT INTO MaintenanceGoods VALUES(570,6,6);
INSERT INTO MaintenanceGoods VALUES(571,9,6);
INSERT INTO MaintenanceGoods VALUES(572,12,6);
INSERT INTO MaintenanceGoods VALUES(573,15,6);
INSERT INTO MaintenanceGoods VALUES(574,3,7);
INSERT INTO MaintenanceGoods VALUES(575,6,7);
INSERT INTO MaintenanceGoods VALUES(576,9,7);
INSERT INTO MaintenanceGoods VALUES(577,12,7);
INSERT INTO MaintenanceGoods VALUES(578,15,7);
INSERT INTO MaintenanceGoods VALUES(579,5,5);
INSERT INTO MaintenanceGoods VALUES(580,10,5);
INSERT INTO MaintenanceGoods VALUES(581,15,5);
INSERT INTO MaintenanceGoods VALUES(582,10,9);
INSERT INTO MaintenanceGoods VALUES(583,10,10);
INSERT INTO MaintenanceGoods VALUES(584,10,11);
INSERT INTO MaintenanceGoods VALUES(585,10,12);
INSERT INTO MaintenanceGoods VALUES(586,10,13);
INSERT INTO MaintenanceGoods VALUES(587,10,14);
INSERT INTO MaintenanceGoods VALUES(588,10,15);
INSERT INTO MaintenanceGoods VALUES(589,10,16);
INSERT INTO MaintenanceGoods VALUES(590,10,17);
INSERT INTO MaintenanceGoods VALUES(591,17,18);
INSERT INTO MaintenanceGoods VALUES(592,18,8);
INSERT INTO MaintenanceGoods VALUES(593,18,18);
INSERT INTO MaintenanceGoods VALUES(594,19,6);
INSERT INTO MaintenanceGoods VALUES(595,19,7);
INSERT INTO MaintenanceGoods VALUES(596,19,18);
INSERT INTO MaintenanceGoods VALUES(597,20,8);
INSERT INTO MaintenanceGoods VALUES(598,20,18);
INSERT INTO MaintenanceGoods VALUES(599,21,5);
INSERT INTO MaintenanceGoods VALUES(600,21,18);
INSERT INTO MaintenanceGoods VALUES(601,22,6);
INSERT INTO MaintenanceGoods VALUES(602,22,7);
INSERT INTO MaintenanceGoods VALUES(603,22,8);
INSERT INTO MaintenanceGoods VALUES(604,22,18);
INSERT INTO MaintenanceGoods VALUES(605,23,18);
INSERT INTO MaintenanceGoods VALUES(606,24,8);
INSERT INTO MaintenanceGoods VALUES(607,24,18);
INSERT INTO MaintenanceGoods VALUES(608,25,6);
INSERT INTO MaintenanceGoods VALUES(609,25,7);
INSERT INTO MaintenanceGoods VALUES(610,25,18);
INSERT INTO MaintenanceGoods VALUES(611,26,5);
INSERT INTO MaintenanceGoods VALUES(612,26,8);
INSERT INTO MaintenanceGoods VALUES(613,26,9);
INSERT INTO MaintenanceGoods VALUES(614,26,10);
INSERT INTO MaintenanceGoods VALUES(615,26,11);
INSERT INTO MaintenanceGoods VALUES(616,26,12);
INSERT INTO MaintenanceGoods VALUES(617,26,13);
INSERT INTO MaintenanceGoods VALUES(618,26,14);
INSERT INTO MaintenanceGoods VALUES(619,26,15);
INSERT INTO MaintenanceGoods VALUES(620,26,16);
INSERT INTO MaintenanceGoods VALUES(621,26,17);
INSERT INTO MaintenanceGoods VALUES(622,26,18);
INSERT INTO MaintenanceGoods VALUES(623,27,18);
INSERT INTO MaintenanceGoods VALUES(624,28,6);
INSERT INTO MaintenanceGoods VALUES(625,28,7);
INSERT INTO MaintenanceGoods VALUES(626,28,8);
INSERT INTO MaintenanceGoods VALUES(627,28,18);
INSERT INTO MaintenanceGoods VALUES(628,29,18);
INSERT INTO MaintenanceGoods VALUES(629,30,8);
INSERT INTO MaintenanceGoods VALUES(630,30,18);
INSERT INTO MaintenanceGoods VALUES(631,31,5);
INSERT INTO MaintenanceGoods VALUES(632,31,6);
INSERT INTO MaintenanceGoods VALUES(633,31,7);
INSERT INTO MaintenanceGoods VALUES(634,31,18);
INSERT INTO MaintenanceGoods VALUES(635,32,8);
INSERT INTO MaintenanceGoods VALUES(636,32,18);
INSERT INTO MaintenanceGoods VALUES(637,33,18);
INSERT INTO MaintenanceGoods VALUES(638,34,8);
INSERT INTO MaintenanceGoods VALUES(639,34,18);
INSERT INTO MaintenanceGoods VALUES(640,35,6);
INSERT INTO MaintenanceGoods VALUES(641,35,7);
INSERT INTO MaintenanceGoods VALUES(642,35,18);
INSERT INTO MaintenanceGoods VALUES(643,36,8);
INSERT INTO MaintenanceGoods VALUES(644,36,18);
INSERT INTO MaintenanceGoods VALUES(645,37,5);
INSERT INTO MaintenanceGoods VALUES(646,37,18);
INSERT INTO MaintenanceGoods VALUES(647,38,6);
INSERT INTO MaintenanceGoods VALUES(648,38,7);
INSERT INTO MaintenanceGoods VALUES(649,38,8);
INSERT INTO MaintenanceGoods VALUES(650,38,18);
INSERT INTO MaintenanceGoods VALUES(651,39,18);
INSERT INTO MaintenanceGoods VALUES(652,40,8);
INSERT INTO MaintenanceGoods VALUES(653,40,18);
INSERT INTO MaintenanceGoods VALUES(654,41,6);
INSERT INTO MaintenanceGoods VALUES(655,41,7);
INSERT INTO MaintenanceGoods VALUES(656,41,18);
INSERT INTO MaintenanceGoods VALUES(657,42,5);
INSERT INTO MaintenanceGoods VALUES(658,42,8);
INSERT INTO MaintenanceGoods VALUES(659,42,9);
INSERT INTO MaintenanceGoods VALUES(660,42,10);
INSERT INTO MaintenanceGoods VALUES(661,42,11);
INSERT INTO MaintenanceGoods VALUES(662,42,12);
INSERT INTO MaintenanceGoods VALUES(663,42,13);
INSERT INTO MaintenanceGoods VALUES(664,42,14);
INSERT INTO MaintenanceGoods VALUES(665,42,15);
INSERT INTO MaintenanceGoods VALUES(666,42,16);
INSERT INTO MaintenanceGoods VALUES(667,42,17);
INSERT INTO MaintenanceGoods VALUES(668,42,18);
INSERT INTO MaintenanceGoods VALUES(669,43,18);
INSERT INTO MaintenanceGoods VALUES(670,44,6);
INSERT INTO MaintenanceGoods VALUES(671,44,7);
INSERT INTO MaintenanceGoods VALUES(672,44,8);
INSERT INTO MaintenanceGoods VALUES(673,44,18);
INSERT INTO MaintenanceGoods VALUES(674,45,18);
INSERT INTO MaintenanceGoods VALUES(675,46,8);
INSERT INTO MaintenanceGoods VALUES(676,46,18);
INSERT INTO MaintenanceGoods VALUES(677,47,5);
INSERT INTO MaintenanceGoods VALUES(678,47,6);
INSERT INTO MaintenanceGoods VALUES(679,47,7);
INSERT INTO MaintenanceGoods VALUES(680,47,18);
INSERT INTO MaintenanceGoods VALUES(681,48,8);
INSERT INTO MaintenanceGoods VALUES(682,48,18);
INSERT INTO MaintenanceGoods VALUES(683,193,18);
INSERT INTO MaintenanceGoods VALUES(684,194,8);
INSERT INTO MaintenanceGoods VALUES(685,194,18);
INSERT INTO MaintenanceGoods VALUES(686,195,6);
INSERT INTO MaintenanceGoods VALUES(687,195,7);
INSERT INTO MaintenanceGoods VALUES(688,195,18);
INSERT INTO MaintenanceGoods VALUES(689,196,8);
INSERT INTO MaintenanceGoods VALUES(690,196,18);
INSERT INTO MaintenanceGoods VALUES(691,197,5);
INSERT INTO MaintenanceGoods VALUES(692,197,18);
INSERT INTO MaintenanceGoods VALUES(693,198,6);
INSERT INTO MaintenanceGoods VALUES(694,198,7);
INSERT INTO MaintenanceGoods VALUES(695,198,8);
INSERT INTO MaintenanceGoods VALUES(696,198,18);
INSERT INTO MaintenanceGoods VALUES(697,199,18);
INSERT INTO MaintenanceGoods VALUES(698,200,8);
INSERT INTO MaintenanceGoods VALUES(699,200,18);
INSERT INTO MaintenanceGoods VALUES(700,201,6);
INSERT INTO MaintenanceGoods VALUES(701,201,7);
INSERT INTO MaintenanceGoods VALUES(702,201,18);
INSERT INTO MaintenanceGoods VALUES(703,202,5);
INSERT INTO MaintenanceGoods VALUES(704,202,8);
INSERT INTO MaintenanceGoods VALUES(705,202,9);
INSERT INTO MaintenanceGoods VALUES(706,202,10);
INSERT INTO MaintenanceGoods VALUES(707,202,11);
INSERT INTO MaintenanceGoods VALUES(708,202,12);
INSERT INTO MaintenanceGoods VALUES(709,202,13);
INSERT INTO MaintenanceGoods VALUES(710,202,14);
INSERT INTO MaintenanceGoods VALUES(711,202,15);
INSERT INTO MaintenanceGoods VALUES(712,202,16);
INSERT INTO MaintenanceGoods VALUES(713,202,17);
INSERT INTO MaintenanceGoods VALUES(714,202,18);
INSERT INTO MaintenanceGoods VALUES(715,203,18);
INSERT INTO MaintenanceGoods VALUES(716,204,6);
INSERT INTO MaintenanceGoods VALUES(717,204,7);
INSERT INTO MaintenanceGoods VALUES(718,204,8);
INSERT INTO MaintenanceGoods VALUES(719,204,18);
INSERT INTO MaintenanceGoods VALUES(720,205,18);
INSERT INTO MaintenanceGoods VALUES(721,206,8);
INSERT INTO MaintenanceGoods VALUES(722,206,18);
INSERT INTO MaintenanceGoods VALUES(723,207,5);
INSERT INTO MaintenanceGoods VALUES(724,207,6);
INSERT INTO MaintenanceGoods VALUES(725,207,7);
INSERT INTO MaintenanceGoods VALUES(726,207,18);
INSERT INTO MaintenanceGoods VALUES(727,208,8);
INSERT INTO MaintenanceGoods VALUES(728,208,18);
INSERT INTO MaintenanceGoods VALUES(729,62,5);
INSERT INTO MaintenanceGoods VALUES(730,62,18);
INSERT INTO MaintenanceGoods VALUES(731,62,20);
INSERT INTO MaintenanceGoods VALUES(732,62,21);
INSERT INTO MaintenanceGoods VALUES(733,62,22);
INSERT INTO MaintenanceGoods VALUES(734,62,23);
INSERT INTO MaintenanceGoods VALUES(735,63,6);
INSERT INTO MaintenanceGoods VALUES(736,63,18);
INSERT INTO MaintenanceGoods VALUES(737,63,20);
INSERT INTO MaintenanceGoods VALUES(738,63,21);
INSERT INTO MaintenanceGoods VALUES(739,63,22);
INSERT INTO MaintenanceGoods VALUES(740,63,23);
INSERT INTO MaintenanceGoods VALUES(741,64,5);
INSERT INTO MaintenanceGoods VALUES(742,64,18);
INSERT INTO MaintenanceGoods VALUES(743,64,20);
INSERT INTO MaintenanceGoods VALUES(744,64,21);
INSERT INTO MaintenanceGoods VALUES(745,64,22);
INSERT INTO MaintenanceGoods VALUES(746,64,23);
INSERT INTO MaintenanceGoods VALUES(747,65,5);
INSERT INTO MaintenanceGoods VALUES(748,65,6);
INSERT INTO MaintenanceGoods VALUES(749,65,18);
INSERT INTO MaintenanceGoods VALUES(750,65,20);
INSERT INTO MaintenanceGoods VALUES(751,65,21);
INSERT INTO MaintenanceGoods VALUES(752,65,22);
INSERT INTO MaintenanceGoods VALUES(753,65,23);
INSERT INTO MaintenanceGoods VALUES(754,66,5);
INSERT INTO MaintenanceGoods VALUES(755,66,18);
INSERT INTO MaintenanceGoods VALUES(756,66,20);
INSERT INTO MaintenanceGoods VALUES(757,66,21);
INSERT INTO MaintenanceGoods VALUES(758,66,22);
INSERT INTO MaintenanceGoods VALUES(759,66,23);
INSERT INTO MaintenanceGoods VALUES(760,67,6);
INSERT INTO MaintenanceGoods VALUES(761,67,18);
INSERT INTO MaintenanceGoods VALUES(762,67,20);
INSERT INTO MaintenanceGoods VALUES(763,67,21);
INSERT INTO MaintenanceGoods VALUES(764,67,22);
INSERT INTO MaintenanceGoods VALUES(765,67,23);
INSERT INTO MaintenanceGoods VALUES(766,68,5);
INSERT INTO MaintenanceGoods VALUES(767,68,18);
INSERT INTO MaintenanceGoods VALUES(768,68,20);
INSERT INTO MaintenanceGoods VALUES(769,68,21);
INSERT INTO MaintenanceGoods VALUES(770,68,22);
INSERT INTO MaintenanceGoods VALUES(771,68,23);
INSERT INTO MaintenanceGoods VALUES(772,69,5);
INSERT INTO MaintenanceGoods VALUES(773,69,6);
INSERT INTO MaintenanceGoods VALUES(774,69,18);
INSERT INTO MaintenanceGoods VALUES(775,69,20);
INSERT INTO MaintenanceGoods VALUES(776,69,21);
INSERT INTO MaintenanceGoods VALUES(777,69,22);
INSERT INTO MaintenanceGoods VALUES(778,69,23);
INSERT INTO MaintenanceGoods VALUES(779,70,5);
INSERT INTO MaintenanceGoods VALUES(780,70,18);
INSERT INTO MaintenanceGoods VALUES(781,70,20);
INSERT INTO MaintenanceGoods VALUES(782,70,21);
INSERT INTO MaintenanceGoods VALUES(783,70,22);
INSERT INTO MaintenanceGoods VALUES(784,70,23);
INSERT INTO MaintenanceGoods VALUES(785,71,6);
INSERT INTO MaintenanceGoods VALUES(786,71,18);
INSERT INTO MaintenanceGoods VALUES(787,71,20);
INSERT INTO MaintenanceGoods VALUES(788,71,21);
INSERT INTO MaintenanceGoods VALUES(789,71,22);
INSERT INTO MaintenanceGoods VALUES(790,71,23);
INSERT INTO MaintenanceGoods VALUES(791,72,5);
INSERT INTO MaintenanceGoods VALUES(792,72,10);
INSERT INTO MaintenanceGoods VALUES(793,72,11);
INSERT INTO MaintenanceGoods VALUES(794,72,12);
INSERT INTO MaintenanceGoods VALUES(795,72,13);
INSERT INTO MaintenanceGoods VALUES(796,72,14);
INSERT INTO MaintenanceGoods VALUES(797,72,15);
INSERT INTO MaintenanceGoods VALUES(798,72,16);
INSERT INTO MaintenanceGoods VALUES(799,72,17);
INSERT INTO MaintenanceGoods VALUES(800,72,18);
INSERT INTO MaintenanceGoods VALUES(801,72,20);
INSERT INTO MaintenanceGoods VALUES(802,72,21);
INSERT INTO MaintenanceGoods VALUES(803,72,22);
INSERT INTO MaintenanceGoods VALUES(804,72,23);
INSERT INTO MaintenanceGoods VALUES(805,72,31);
INSERT INTO MaintenanceGoods VALUES(806,73,18);
INSERT INTO MaintenanceGoods VALUES(807,73,20);
INSERT INTO MaintenanceGoods VALUES(808,73,21);
INSERT INTO MaintenanceGoods VALUES(809,73,22);
INSERT INTO MaintenanceGoods VALUES(810,73,23);
INSERT INTO MaintenanceGoods VALUES(811,74,18);
INSERT INTO MaintenanceGoods VALUES(812,74,20);
INSERT INTO MaintenanceGoods VALUES(813,74,21);
INSERT INTO MaintenanceGoods VALUES(814,74,22);
INSERT INTO MaintenanceGoods VALUES(815,74,23);
INSERT INTO MaintenanceGoods VALUES(816,75,18);
INSERT INTO MaintenanceGoods VALUES(817,75,20);
INSERT INTO MaintenanceGoods VALUES(818,75,21);
INSERT INTO MaintenanceGoods VALUES(819,75,22);
INSERT INTO MaintenanceGoods VALUES(820,75,23);
INSERT INTO MaintenanceGoods VALUES(821,76,18);
INSERT INTO MaintenanceGoods VALUES(822,76,20);
INSERT INTO MaintenanceGoods VALUES(823,76,21);
INSERT INTO MaintenanceGoods VALUES(824,76,22);
INSERT INTO MaintenanceGoods VALUES(825,76,23);
INSERT INTO MaintenanceGoods VALUES(826,77,18);
INSERT INTO MaintenanceGoods VALUES(827,77,20);
INSERT INTO MaintenanceGoods VALUES(828,77,21);
INSERT INTO MaintenanceGoods VALUES(829,77,22);
INSERT INTO MaintenanceGoods VALUES(830,77,23);
INSERT INTO MaintenanceGoods VALUES(831,78,5);
INSERT INTO MaintenanceGoods VALUES(832,78,18);
INSERT INTO MaintenanceGoods VALUES(833,78,20);
INSERT INTO MaintenanceGoods VALUES(834,78,21);
INSERT INTO MaintenanceGoods VALUES(835,78,22);
INSERT INTO MaintenanceGoods VALUES(836,78,23);
INSERT INTO MaintenanceGoods VALUES(837,79,6);
INSERT INTO MaintenanceGoods VALUES(838,79,18);
INSERT INTO MaintenanceGoods VALUES(839,79,20);
INSERT INTO MaintenanceGoods VALUES(840,79,21);
INSERT INTO MaintenanceGoods VALUES(841,79,22);
INSERT INTO MaintenanceGoods VALUES(842,79,23);
INSERT INTO MaintenanceGoods VALUES(843,80,5);
INSERT INTO MaintenanceGoods VALUES(844,80,18);
INSERT INTO MaintenanceGoods VALUES(845,80,20);
INSERT INTO MaintenanceGoods VALUES(846,80,21);
INSERT INTO MaintenanceGoods VALUES(847,80,22);
INSERT INTO MaintenanceGoods VALUES(848,80,23);
INSERT INTO MaintenanceGoods VALUES(849,81,5);
INSERT INTO MaintenanceGoods VALUES(850,81,6);
INSERT INTO MaintenanceGoods VALUES(851,81,18);
INSERT INTO MaintenanceGoods VALUES(852,81,20);
INSERT INTO MaintenanceGoods VALUES(853,81,21);
INSERT INTO MaintenanceGoods VALUES(854,81,22);
INSERT INTO MaintenanceGoods VALUES(855,81,23);
INSERT INTO MaintenanceGoods VALUES(856,82,5);
INSERT INTO MaintenanceGoods VALUES(857,82,18);
INSERT INTO MaintenanceGoods VALUES(858,82,20);
INSERT INTO MaintenanceGoods VALUES(859,82,21);
INSERT INTO MaintenanceGoods VALUES(860,82,22);
INSERT INTO MaintenanceGoods VALUES(861,82,23);
INSERT INTO MaintenanceGoods VALUES(862,83,6);
INSERT INTO MaintenanceGoods VALUES(863,83,18);
INSERT INTO MaintenanceGoods VALUES(864,83,20);
INSERT INTO MaintenanceGoods VALUES(865,83,21);
INSERT INTO MaintenanceGoods VALUES(866,83,22);
INSERT INTO MaintenanceGoods VALUES(867,83,23);
INSERT INTO MaintenanceGoods VALUES(868,84,5);
INSERT INTO MaintenanceGoods VALUES(869,84,18);
INSERT INTO MaintenanceGoods VALUES(870,84,20);
INSERT INTO MaintenanceGoods VALUES(871,84,21);
INSERT INTO MaintenanceGoods VALUES(872,84,22);
INSERT INTO MaintenanceGoods VALUES(873,84,23);
INSERT INTO MaintenanceGoods VALUES(874,85,5);
INSERT INTO MaintenanceGoods VALUES(875,85,6);
INSERT INTO MaintenanceGoods VALUES(876,85,18);
INSERT INTO MaintenanceGoods VALUES(877,85,20);
INSERT INTO MaintenanceGoods VALUES(878,85,21);
INSERT INTO MaintenanceGoods VALUES(879,85,22);
INSERT INTO MaintenanceGoods VALUES(880,85,23);
INSERT INTO MaintenanceGoods VALUES(881,86,5);
INSERT INTO MaintenanceGoods VALUES(882,86,18);
INSERT INTO MaintenanceGoods VALUES(883,86,20);
INSERT INTO MaintenanceGoods VALUES(884,86,21);
INSERT INTO MaintenanceGoods VALUES(885,86,22);
INSERT INTO MaintenanceGoods VALUES(886,86,23);
INSERT INTO MaintenanceGoods VALUES(887,87,6);
INSERT INTO MaintenanceGoods VALUES(888,87,18);
INSERT INTO MaintenanceGoods VALUES(889,87,20);
INSERT INTO MaintenanceGoods VALUES(890,87,21);
INSERT INTO MaintenanceGoods VALUES(891,87,22);
INSERT INTO MaintenanceGoods VALUES(892,87,23);
INSERT INTO MaintenanceGoods VALUES(893,88,5);
INSERT INTO MaintenanceGoods VALUES(894,88,10);
INSERT INTO MaintenanceGoods VALUES(895,88,11);
INSERT INTO MaintenanceGoods VALUES(896,88,12);
INSERT INTO MaintenanceGoods VALUES(897,88,13);
INSERT INTO MaintenanceGoods VALUES(898,88,14);
INSERT INTO MaintenanceGoods VALUES(899,88,15);
INSERT INTO MaintenanceGoods VALUES(900,88,16);
INSERT INTO MaintenanceGoods VALUES(901,88,17);
INSERT INTO MaintenanceGoods VALUES(902,88,18);
INSERT INTO MaintenanceGoods VALUES(903,88,20);
INSERT INTO MaintenanceGoods VALUES(904,88,21);
INSERT INTO MaintenanceGoods VALUES(905,88,22);
INSERT INTO MaintenanceGoods VALUES(906,88,23);
INSERT INTO MaintenanceGoods VALUES(907,88,31);
INSERT INTO MaintenanceGoods VALUES(908,89,18);
INSERT INTO MaintenanceGoods VALUES(909,89,20);
INSERT INTO MaintenanceGoods VALUES(910,89,21);
INSERT INTO MaintenanceGoods VALUES(911,89,22);
INSERT INTO MaintenanceGoods VALUES(912,89,23);
INSERT INTO MaintenanceGoods VALUES(913,90,18);
INSERT INTO MaintenanceGoods VALUES(914,90,20);
INSERT INTO MaintenanceGoods VALUES(915,90,21);
INSERT INTO MaintenanceGoods VALUES(916,90,22);
INSERT INTO MaintenanceGoods VALUES(917,90,23);
INSERT INTO MaintenanceGoods VALUES(918,91,18);
INSERT INTO MaintenanceGoods VALUES(919,91,20);
INSERT INTO MaintenanceGoods VALUES(920,91,21);
INSERT INTO MaintenanceGoods VALUES(921,91,22);
INSERT INTO MaintenanceGoods VALUES(922,91,23);
INSERT INTO MaintenanceGoods VALUES(923,92,18);
INSERT INTO MaintenanceGoods VALUES(924,92,20);
INSERT INTO MaintenanceGoods VALUES(925,92,21);
INSERT INTO MaintenanceGoods VALUES(926,92,22);
INSERT INTO MaintenanceGoods VALUES(927,92,23);
INSERT INTO MaintenanceGoods VALUES(928,93,18);
INSERT INTO MaintenanceGoods VALUES(929,93,20);
INSERT INTO MaintenanceGoods VALUES(930,93,21);
INSERT INTO MaintenanceGoods VALUES(931,93,22);
INSERT INTO MaintenanceGoods VALUES(932,93,23);
CREATE TABLE IF NOT EXISTS "ServiceHistoryDetails" (
  serviceHistoryDetailsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  serviceHistoryId INTEGER DEFAULT NULL,
  goodsId INTEGER DEFAULT NULL,
  FOREIGN KEY (serviceHistoryId) REFERENCES ServiceHistory(serviceHistoryId), -- แก้เป็น ServiceHistory
  FOREIGN KEY (goodsId) REFERENCES Goods(goodsId)
);
INSERT INTO ServiceHistoryDetails VALUES(1,1,18);
INSERT INTO ServiceHistoryDetails VALUES(2,2,18);
INSERT INTO ServiceHistoryDetails VALUES(4,3,22);
INSERT INTO ServiceHistoryDetails VALUES(6,3,21);
INSERT INTO ServiceHistoryDetails VALUES(7,3,18);
INSERT INTO ServiceHistoryDetails VALUES(8,3,23);
INSERT INTO ServiceHistoryDetails VALUES(9,4,18);
INSERT INTO ServiceHistoryDetails VALUES(10,5,6);
INSERT INTO ServiceHistoryDetails VALUES(11,5,18);
INSERT INTO ServiceHistoryDetails VALUES(12,5,20);
INSERT INTO ServiceHistoryDetails VALUES(13,5,21);
INSERT INTO ServiceHistoryDetails VALUES(14,5,22);
INSERT INTO ServiceHistoryDetails VALUES(15,5,23);
INSERT INTO ServiceHistoryDetails VALUES(16,6,18);
INSERT INTO ServiceHistoryDetails VALUES(17,6,8);
INSERT INTO ServiceHistoryDetails VALUES(18,6,6);
INSERT INTO ServiceHistoryDetails VALUES(19,6,7);
INSERT INTO ServiceHistoryDetails VALUES(20,7,18);
INSERT INTO ServiceHistoryDetails VALUES(21,7,6);
INSERT INTO ServiceHistoryDetails VALUES(22,7,7);
INSERT INTO ServiceHistoryDetails VALUES(23,8,18);
INSERT INTO ServiceHistoryDetails VALUES(24,8,5);
INSERT INTO ServiceHistoryDetails VALUES(25,9,18);
INSERT INTO ServiceHistoryDetails VALUES(26,10,5);
INSERT INTO ServiceHistoryDetails VALUES(27,10,8);
INSERT INTO ServiceHistoryDetails VALUES(28,10,12);
INSERT INTO ServiceHistoryDetails VALUES(29,10,10);
INSERT INTO ServiceHistoryDetails VALUES(30,10,11);
INSERT INTO ServiceHistoryDetails VALUES(31,10,15);
INSERT INTO ServiceHistoryDetails VALUES(32,10,16);
INSERT INTO ServiceHistoryDetails VALUES(33,10,13);
INSERT INTO ServiceHistoryDetails VALUES(34,10,18);
INSERT INTO ServiceHistoryDetails VALUES(35,10,9);
INSERT INTO ServiceHistoryDetails VALUES(36,10,17);
INSERT INTO ServiceHistoryDetails VALUES(37,10,14);
INSERT INTO ServiceHistoryDetails VALUES(38,11,5);
INSERT INTO ServiceHistoryDetails VALUES(39,11,13);
INSERT INTO ServiceHistoryDetails VALUES(40,11,11);
INSERT INTO ServiceHistoryDetails VALUES(41,11,12);
INSERT INTO ServiceHistoryDetails VALUES(42,11,16);
INSERT INTO ServiceHistoryDetails VALUES(43,11,17);
INSERT INTO ServiceHistoryDetails VALUES(44,11,14);
INSERT INTO ServiceHistoryDetails VALUES(45,11,20);
INSERT INTO ServiceHistoryDetails VALUES(46,11,21);
INSERT INTO ServiceHistoryDetails VALUES(47,11,22);
INSERT INTO ServiceHistoryDetails VALUES(48,11,23);
INSERT INTO ServiceHistoryDetails VALUES(49,11,31);
INSERT INTO ServiceHistoryDetails VALUES(50,11,10);
INSERT INTO ServiceHistoryDetails VALUES(51,11,18);
INSERT INTO ServiceHistoryDetails VALUES(52,11,15);
INSERT INTO ServiceHistoryDetails VALUES(53,12,8);
INSERT INTO ServiceHistoryDetails VALUES(54,12,18);
INSERT INTO ServiceHistoryDetails VALUES(55,13,6);
INSERT INTO ServiceHistoryDetails VALUES(56,13,20);
INSERT INTO ServiceHistoryDetails VALUES(57,13,23);
INSERT INTO ServiceHistoryDetails VALUES(58,13,21);
INSERT INTO ServiceHistoryDetails VALUES(59,13,22);
INSERT INTO ServiceHistoryDetails VALUES(60,13,18);
INSERT INTO ServiceHistoryDetails VALUES(61,14,6);
INSERT INTO ServiceHistoryDetails VALUES(62,14,7);
INSERT INTO ServiceHistoryDetails VALUES(63,14,18);
INSERT INTO ServiceHistoryDetails VALUES(64,15,6);
INSERT INTO ServiceHistoryDetails VALUES(65,15,18);
INSERT INTO ServiceHistoryDetails VALUES(66,15,23);
INSERT INTO ServiceHistoryDetails VALUES(67,15,21);
INSERT INTO ServiceHistoryDetails VALUES(68,15,22);
INSERT INTO ServiceHistoryDetails VALUES(69,15,20);
INSERT INTO ServiceHistoryDetails VALUES(70,16,18);
INSERT INTO ServiceHistoryDetails VALUES(71,17,18);
INSERT INTO ServiceHistoryDetails VALUES(72,18,5);
INSERT INTO ServiceHistoryDetails VALUES(73,18,22);
INSERT INTO ServiceHistoryDetails VALUES(74,18,23);
INSERT INTO ServiceHistoryDetails VALUES(75,18,21);
INSERT INTO ServiceHistoryDetails VALUES(76,18,18);
INSERT INTO ServiceHistoryDetails VALUES(77,18,20);
INSERT INTO ServiceHistoryDetails VALUES(78,19,5);
INSERT INTO ServiceHistoryDetails VALUES(79,19,6);
INSERT INTO ServiceHistoryDetails VALUES(80,19,7);
INSERT INTO ServiceHistoryDetails VALUES(81,19,18);
INSERT INTO ServiceHistoryDetails VALUES(82,20,8);
INSERT INTO ServiceHistoryDetails VALUES(83,20,18);
INSERT INTO ServiceHistoryDetails VALUES(84,21,18);
INSERT INTO ServiceHistoryDetails VALUES(85,22,8);
INSERT INTO ServiceHistoryDetails VALUES(86,22,18);
INSERT INTO ServiceHistoryDetails VALUES(87,23,18);
INSERT INTO ServiceHistoryDetails VALUES(88,24,18);
INSERT INTO ServiceHistoryDetails VALUES(89,25,18);
INSERT INTO ServiceHistoryDetails VALUES(90,26,18);
INSERT INTO ServiceHistoryDetails VALUES(91,27,18);
INSERT INTO ServiceHistoryDetails VALUES(92,28,18);
INSERT INTO ServiceHistoryDetails VALUES(93,29,8);
INSERT INTO ServiceHistoryDetails VALUES(94,29,18);
INSERT INTO ServiceHistoryDetails VALUES(95,30,6);
INSERT INTO ServiceHistoryDetails VALUES(96,30,7);
INSERT INTO ServiceHistoryDetails VALUES(97,30,8);
INSERT INTO ServiceHistoryDetails VALUES(98,30,18);
INSERT INTO ServiceHistoryDetails VALUES(99,31,6);
INSERT INTO ServiceHistoryDetails VALUES(100,31,7);
INSERT INTO ServiceHistoryDetails VALUES(101,31,18);
INSERT INTO ServiceHistoryDetails VALUES(102,32,8);
INSERT INTO ServiceHistoryDetails VALUES(103,32,18);
INSERT INTO ServiceHistoryDetails VALUES(104,33,6);
INSERT INTO ServiceHistoryDetails VALUES(105,33,7);
INSERT INTO ServiceHistoryDetails VALUES(106,33,8);
INSERT INTO ServiceHistoryDetails VALUES(107,33,18);
INSERT INTO ServiceHistoryDetails VALUES(108,34,8);
INSERT INTO ServiceHistoryDetails VALUES(109,34,18);
INSERT INTO ServiceHistoryDetails VALUES(110,35,5);
INSERT INTO ServiceHistoryDetails VALUES(111,35,22);
INSERT INTO ServiceHistoryDetails VALUES(112,35,20);
INSERT INTO ServiceHistoryDetails VALUES(113,35,21);
INSERT INTO ServiceHistoryDetails VALUES(114,35,18);
INSERT INTO ServiceHistoryDetails VALUES(115,35,23);
INSERT INTO ServiceHistoryDetails VALUES(116,36,8);
INSERT INTO ServiceHistoryDetails VALUES(117,36,18);
INSERT INTO ServiceHistoryDetails VALUES(118,37,5);
INSERT INTO ServiceHistoryDetails VALUES(119,37,18);
INSERT INTO ServiceHistoryDetails VALUES(120,37,23);
INSERT INTO ServiceHistoryDetails VALUES(121,37,20);
INSERT INTO ServiceHistoryDetails VALUES(122,37,22);
INSERT INTO ServiceHistoryDetails VALUES(123,37,21);
INSERT INTO ServiceHistoryDetails VALUES(124,38,6);
INSERT INTO ServiceHistoryDetails VALUES(125,38,7);
INSERT INTO ServiceHistoryDetails VALUES(126,38,18);
INSERT INTO ServiceHistoryDetails VALUES(127,39,18);
INSERT INTO ServiceHistoryDetails VALUES(128,40,18);
INSERT INTO ServiceHistoryDetails VALUES(129,41,7);
INSERT INTO ServiceHistoryDetails VALUES(130,41,6);
INSERT INTO ServiceHistoryDetails VALUES(131,41,18);
INSERT INTO ServiceHistoryDetails VALUES(132,42,18);
INSERT INTO ServiceHistoryDetails VALUES(133,43,5);
INSERT INTO ServiceHistoryDetails VALUES(134,43,18);
INSERT INTO ServiceHistoryDetails VALUES(135,43,20);
INSERT INTO ServiceHistoryDetails VALUES(136,43,21);
INSERT INTO ServiceHistoryDetails VALUES(137,43,22);
INSERT INTO ServiceHistoryDetails VALUES(138,43,23);
INSERT INTO ServiceHistoryDetails VALUES(139,44,18);
INSERT INTO ServiceHistoryDetails VALUES(140,45,18);
INSERT INTO ServiceHistoryDetails VALUES(141,45,6);
INSERT INTO ServiceHistoryDetails VALUES(142,45,7);
INSERT INTO ServiceHistoryDetails VALUES(143,46,5);
INSERT INTO ServiceHistoryDetails VALUES(144,46,18);
INSERT INTO ServiceHistoryDetails VALUES(145,46,23);
INSERT INTO ServiceHistoryDetails VALUES(146,46,21);
INSERT INTO ServiceHistoryDetails VALUES(147,46,22);
INSERT INTO ServiceHistoryDetails VALUES(148,46,20);
INSERT INTO ServiceHistoryDetails VALUES(149,47,5);
INSERT INTO ServiceHistoryDetails VALUES(150,47,18);
INSERT INTO ServiceHistoryDetails VALUES(151,47,23);
INSERT INTO ServiceHistoryDetails VALUES(152,47,21);
INSERT INTO ServiceHistoryDetails VALUES(153,47,22);
INSERT INTO ServiceHistoryDetails VALUES(154,47,20);
INSERT INTO ServiceHistoryDetails VALUES(155,48,18);
INSERT INTO ServiceHistoryDetails VALUES(156,48,20);
INSERT INTO ServiceHistoryDetails VALUES(157,48,21);
INSERT INTO ServiceHistoryDetails VALUES(158,48,22);
INSERT INTO ServiceHistoryDetails VALUES(159,48,23);
CREATE TABLE IF NOT EXISTS "ServiceHistory" (
    serviceHistoryId INTEGER PRIMARY KEY,
    customerId INTEGER,
    caseCategory TEXT,
    caseSummary TEXT,
    caseDetails TEXT,
    slot INT,
    status INT,
    caseStartDatetime TEXT,
    caseClosedDatetime TEXT,
    handledByEmployeeId INTEGER,
    centerId INTEGER,
    regId INTEGER,
    FOREIGN KEY (customerId) REFERENCES Customers(customerId),
    FOREIGN KEY (centerId) REFERENCES ServiceBranch(centerId),
    FOREIGN KEY (regId) REFERENCES RegistrationNumber(regId)
);
INSERT INTO ServiceHistory VALUES(1,25,'เช็คระยะ',NULL,NULL,2,0,'2025-03-06',NULL,NULL,1,21);
INSERT INTO ServiceHistory VALUES(2,26,'เช็คระยะ',NULL,NULL,2,0,'2025-03-06',NULL,NULL,1,22);
INSERT INTO ServiceHistory VALUES(4,27,'เช็คระยะ','15000',NULL,2,0,'2025-03-06',NULL,NULL,2,23);
INSERT INTO ServiceHistory VALUES(6,NULL,'เช็คระยะ','90000',NULL,2,0,'2025-03-06',NULL,NULL,3,27);
INSERT INTO ServiceHistory VALUES(7,NULL,'เช็คระยะ','45000',NULL,2,0,'2025-03-06',NULL,NULL,3,27);
INSERT INTO ServiceHistory VALUES(8,NULL,'เช็คระยะ','75000',NULL,2,0,'2025-03-06',NULL,NULL,3,27);
INSERT INTO ServiceHistory VALUES(9,NULL,'เช็คระยะ','15000',NULL,2,0,'2025-03-07',NULL,NULL,2,27);
INSERT INTO ServiceHistory VALUES(10,28,'เช็คระยะ','150000',NULL,2,0,'2025-03-07',NULL,NULL,1,28);
INSERT INTO ServiceHistory VALUES(11,NULL,'เช็คระยะ','165000',NULL,3,0,'2025-03-07',NULL,NULL,2,28);
INSERT INTO ServiceHistory VALUES(12,NULL,'เช็คระยะ','240000',NULL,1,0,'2025-03-07',NULL,NULL,2,29);
INSERT INTO ServiceHistory VALUES(13,NULL,'เช็คระยะ','150000',NULL,2,0,'2025-03-07',NULL,NULL,3,28);
INSERT INTO ServiceHistory VALUES(14,NULL,'เช็คระยะ','135000',NULL,2,0,'2025-03-07',NULL,NULL,3,30);
INSERT INTO ServiceHistory VALUES(15,NULL,'เช็คระยะ','90000',NULL,2,0,'2025-03-07',NULL,NULL,4,28);
INSERT INTO ServiceHistory VALUES(16,29,'เช็คระยะ','105000',NULL,2,0,'2025-03-07',NULL,NULL,4,31);
INSERT INTO ServiceHistory VALUES(17,30,'เช็คระยะ','105000',NULL,2,0,'2025-03-07',NULL,NULL,4,32);
INSERT INTO ServiceHistory VALUES(18,31,'เช็คระยะ','135000',NULL,2,0,'2025-03-07',NULL,NULL,4,33);
INSERT INTO ServiceHistory VALUES(19,32,'เช็คระยะ','225000',NULL,3,0,'2025-03-07',NULL,NULL,4,34);
INSERT INTO ServiceHistory VALUES(20,33,'เช็คระยะ','60000',NULL,1,0,'2025-03-07',NULL,NULL,4,35);
INSERT INTO ServiceHistory VALUES(21,NULL,'เช็คระยะ','15000',NULL,3,0,'2025-03-07',NULL,NULL,4,NULL);
INSERT INTO ServiceHistory VALUES(22,NULL,'เช็คระยะ','210000',NULL,2,0,'2025-03-07',NULL,NULL,3,NULL);
INSERT INTO ServiceHistory VALUES(23,NULL,'เช็คระยะ','15000',NULL,2,0,'2025-03-07',NULL,NULL,3,NULL);
INSERT INTO ServiceHistory VALUES(24,NULL,'เช็คระยะ','15000',NULL,2,0,'2025-03-07',NULL,NULL,3,NULL);
INSERT INTO ServiceHistory VALUES(25,NULL,'เช็คระยะ','15000',NULL,2,0,'2025-03-07',NULL,NULL,3,NULL);
INSERT INTO ServiceHistory VALUES(26,NULL,'เช็คระยะ','15000',NULL,2,0,'2025-03-07',NULL,NULL,3,NULL);
INSERT INTO ServiceHistory VALUES(27,NULL,'เช็คระยะ','15000',NULL,1,0,'2025-03-07',NULL,NULL,4,NULL);
INSERT INTO ServiceHistory VALUES(28,32,'เช็คระยะ',NULL,NULL,2,0,'2025-03-07',NULL,15000,4,37);
INSERT INTO ServiceHistory VALUES(29,32,'เช็คระยะ',NULL,NULL,2,0,'2025-03-07',NULL,30000,3,38);
INSERT INTO ServiceHistory VALUES(30,32,'เช็คระยะ','90000',NULL,1,0,'2025-03-07',NULL,NULL,4,NULL);
INSERT INTO ServiceHistory VALUES(31,32,'เช็คระยะ','45000',NULL,3,0,'2025-03-07',NULL,NULL,4,36);
INSERT INTO ServiceHistory VALUES(32,32,'เช็คระยะ','240000',NULL,3,0,'2025-03-07',NULL,NULL,3,36);
INSERT INTO ServiceHistory VALUES(33,32,'เช็คระยะ','180000',NULL,3,0,'2025-03-29',NULL,NULL,3,36);
INSERT INTO ServiceHistory VALUES(34,32,'เช็คระยะ','120000',NULL,2,0,'2025-03-07',NULL,NULL,3,36);
INSERT INTO ServiceHistory VALUES(35,32,'เช็คระยะ','15000',NULL,2,0,'2025-03-07',NULL,NULL,4,34);
INSERT INTO ServiceHistory VALUES(36,32,'เช็คระยะ','120000',NULL,3,0,'2025-03-31',NULL,NULL,4,36);
INSERT INTO ServiceHistory VALUES(37,34,'เช็คระยะ','15000',NULL,2,0,'2025-04-05',NULL,NULL,4,39);
INSERT INTO ServiceHistory VALUES(38,32,'เช็คระยะ','45000',NULL,3,0,'2025-04-05',NULL,NULL,4,40);
INSERT INTO ServiceHistory VALUES(39,32,'เช็คระยะ','15000',NULL,3,0,'2025-03-23',NULL,NULL,4,40);
INSERT INTO ServiceHistory VALUES(40,32,'เช็คระยะ','15000',NULL,3,0,'2025-03-29',NULL,NULL,2,40);
INSERT INTO ServiceHistory VALUES(41,32,'เช็คระยะ','45000',NULL,3,0,'2025-03-19',NULL,NULL,3,40);
INSERT INTO ServiceHistory VALUES(42,35,'เช็คระยะ','15000',NULL,3,0,'2025-03-10',NULL,NULL,3,41);
INSERT INTO ServiceHistory VALUES(43,25,'เช็คระยะ','15000',NULL,1,0,'2025-03-08',NULL,NULL,1,21);
INSERT INTO ServiceHistory VALUES(44,25,'เช็คระยะ','15000',NULL,1,0,'2025-03-09',NULL,NULL,1,27);
INSERT INTO ServiceHistory VALUES(45,36,'เช็คระยะ','135000',NULL,1,0,'2025-03-08',NULL,NULL,3,42);
INSERT INTO ServiceHistory VALUES(46,37,'เช็คระยะ','15000',NULL,1,0,'2025-03-08',NULL,NULL,1,43);
INSERT INTO ServiceHistory VALUES(47,37,'เช็คระยะ','15000',NULL,3,0,'2025-03-15',NULL,NULL,3,44);
INSERT INTO ServiceHistory VALUES(48,37,'เช็คระยะ','210000',NULL,3,0,'2025-03-07',NULL,NULL,2,43);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('ServiceBranch',4);
INSERT INTO sqlite_sequence VALUES('Employees',8);
INSERT INTO sqlite_sequence VALUES('EmployeeAccount',8);
INSERT INTO sqlite_sequence VALUES('Goods',38);
INSERT INTO sqlite_sequence VALUES('Promotion',5);
INSERT INTO sqlite_sequence VALUES('Customers',37);
INSERT INTO sqlite_sequence VALUES('Maintenance',208);
INSERT INTO sqlite_sequence VALUES('Cars',6);
INSERT INTO sqlite_sequence VALUES('RegistrationNumber',44);
INSERT INTO sqlite_sequence VALUES('MaintenanceGoods',932);
INSERT INTO sqlite_sequence VALUES('ServiceHistoryDetails',159);
CREATE INDEX idx_centerId ON Employees(centerId);
CREATE INDEX idx_employeeId ON EmployeeAccount(employeeId);
CREATE INDEX idx_carId ON RegistrationNumber(carId);
CREATE INDEX idx_customerId ON RegistrationNumber(customerId);
COMMIT;
