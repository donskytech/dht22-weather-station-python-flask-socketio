# Raspberry Pi DHT22 Weather Station Python Flask Socketio  
A DHT Weather Station project using Python, Flask, Flask-SocketIO, and Bootstrap that displays real-time temperature and humidity sensor readings using your Raspberry Pi
![Featured Image - DHT22 Weather Station With Python, Flask, Flask-SocketIO](https://user-images.githubusercontent.com/69466026/236615315-5a7bba1c-9712-48bd-8718-29039850d655.jpg)  
  
## Writeup
https://www.donskytech.com/raspberry-pi-dht22-weather-station-project/

## Prerequisites
Make sure to install the DHT22 driver on your Raspberry Pi using the Adafruit_circuitPython_dht library.   
Follow the following post https://www.donskytech.com/raspberry-pi-how-to-interface-with-a-dht22-sensor/
  
## Steps on how to run on Raspberry Pi
1. Clone the repository
```
git clone https://github.com/donskytech/dht22-weather-station-python-flask-socketio.git
cd dht22-weather-station-python-flask-socketio
```
2. Create a Python virtual environment
```
python -m venv .venv
source .venv/bin/activate
```
3. Install the dependencies
```
pip install -r requirements.txt
```

4. Run the application
```
flask run --host=0.0.0.0
```
5. Access the application using the following URL
```
http://<IP>:5000
```
  
  
### Multiple DHT22 IoT Weather Station Dashboard
This is a follow up project to this project.  It will display dynamic number of DHT22 sensors and its readings.
https://www.donskytech.com/raspberry-pi-weather-station/

Code:  
https://github.com/donskytech/dht22-weather-station-python-flask-socketio-multiple-sensors
![Sample Web View](https://github.com/donskytech/dht22-weather-station-python-flask-socketio-multiple-sensors/assets/69466026/f4d2e0d8-f372-475e-9eff-859eb59e2845)
  
### How to auto-start this project when your Raspberry Pi boots or starts?  
https://www.donskytech.com/raspberry-pi-how-to-start-python-script-on-boot/
