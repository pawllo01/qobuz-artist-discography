@echo off

cd server
start /B cmd /c "npm run start"
cd../

cd client
start cmd /c "npm run dev"
cd ../

start http://localhost:5173/
