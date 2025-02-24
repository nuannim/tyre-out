@echo off
echo อ่านทำไม...

call npm init -y

echo ยังจะอ่านอีก...

call npm install express sqlite3 ejs

echo ขอตังหน่อย...

call nodemon server.js

echo เปิดแล้วอิอิ...

pause
