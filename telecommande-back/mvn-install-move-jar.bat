set "FRONT_PATH=%USERPROFILE%\Desktop\Git\bvstien\Angular\v20"
set "BACK_PATH=%USERPROFILE%\Desktop\Git\bvstien\telecommande-back"
set "STARTUP_PATH=%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"

cd %FRONT_PATH%
CALL ng build
robocopy dist\browser %BACK_PATH%\ressource\dist /E

cd %BACK_PATH%
CALL mvn clean install