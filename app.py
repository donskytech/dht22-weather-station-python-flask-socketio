import json
from flask import Flask, render_template, request
from flask_socketio import SocketIO
from random import random
from threading import Lock
from datetime import datetime
from dht22_module import DHT22Module
import board

dht22_module = DHT22Module(board.D18)
"""
Background Thread
"""
thread = None
thread_lock = Lock()

app = Flask(__name__)
app.config["SECRET_KEY"] = "donsky!"
socketio = SocketIO(app, cors_allowed_origins="*")

"""
Get current date time
"""


def get_current_datetime():
    now = datetime.now()
    return now.strftime("%m/%d/%Y %H:%M:%S")


"""
Generate random sequence of dummy sensor values and send it to our clients
"""


def background_thread():
    print("Generating random sensor values")
    while True:
        # temperature_sensor_value = round(random() * 100, 3)
        # humidity_sensor_value = round(random() * 100, 3)

        temperature, humidity = dht22_module.get_sensor_readings()
        sensor_readings = {
            "temperature": temperature,
            "humidity": humidity,
        }
        sensor_json = json.dumps(sensor_readings)

        socketio.emit("updateSensorData", sensor_json)
        socketio.sleep(1)


"""
Serve root index file
"""


@app.route("/")
def index():
    return render_template("index.html")


"""
Decorator for connect
"""


@socketio.on("connect")
def connect():
    global thread
    print("Client connected")

    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)


"""
Decorator for disconnect
"""


@socketio.on("disconnect")
def disconnect():
    print("Client disconnected", request.sid)


# if __name__ == "__main__":
#     socketio.run(app, port=5000, host="0.0.0.0", debug=True)
