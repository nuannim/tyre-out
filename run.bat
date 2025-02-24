@echo off
echo init y

call npm init -y

echo express sqlite ejs loading..

call npm install express sqlite3 ejs express-session cookie-parser

echo opening server..

call nodemon server.js

echo finish laew

pause
