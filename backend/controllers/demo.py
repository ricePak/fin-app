from flask import jsonify, Blueprint, request

from backend.repositories.demo_data import DemoUser

api = Blueprint('api', __name__)

## Demo API endpoints
# Features:
# - POST /chatbot

@api.route('/chatbot', methods=['GET'])
def chatbot():
    return jsonify({
        'message': 'Hello, world!'
    })

@api.route('/testdata', methods=['GET'])
def testdata():
    return jsonify({
        'message': DemoUser.get_transaction_summary()
    })