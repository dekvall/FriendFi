from flask import Flask
#from flask_socketio import  SocketIO


app = Flask(__name__)
#socketio = SocketIO(app)

@app.route("/")
def hello():
    return "<h1 style='color:blue'>Hello There!</h1>"



if __name__ == "__main__":
    app.run(host='127.0.0.1')
