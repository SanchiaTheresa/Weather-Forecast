@echo off
REM Start Weather Application Backend

cd backend
call venv\Scripts\activate.bat
python app.py
