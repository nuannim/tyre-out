SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `Cars` (
  `carId` int(11) NOT NULL,
  `carModel` varchar(255) NOT NULL,
  `carYear` int(11) NOT NULL,
  `carGrade` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `Cars`
  MODIFY `carId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

ALTER TABLE `Cars`
  ADD PRIMARY KEY (`carId`);

INSERT INTO `Cars` (`carId`, `carModel`, `carYear`, `carGrade`) VALUES
(1, 'Ranger', 2024, 'Raptor'),
(2, 'Ranger', 2024, 'Stormtrak'),
(3, 'Ranger', 2024, 'Wildtrak'),
(4, 'Ranger', 2024, 'Sport'),
(5, 'Ranger', 2024, 'XLS'),
(6, 'Ranger', 2024, 'XL+'),
(7, 'Ranger', 2024, 'XL'),
(8, 'Ranger', 2021, 'Wildtrak'),
(9, 'Ranger', 2021, 'Sport'),
(10, 'Ranger', 2021, 'XLS'),
(11, 'Ranger', 2021, 'XL+'),
(12, 'Ranger', 2021, 'XL'),
(13, 'Everest', 2023, 'Platinum'),
(14, 'Everest', 2023, 'Wildtrak'),
(15, 'Everest', 2023, 'Titanium +'),
(16, 'Everest', 2023, 'Sport +'),
(17, 'Everest', 2023, 'Sport'),
(18, 'Everest', 2023, 'Trend'),
(19, 'Everest', 2020, 'Platinum'),
(20, 'Everest', 2020, 'Wildtrak'),
(21, 'Everest', 2020, 'Titanium +'),
(22, 'Everest', 2020, 'Sport +'),
(23, 'Everest', 2020, 'Sport'),
(24, 'Everest', 2020, 'Trend');



CREATE TABLE `Customers` (
  `customerId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `customerBirthDate` date DEFAULT NULL,
  `firstServiceDate` date DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `lineId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Customers`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customerId`);
-- 

CREATE TABLE `EmployeeAccount` (
  `employeeAccountId` int(11) NOT NULL,
  `employeeId` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `EmployeeAccount` (`employeeAccountId`, `employeeId`, `password`) VALUES
(1, 1, 'e00ef257342422ec13dd76253d13a8894cb9b3bc6870a38d844b4c765ae3d911'),
(2, 2, 'd07f74881ec1a433dff084cede8d0d507c1df2997ad2696dd79b0669ba4c6835'),
(3, 3, '92bdc41f46b50264ceb6156283add637853b503ddef614c448258764db572112'),
(4, 4, 'fa59d3bf775f3c3f6a4d68f25f67b7d85f0541e357680f69ea8ecf4aac36c633'),
(5, 5, 'c9662333d7f7d7f7b79a66d642388c8d62702a0a8ce3e4930716ef68ba8cc2d4'),
(6, 6, 'bf654cb5812dc2d06da7ec7746d4be48031029cfb9dffba26970448f8d154ce5'),
(7, 7, '187bed1bc19b259d1cdb6df4cdf766b68d48c07a63163f3c73f27b09ecb32d34'),
(8, 8, '32eef54b57beb25efe8ba4f04e18c8bb608d5d82882e1a503aedbce9e50b670c');

ALTER TABLE `EmployeeAccount`
  MODIFY `employeeAccountId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `EmployeeAccount`
  ADD CONSTRAINT `EmployeeAccount_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `Employees` (`employeeId`);

ALTER TABLE `EmployeeAccount`
  ADD PRIMARY KEY (`employeeAccountId`),
  ADD KEY `employeeId` (`employeeId`);

-- 
CREATE TABLE `Employees` (
  `employeeId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `centerId` int(11) DEFAULT NULL,
  `empBirthDate` date DEFAULT NULL,
  `hiredDate` date DEFAULT NULL,
  `terminationDate` date DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `lineId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `Employees` (`employeeId`, `firstName`, `lastName`, `centerId`, `empBirthDate`, `hiredDate`, `terminationDate`, `role`, `phoneNumber`, `email`, `lineId`) VALUES
(1, 'Vitita', 'Srasreesom', 1, '2004-12-15', '2019-10-26', '2025-10-27', 'DCRC', '809999999', 'vitita@gmail.com', 'kaning.id'),
(2, 'Manichar', 'Aimdilokwong', 1, '1999-11-07', '2019-10-26', '2025-10-27', 'SA', '819999999', 'manichar@gmail.com', 'marmink.id'),
(3, 'Penpichaya', 'Boonsaner', 2, '2003-02-27', '2023-04-02', '2029-04-02', 'DCRC', '829999999', 'penpichaya@gmail.com', 'nana.id'),
(4, 'Phitchayapha', 'Supanya', 2, '2002-11-01', '2019-10-26', '2025-10-27', 'SA', '839999999', 'phitchayapha@gmail.com', 'nenie.id'),
(5, 'Sita', 'Teeradechsakul', 3, '2003-06-25', '2019-10-26', '2025-10-27', 'DCRC', '849999999', 'sita@gmail.com', 'sita.id'),
(6, 'Thidatip', 'Jiraphan', 3, '2008-03-04', '2024-10-26', '2030-10-26', 'SA', '859999999', 'thidatip@gmail.com', 'kwan.id'),
(7, 'Salinthip', 'Panaapichon', 4, '2002-07-20', '2024-10-26', '2030-10-26', 'DCRC', '869999999', 'salinthip@gmail.com', 'lingling.id'),
(8, 'Rapeephan', 'Chaemcharoen', 4, '2004-09-16', '2019-10-26', '2025-10-27', 'SA', '879999999', 'rapeephan@gmail.com', 'mei.id');


ALTER TABLE `Employees`
  MODIFY `employeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `Employees`
  ADD CONSTRAINT `Employees_ibfk_1` FOREIGN KEY (`centerId`) REFERENCES `ServiceBranch` (`centerId`);
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`employeeId`),
  ADD KEY `centerId` (`centerId`);
--
CREATE TABLE `Goods` (
  `goodsId` int(11) NOT NULL,
  `goodsBrand` varchar(255) DEFAULT NULL,
  `goodsName` varchar(255) NOT NULL,
  `goodsDescription` text DEFAULT NULL,
  `goodsPrice` decimal(10,2) DEFAULT NULL,
  `inStock` int(11) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `goodsPhotoURL` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `Goods`
  MODIFY `goodsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
ALTER TABLE `Goods`
  ADD PRIMARY KEY (`goodsId`);
INSERT INTO `Goods` (`goodsId`, `goodsBrand`, `goodsName`, `goodsDescription`, `goodsPrice`, `inStock`, `isActive`, `goodsPhotoURL`) VALUES
(1, 'michelin', 'LTX Trail', '255/70R16', 5150.00, 96, 1, 'https://dxm.contentcenter.michelin.com/api/wedia/dam/transform/b98rpyxf61b4qd117rowfn1dby/4w-502_3528700124194_tire_michelin_ltx-trail-st_265-slash-65-r17-112t_a_main_5-quarterzoom_nopad.webp?t=resize&height=500'),
(2, 'michelin', 'LTX Trail', '265/65R17', 5850.00, 68, 1, 'https://dxm.contentcenter.michelin.com/api/wedia/dam/transform/b98rpyxf61b4qd117rowfn1dby/4w-502_3528700124194_tire_michelin_ltx-trail-st_265-slash-65-r17-112t_a_main_5-quarterzoom_nopad.webp?t=resize&height=500'),
(3, 'michelin', 'Primacy SUV+', '265/60R18', 7990.00, 52, 1, 'https://www.auto1.co.th/_next/image?url=https%3A%2F%2Fpim.thaiwatsadu.com%2FTWDPIM%2FAT1PIM%2Fweb%2FThumbnail%2FImage%2F1100%2F60364156.jpg&w=1920&q=75'),
(4, 'michelin', 'Primacy SUV+', '275/55R20', 7990.00, 59, 1, 'https://www.auto1.co.th/_next/image?url=https%3A%2F%2Fpim.thaiwatsadu.com%2FTWDPIM%2FAT1PIM%2Fweb%2FThumbnail%2FImage%2F1100%2F60364156.jpg&w=1920&q=75');


CREATE TABLE `Promotion` (
  `promotionId` int(11) NOT NULL,
  `promotionName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `promotionDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `promotionPhotoURL` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `Promotion`
  MODIFY `promotionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

INSERT INTO `Promotion` (`promotionId`, `promotionName`, `promotionDescription`, `isActive`, `promotionPhotoURL`) VALUES
(1, 'Michelin Madness', 'ลดสูงสุด 15% เมื่อซื้อยาง Michelin ครบ 4 เส้น!', 1, 'https://i.pinimg.com/736x/41/d6/22/41d622be1fe5bdf81459d9e92d430147.jpg'),
(2, 'ซื้อ 3 แถม 1', 'ซื้อยาง Michelin Primacy SUV+ 3 เส้น รับฟรีอีก 1 เส้น', 1, 'https://i.pinimg.com/736x/49/27/7c/49277c8da39f3d33d7cc68f6d5d58551.jpg'),
(3, 'ฟรีค่าติดตั้ง', 'เมื่อลูกค้าซื้อยาง Michelin LTX Trail ครบ 4 เส้น', 1, 'https://i.pinimg.com/736x/81/4f/03/814f03ed110e2a5eafa91781633f81c9.jpg'),
(4, 'เช็กช่วงล่างฟรี', 'ซื้อยาง Michelin รุ่นใดก็ได้ ครบ 2 เส้นขึ้นไป', 1, 'https://i.pinimg.com/736x/a4/26/c5/a426c5c893bc72f363d7d9f0cd2ac9cf.jpg'),
(5, 'โปรเดือนแห่งความรัก', 'ส่วนลด 10% ทุกเส้น และพิเศษ! แถมแฟน 1 คนสำหรับคนโสด', 1, 'https://i.pinimg.com/736x/02/e0/41/02e0417592849e59030e83a326d81036.jpg');
ALTER TABLE `Promotion`
  ADD PRIMARY KEY (`promotionId`);


CREATE TABLE `RegistrationNumber` (
  `regId` int(11) NOT NULL,
  `carId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `RegistrationNumber`
  MODIFY `regId` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `RegistrationNumber`
  ADD CONSTRAINT `RegistrationNumber_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `Cars` (`carId`),
  ADD CONSTRAINT `RegistrationNumber_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`customerId`);

ALTER TABLE `RegistrationNumber`
  ADD PRIMARY KEY (`regId`),
  ADD KEY `carId` (`carId`),
  ADD KEY `customerId` (`customerId`);
-- 
CREATE TABLE `ServiceBranch` (
  `centerId` int(11) NOT NULL,
  `centerName` varchar(255) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `lineId` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `subdistrict` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `openTime` time DEFAULT NULL,
  `closedTime` time DEFAULT NULL,
  `branchPhotoURL` text DEFAULT NULL,
  `maxslot` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `ServiceBranch`
  MODIFY `centerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

INSERT INTO `ServiceBranch` (`centerId`, `centerName`, `telephone`, `email`, `lineId`, `address`, `subdistrict`, `district`, `province`, `postcode`, `openTime`, `closedTime`, `branchPhotoURL`, `maxslot`) VALUES
(1, 'Rama 4', '027136000', NULL, 'ford1', '4330 Rama IV Rd', 'Phra Khanong', 'Khlong Toei', 'Bangkok', '10110', '08:00:00', '17:00:00', 'https://www.fordrma.com/wp-content/uploads/2024/04/Ford-RMA-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%A1-4.jpg', 2),
(2, 'Kanlapaphruek Sathorn', '024161555', NULL, 'ford2', '34/9 Kanlapaphruek Rd', 'Bang Khun Thian', 'Chom Thong', 'Bangkok', '10150', '08:00:00', '18:00:00', 'https://www.fordrma.com/wp-content/uploads/2024/04/1-Ford-%E0%B8%81%E0%B8%B1%E0%B8%A5%E0%B8%9B%E0%B8%9E%E0%B8%A4%E0%B8%81%E0%B8%A9%E0%B9%8C.jpg', 1),
(3, 'Hua Mak Ladprao', '027363888', NULL, 'ford3', '3563/3 Ramkhamhaeng Rd', 'Hua Mak', 'Bang Kapi', 'Bangkok', '10240', '08:00:00', '17:00:00', 'https://www.fordrma.com/wp-content/uploads/2023/01/Ford-RMA-%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%81.jpg', 1),
(4, 'Ratchaphruek Rama 5 Nonthaburi', '024326599', NULL, 'ford4', '9, 99 Nakhon In Rd', 'Bang Khun Kong', 'Bang Kruai', 'Nonthaburi', '11130', '08:00:00', '18:00:00', 'https://i.ytimg.com/vi/wDOHsdFjc48/maxresdefault.jpg', 1);
ALTER TABLE `ServiceBranch`
  ADD PRIMARY KEY (`centerId`);



CREATE TABLE `ServiceHistory` (
  `serviceHistoryId` int(11) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `caseCategory` varchar(255) DEFAULT NULL,
  `caseSummary` text DEFAULT NULL,
  `caseDetails` text DEFAULT NULL,
  `slot` int(11) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `caseStartDatetime` datetime DEFAULT NULL,
  `caseClosedDatetime` datetime DEFAULT NULL,
  `handledByEmployeeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `ServiceHistory`
  MODIFY `serviceHistoryId` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `ServiceHistory`
  ADD CONSTRAINT `ServiceHistory_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`customerId`),
  ADD CONSTRAINT `ServiceHistory_ibfk_2` FOREIGN KEY (`handledByEmployeeId`) REFERENCES `Employees` (`employeeId`);

ALTER TABLE `ServiceHistory`
  ADD PRIMARY KEY (`serviceHistoryId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `handledByEmployeeId` (`handledByEmployeeId`);
-- 



CREATE TABLE `ServiceHistoryDetails` (
  `serviceHistoryDetailsId` int(11) NOT NULL,
  `serviceHistoryId` int(11) DEFAULT NULL,
  `goodsId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `ServiceHistoryDetails`
  MODIFY `serviceHistoryDetailsId` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `ServiceHistoryDetails`
  ADD CONSTRAINT `ServiceHistoryDetails_ibfk_1` FOREIGN KEY (`serviceHistoryId`) REFERENCES `ServiceHistory` (`serviceHistoryId`),
  ADD CONSTRAINT `ServiceHistoryDetails_ibfk_2` FOREIGN KEY (`goodsId`) REFERENCES `Goods` (`goodsId`);
COMMIT;

ALTER TABLE `ServiceHistoryDetails`
  ADD PRIMARY KEY (`serviceHistoryDetailsId`),
  ADD KEY `serviceHistoryId` (`serviceHistoryId`),
  ADD KEY `goodsId` (`goodsId`);

------------------------------
-- sqlite3
------------------------------


BEGIN TRANSACTION;

CREATE TABLE Cars (
  carId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  carModel TEXT NOT NULL,
  carYear INTEGER NOT NULL,
  carGrade TEXT DEFAULT NULL
);

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

CREATE TABLE EmployeeAccount (
  employeeAccountId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  employeeId INTEGER DEFAULT NULL,
  password TEXT NOT NULL,
  FOREIGN KEY (employeeId) REFERENCES Employees(employeeId)
);


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

CREATE TABLE Promotion (
  promotionId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  promotionName TEXT NOT NULL,
  promotionDescription TEXT DEFAULT NULL,
  isActive INTEGER DEFAULT NULL,
  promotionPhotoURL TEXT DEFAULT NULL
);


CREATE TABLE RegistrationNumber (
  regId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  carId INTEGER DEFAULT NULL,
  customerId INTEGER DEFAULT NULL,
  mileage INTEGER DEFAULT NULL,
  FOREIGN KEY (carId) REFERENCES Cars(carId),
  FOREIGN KEY (customerId) REFERENCES Customers(customerId)
);

CREATE TABLE ServiceHistory (
  serviceHistoryId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  customerId INTEGER DEFAULT NULL,
  caseCategory TEXT DEFAULT NULL,
  caseSummary TEXT DEFAULT NULL,
  caseDetails TEXT DEFAULT NULL,
  slot INTEGER DEFAULT NULL,
  status TEXT DEFAULT NULL,
  caseStartDatetime TEXT DEFAULT NULL, 
  caseClosedDatetime TEXT DEFAULT NULL,
  handledByEmployeeId INTEGER DEFAULT NULL,
  FOREIGN KEY (customerId) REFERENCES Customers(customerId),
  FOREIGN KEY (handledByEmployeeId) REFERENCES Employees(employeeId)
);

CREATE TABLE ServiceHistoryDetails (
  serviceHistoryDetailsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  serviceHistoryId INTEGER DEFAULT NULL,
  goodsId INTEGER DEFAULT NULL,
  FOREIGN KEY (serviceHistoryId) REFERENCES ServiceHistory(serviceHistoryId),
  FOREIGN KEY (goodsId) REFERENCES Goods(goodsId)
);


CREATE INDEX idx_centerId ON Employees(centerId);
CREATE INDEX idx_employeeId ON EmployeeAccount(employeeId);
CREATE INDEX idx_carId ON RegistrationNumber(carId);
CREATE INDEX idx_customerId ON RegistrationNumber(customerId);


INSERT INTO Cars (carId, carModel, carYear, carGrade) VALUES
(1, 'Ranger', 2024, 'Raptor'),
(2, 'Ranger', 2024, 'Stormtrak'),
(3, 'Ranger', 2024, 'Wildtrak'),
(4, 'Ranger', 2024, 'Sport'),
(5, 'Ranger', 2024, 'XLS'),
(6, 'Ranger', 2024, 'XL+'),
(7, 'Ranger', 2024, 'XL'),
(8, 'Ranger', 2021, 'Wildtrak'),
(9, 'Ranger', 2021, 'Sport'),
(10, 'Ranger', 2021, 'XLS'),
(11, 'Ranger', 2021, 'XL+'),
(12, 'Ranger', 2021, 'XL'),
(13, 'Everest', 2023, 'Platinum'),
(14, 'Everest', 2023, 'Wildtrak'),
(15, 'Everest', 2023, 'Titanium +'),
(16, 'Everest', 2023, 'Sport +'),
(17, 'Everest', 2023, 'Sport'),
(18, 'Everest', 2023, 'Trend'),
(19, 'Everest', 2020, 'Platinum'),
(20, 'Everest', 2020, 'Wildtrak'),
(21, 'Everest', 2020, 'Titanium +'),
(22, 'Everest', 2020, 'Sport +'),
(23, 'Everest', 2020, 'Sport'),
(24, 'Everest', 2020, 'Trend');


INSERT INTO ServiceBranch (centerId, centerName, telephone, email, lineId, address, subdistrict, district, province, postcode, openTime, closedTime, branchPhotoURL, maxslot) VALUES
(1, 'Rama 4', '027136000', NULL, 'ford1', '4330 Rama IV Rd', 'Phra Khanong', 'Khlong Toei', 'Bangkok', '10110', '08:00:00', '17:00:00', 'https://www.fordrma.com/wp-content/uploads/2024/04/Ford-RMA-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%A1-4.jpg', 2),
(2, 'Kanlapaphruek Sathorn', '024161555', NULL, 'ford2', '34/9 Kanlapaphruek Rd', 'Bang Khun Thian', 'Chom Thong', 'Bangkok', '10150', '08:00:00', '18:00:00', 'https://www.fordrma.com/wp-content/uploads/2024/04/1-Ford-%E0%B8%81%E0%B8%B1%E0%B8%A5%E0%B8%9B%E0%B8%9E%E0%B8%A4%E0%B8%81%E0%B8%A9%E0%B9%8C.jpg', 1),
(3, 'Hua Mak Ladprao', '027363888', NULL, 'ford3', '3563/3 Ramkhamhaeng Rd', 'Hua Mak', 'Bang Kapi', 'Bangkok', '10240', '08:00:00', '17:00:00', 'https://www.fordrma.com/wp-content/uploads/2023/01/Ford-RMA-%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%81.jpg', 1),
(4, 'Ratchaphruek Rama 5 Nonthaburi', '024326599', NULL, 'ford4', '9, 99 Nakhon In Rd', 'Bang Khun Kong', 'Bang Kruai', 'Nonthaburi', '11130', '08:00:00', '18:00:00', 'https://i.ytimg.com/vi/wDOHsdFjc48/maxresdefault.jpg', 1);

INSERT INTO Employees (employeeId, firstName, lastName, centerId, empBirthDate, hiredDate, terminationDate, role, phoneNumber, email, lineId) VALUES
(1, 'Vitita', 'Srasreesom', 1, '2004-12-15', '2019-10-26', '2025-10-27', 'DCRC', '809999999', 'vitita@gmail.com', 'kaning.id'),
(2, 'Manichar', 'Aimdilokwong', 1, '1999-11-07', '2019-10-26', '2025-10-27', 'SA', '819999999', 'manichar@gmail.com', 'marmink.id'),
(3, 'Penpichaya', 'Boonsaner', 2, '2003-02-27', '2023-04-02', '2029-04-02', 'DCRC', '829999999', 'penpichaya@gmail.com', 'nana.id'),
(4, 'Phitchayapha', 'Supanya', 2, '2002-11-01', '2019-10-26', '2025-10-27', 'SA', '839999999', 'phitchayapha@gmail.com', 'nenie.id'),
(5, 'Sita', 'Teeradechsakul', 3, '2003-06-25', '2019-10-26', '2025-10-27', 'DCRC', '849999999', 'sita@gmail.com', 'sita.id'),
(6, 'Thidatip', 'Jiraphan', 3, '2008-03-04', '2024-10-26', '2030-10-26', 'SA', '859999999', 'thidatip@gmail.com', 'kwan.id'),
(7, 'Salinthip', 'Panaapichon', 4, '2002-07-20', '2024-10-26', '2030-10-26', 'DCRC', '869999999', 'salinthip@gmail.com', 'lingling.id'),
(8, 'Rapeephan', 'Chaemcharoen', 4, '2004-09-16', '2019-10-26', '2025-10-27', 'SA', '879999999', 'rapeephan@gmail.com', 'mei.id');

INSERT INTO EmployeeAccount (employeeAccountId, employeeId, password) VALUES
(1, 1, 'e00ef257342422ec13dd76253d13a8894cb9b3bc6870a38d844b4c765ae3d911'),
(2, 2, 'd07f74881ec1a433dff084cede8d0d507c1df2997ad2696dd79b0669ba4c6835'),
(3, 3, '92bdc41f46b50264ceb6156283add637853b503ddef614c448258764db572112'),
(4, 4, 'fa59d3bf775f3c3f6a4d68f25f67b7d85f0541e357680f69ea8ecf4aac36c633'),
(5, 5, 'c9662333d7f7d7f7b79a66d642388c8d62702a0a8ce3e4930716ef68ba8cc2d4'),
(6, 6, 'bf654cb5812dc2d06da7ec7746d4be48031029cfb9dffba26970448f8d154ce5'),
(7, 7, '187bed1bc19b259d1cdb6df4cdf766b68d48c07a63163f3c73f27b09ecb32d34'),
(8, 8, '32eef54b57beb25efe8ba4f04e18c8bb608d5d82882e1a503aedbce9e50b670c');


INSERT INTO Goods (goodsId, goodsBrand, goodsName, goodsDescription, goodsPrice, inStock, isActive, goodsPhotoURL) VALUES
(1, 'michelin', 'LTX Trail', '255/70R16', 5150.00, 96, 1, 'https://dxm.contentcenter.michelin.com/api/wedia/dam/transform/b98rpyxf61b4qd117rowfn1dby/4w-502_3528700124194_tire_michelin_ltx-trail-st_265-slash-65-r17-112t_a_main_5-quarterzoom_nopad.webp?t=resize&height=500'),
(2, 'michelin', 'LTX Trail', '265/65R17', 5850.00, 68, 1, 'https://dxm.contentcenter.michelin.com/api/wedia/dam/transform/b98rpyxf61b4qd117rowfn1dby/4w-502_3528700124194_tire_michelin_ltx-trail-st_265-slash-65-r17-112t_a_main_5-quarterzoom_nopad.webp?t=resize&height=500'),
(3, 'michelin', 'Primacy SUV+', '265/60R18', 7990.00, 52, 1, 'https://www.auto1.co.th/_next/image?url=https%3A%2F%2Fpim.thaiwatsadu.com%2FTWDPIM%2FAT1PIM%2Fweb%2FThumbnail%2FImage%2F1100%2F60364156.jpg&w=1920&q=75'),
(4, 'michelin', 'Primacy SUV+', '275/55R20', 7990.00, 59, 1, 'https://www.auto1.co.th/_next/image?url=https%3A%2F%2Fpim.thaiwatsadu.com%2FTWDPIM%2FAT1PIM%2Fweb%2FThumbnail%2FImage%2F1100%2F60364156.jpg&w=1920&q=75');

INSERT INTO Promotion (promotionId, promotionName, promotionDescription, isActive, promotionPhotoURL) VALUES
(1, 'Michelin Madness', 'ลดสูงสุด 15% เมื่อซื้อยาง Michelin ครบ 4 เส้น!', 1, 'https://i.pinimg.com/736x/41/d6/22/41d622be1fe5bdf81459d9e92d430147.jpg'),
(2, 'ซื้อ 3 แถม 1', 'ซื้อยาง Michelin Primacy SUV+ 3 เส้น รับฟรีอีก 1 เส้น', 1, 'https://i.pinimg.com/736x/49/27/7c/49277c8da39f3d33d7cc68f6d5d58551.jpg'),
(3, 'ฟรีค่าติดตั้ง', 'เมื่อลูกค้าซื้อยาง Michelin LTX Trail ครบ 4 เส้น', 1, 'https://i.pinimg.com/736x/81/4f/03/814f03ed110e2a5eafa91781633f81c9.jpg'),
(4, 'เช็กช่วงล่างฟรี', 'ซื้อยาง Michelin รุ่นใดก็ได้ ครบ 2 เส้นขึ้นไป', 1, 'https://i.pinimg.com/736x/a4/26/c5/a426c5c893bc72f363d7d9f0cd2ac9cf.jpg'),
(5, 'โปรเดือนแห่งความรัก', 'ส่วนลด 10% ทุกเส้น และพิเศษ! แถมแฟน 1 คนสำหรับคนโสด', 1, 'https://i.pinimg.com/736x/02/e0/41/02e0417592849e59030e83a326d81036.jpg');
