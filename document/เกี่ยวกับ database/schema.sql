CREATE TABLE Cars (
  carId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  carModel TEXT NOT NULL,
  carYear INTEGER NOT NULL,
  carGrade TEXT DEFAULT NULL
);
CREATE TABLE sqlite_sequence(name,seq);
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
CREATE TABLE EmployeeAccount (
  employeeAccountId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  employeeId INTEGER DEFAULT NULL,
  password TEXT NOT NULL,
  FOREIGN KEY (employeeId) REFERENCES Employees(employeeId)
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
  mileage INTEGER DEFAULT NULL, carRegisNo TEXT,
  FOREIGN KEY (carId) REFERENCES Cars(carId),
  FOREIGN KEY (customerId) REFERENCES Customers(customerId)
);
CREATE TABLE ServiceHistoryDetails (
  serviceHistoryDetailsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  serviceHistoryId INTEGER DEFAULT NULL,
  goodsId INTEGER DEFAULT NULL,
  FOREIGN KEY (serviceHistoryId) REFERENCES "ServiceHistory_old"(serviceHistoryId),
  FOREIGN KEY (goodsId) REFERENCES Goods(goodsId)
);
CREATE INDEX idx_centerId ON Employees(centerId);
CREATE INDEX idx_employeeId ON EmployeeAccount(employeeId);
CREATE INDEX idx_carId ON RegistrationNumber(carId);
CREATE INDEX idx_customerId ON RegistrationNumber(customerId);
CREATE TABLE Maintenance (
  maintenanceId INTEGER PRIMARY KEY AUTOINCREMENT,  -- primary key ที่ auto increment
  carId INTEGER,                                     -- carId จะเป็น fk จากตาราง Cars
  mileage INTEGER,                                   -- mileage เป็นตัวเลข
  FOREIGN KEY (carId) REFERENCES Cars(carId)         -- สร้าง foreign key ให้ carId อ้างอิงจากตาราง Cars
);
CREATE TABLE MaintenanceGoods (
  maintenanceGoodsId INTEGER PRIMARY KEY AUTOINCREMENT,  -- primary key ที่ auto increment
  maintenanceId INTEGER,                                 -- maintenanceId เป็น foreign key จากตาราง Maintenance
  goodsId INTEGER,                                       -- goodsId เป็น foreign key จากตาราง Goods
  FOREIGN KEY (maintenanceId) REFERENCES Maintenance(maintenanceId),  -- เชื่อมโยงกับตาราง Maintenance
  FOREIGN KEY (goodsId) REFERENCES Goods(goodsId)       -- เชื่อมโยงกับตาราง Goods
);
CREATE TABLE ServiceHistory (
    "serviceHistoryId" INTEGER NOT NULL,
    "customerId" INTEGER DEFAULT NULL,
    "caseCategory" TEXT DEFAULT NULL,
    "caseSummary" TEXT DEFAULT NULL,
    "caseDetails" TEXT DEFAULT NULL,
    "slot" INTEGER DEFAULT NULL,
    "status" INTEGER DEFAULT 0,
    "caseStartDatetime" TEXT DEFAULT NULL,
    "caseClosedDatetime" TEXT DEFAULT NULL,
    "handledByEmployeeId" INTEGER DEFAULT NULL,
    "centerId" INTEGER,  -- คอลัมน์ใหม่
    PRIMARY KEY("serviceHistoryId" AUTOINCREMENT),
    FOREIGN KEY("customerId") REFERENCES "Customers"("customerId"),
    FOREIGN KEY("handledByEmployeeId") REFERENCES "Employees"("employeeId"),
    FOREIGN KEY("centerId") REFERENCES "ServiceBranch"("centerId")  -- เพิ่ม FK ตรงนี้
);
