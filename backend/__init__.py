from flask import Flask
from backend.controllers.demo import api
from dotenv import load_dotenv
from flask_cors import CORS

def build_app():
    load_dotenv()

    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(api, url_prefix='/api')
    CORS(app, origins='http://localhost:8081')

    return app