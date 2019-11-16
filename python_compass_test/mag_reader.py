import serial
from time import sleep
import threading

class readMag():
    def __init__(self):
        self.ser = serial.Serial('/dev/ttyACM0')
        self.ser.baudrate = 115200
        self.prev = 0
        self.val = 0
        self.thread = threading.Thread(target = self.readIno)
        self.thread.daemon = True
        self.thread.start()


    def readIno(self):
        while True:
            self.val = float(self.ser.readline())
            self.val = (self.prev + self.val)/2
            self.prev = self.val

            sleep(0.1)



mag = readMag()

while True:
    file = open('index.html','w+')
    file.write(str(mag.val))
    #print(mag.val)
    sleep(0.9)