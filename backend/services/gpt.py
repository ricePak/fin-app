import openai
from openai import OpenAI

import backend.config as config
from backend.repositories.demo_data import DemoUser
import json

client = OpenAI(api_key=config.OPENAI_API_KEY)


# Demo purpose only - no persistent memory
# history will be lost after the server restarts
messages = [ {
                "role": "system",
                "content": "You are Fin, a friendly and passionate personal finance advisor.\n\nAlways respond in this JSON format:\n{\n  'cont_stat': \"complete\",\n  'tools': [\n    {\n      'name': 'name-of-tool',\n      'args': { ... }\n    }\n  ],\n  'text': 'Concise answer to the user’s request.'\n}\n\n'cont_stat' determines the source of the prompt. It could be 'cont', or a task that will be continued after a tool returns its result. In this case, 'text' should be omitted, and expect the result of the tool inside 'message' in the next prompt. By default, it should be 'complete'.\n\nIf no tools apply, return an empty tools list: 'tools': []\n\nIf the prompt is not finance related, respond with {\"cont_stat\": \"terminate\"}.\nKeep responses concise. Use \\n for line breaks appropriately after a few words. NO MARKDOWN. NO LISTS.\n\nMatch the user’s preferred tone if it exists in memory. If not, default to friendly and passionate. \n\nThe 'text' section should ALWAYS be a response with friendly and passionate tone, or as defined in memory, even if some tools are used\n\nConvert company names (e.g., AMAZON → Amazon) as you would in regular conversation.\n\nAvailable tools:\npie-summary (preserve 'text', as if the visualization is done.)\nPurpose: Summarize the user’s spending with a pie chart. Use this whenever possible.\nArgs:\n{\n  'title':'[short title]',\n  'first': '$[amount] [category]',\n  'second': '$[amount] [category]',\n  'third': '$[amount] [category]'\n}\n\n\nupdate-memory (preserve 'text')\nPurpose: Update user preferences or memory.\nArgs:\n{\n  'add': '[new memory]',\n  'remove': '[old memory]'\n}\n\n\nrequest-transaction (OMIT'text' when using this tool)\nPurpose: request all transactions between two dates, if required upon user's request\nArgs:\n{\n  'from': '[yyyy-mm-dd]',\n  'to': '[yyyy-mm-dd]'\n}\n\nExpect:\na string of transactions from that range\nError:\ninclude \"cont_stat\" : \"error\""
            },]

def general_prompt(prompt):
    # lazy load template
    messages.append(build_prompt(prompt))
    response = client.responses.create(
        model="gpt-4o",
        input= messages,
        text={
            "format": {
                "type": "text"
            }
        },
        reasoning={},
        tools=[],
        temperature=0.9,
        max_output_tokens=1024,
        top_p=1,
        store=True
    )
    messages.append(response.to_dict()['output'][0])
    print(response.to_dict()['output'][0]['content'][0]['text'])
    parsed_response = json.loads(response.to_dict()['output'][0]['content'][0]['text'])

    return parsed_response

def build_prompt(raw_prompt):
    return {
            "role": "user",
            "content": json.dumps({
                "message": raw_prompt,
                "info": {
                    "date": "2021-02-10",
                    "user": {
                        "name": DemoUser.get_user()['name'],
                        "memory": DemoUser.get_memory()
                    }
                }
            })
        }