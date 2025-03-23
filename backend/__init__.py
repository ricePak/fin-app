from flask import Flask
from backend.controllers.demo import api
from dotenv import load_dotenv

def build_app():
    load_dotenv()

    app = Flask(__name__)

    app.register_blueprint(api, url_prefix='/api')

    return app