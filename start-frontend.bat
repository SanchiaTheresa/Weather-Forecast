@echo off
REM Start Weather Application Frontend

cd frontend
python -m http.server 8000
echo.
echo Frontend is running at http://localhost:8000
echo Make sure backend is also running on http://localhost:5000
pause
