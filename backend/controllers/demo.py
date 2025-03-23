from flask import jsonify, Blueprint, request

from backend.repositories.demo_data import DemoUser
from backend.services.gpt import general_prompt, messages


api = Blueprint('api', __name__)

## Demo API endpoints
# Features:
# - POST /chatbot\

def route_response(response):
    if response['cont_stat'] == 'terminate':
        return jsonify({
            'message': 'Ask something finance-related!'
        })
    elif response['cont_stat'] == 'complete':
        return jsonify({
            'message': response
        })
    elif response['cont_stat'] == 'cont':
        return jsonify({
            'remark': 'use_tool',
            'message': response
        })
    else:
        return jsonify({
            'message': 'Error'
        })

@api.route('/chat', methods=['POST'])
def chatbot():
    response =  general_prompt(request.json['prompt'])
    
    return route_response(response)

# depreciate in future - websocket will be used
@api.route('/chatbot-tool', methods=['POST'])
def chatbot_tool():
    tool_request =  request.json['tools'][0]
    if tool_request.get('name') == 'request-transaction':
        tool_response = DemoUser.get_transaction_summary(start=tool_request['args'].get('from'), end=tool_request['args'].get('to'))
        return route_response(general_prompt(tool_response))

@api.route('/testdata', methods=['GET'])
def testdata():
    return jsonify({
        'message': DemoUser.get_transaction_summary()
    })