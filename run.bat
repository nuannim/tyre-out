@echo off
echo init y

call npm init -y

echo express sqlite ejs loading..

call npm install express sqlite3 ejs express-session cookie-parser

echo opening server..

start cmd /k nodemon server.js

timeout /t 5

echo finish laew

start "" http://localhost:3000

pause
