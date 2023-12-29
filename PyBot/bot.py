import time
import pyautogui

def clickBox(box): 
    return clickIt(box.left + box.width/2, box.top + box.height/2)

def clickIt(x, y):
    pyautogui.moveTo(x, y)
    pyautogui.mouseDown()
    pyautogui.mouseUp()

menuParametresBox = pyautogui.locateOnScreen('img/parametres.png', confidence=0.6)
print(menuParametresBox)
clickBox(menuParametresBox)

time.sleep(1)

menuVideoBox = pyautogui.locateOnScreen('img/video.png', confidence=0.8)
print(menuVideoBox)
clickBox(menuVideoBox)

pyautogui.moveTo(menuVideoBox.left * 2, menuVideoBox.top)
time.sleep(1.5)

pyautogui.scroll(5, 100)

# buttonx, buttony = pyautogui.locateOnScreen('parametres.png') # returns (x, y) of matching region
# buttonx, buttony
# pyautogui.click(buttonx, buttony)
