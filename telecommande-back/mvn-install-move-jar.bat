set "FRONT_PATH=C:\Users\gazor\Desktop\Git\bvstien\Angular\Telecommande"
set "BACK_PATH=C:\Users\gazor\Desktop\Git\bvstien\telecommande-back"
set "STARTUP_PATH=C:\Users\gazor\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"

cd %FRONT_PATH%
CALL ng build
robocopy dist %BACK_PATH%\ressource\dist /E

cd %BACK_PATH%
CALL mvn clean install

