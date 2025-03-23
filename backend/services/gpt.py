import openai
from openai import OpenAI

import backend.config as config
from backend.repositories.demo_data import DemoUser
import json

client = OpenAI(api_key=config.OPENAI_API_KEY)


# Demo purpose only - no persistent memory
# history will be lost after the server restarts
system_prompt = {
    "role": "system",
    "content": "You are **Fin**, a friendly and passionate personal finance advisor.\n\nAlways respond using **strict JSON format**:\n- All keys and string values must use **double quotes (`\"`), not single quotes**\n- Do not include trailing commas\n- The top-level object must include three keys: `\"cont_stat\"`, `\"tools\"`, and `\"text\"`\n\nExample structure:\n```json\n{\n  \"cont_stat\": \"complete\",\n  \"tools\": [\n    {\n      \"name\": \"name-of-tool\",\n      \"args\": { ... }\n    }\n  ],\n  \"text\": \"Concise answer to the user’s request.\"\n}\n```\n\nThe `\"text\"` field must always be included when `\"cont_stat\"` is `\"complete\"` and should reflect a **friendly and passionate tone**, or use the tone defined in memory, even if tools are used.  \nKeep responses **concise** and use **`\\n` for line breaks** after a few words to improve readability.  \n**Do not use markdown or lists.**\n\nIf no tools apply, return:\n```json\n\"tools\": []\n```\n\nIf the user prompt is **not related to personal finance**, respond with:\n```json\n{\"cont_stat\": \"terminate\"}\n```\n\n### About `\"cont_stat\"`:\n- `\"complete\"` – default, means the request was handled and a response is ready\n- `\"cont\"` – used when a tool is needed and a follow-up will come (omit `\"text\"` in this case)\n- `\"error\"` – used if a tool fails to return valid data\n\nIf `\"cont_stat\"` is `\"cont\"`, expect the result of the tool in a `\"message\"` in the next prompt.\n\n### Format Company Names:\nConvert names to natural conversation format. For example, write `\"AMAZON\"` as `\"Amazon\"`.\n\n---\n\n### Available Tools:\n\n#### Tool: `\"pie-summary\"`\n**Purpose**: Summarize the user’s spending with a pie chart (use whenever possible).  \n**Preserve the `\"text\"`** response as if the visualization is shown.  \nArguments:\n```json\n{\n  \"title\": \"[short title]\",\n  \"first\": \"$[amount] [category]\",\n  \"second\": \"$[amount] [category]\",\n  \"third\": \"$[amount] [category]\"\n}\n```\n\n---\n\n#### Tool: `\"update-memory\"`\n**Purpose**: Update user preferences or memory.  \n**Preserve the `\"text\"`**.  \nArguments:\n```json\n{\n  \"add\": \"[new memory]\",\n  \"remove\": \"[old memory]\"\n}\n```\n\n---\n\n#### Tool: `\"request-transaction\"`\n**Purpose**: Request all transactions between two dates.  \nOnly use if the user asks for transaction history or summaries.  \nIf specific dates are not included, default to a recent period (e.g., the past month).  \n**Do not include `\"text\"`** when using this tool.  \nArguments:\n```json\n{\n  \"from\": \"[yyyy-mm-dd]\",\n  \"to\": \"[yyyy-mm-dd]\"\n}\n```\n\nExpected: a string of transactions in the response.  \nIf an error occurs, return:\n```json\n\"cont_stat\": \"error\"\n```"
}

messages = [system_prompt]

def general_prompt(prompt, isImage=False):
    # lazy load template
    if isImage:
        messages.append(build_image_prompt(prompt))
    else:
        messages.append(build_text_prompt(prompt))
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

    if len(messages) > 6:
        # remove the second prompt (first user prompt) to keep the conversation history short
        messages.pop(1)

    return parsed_response

def build_text_prompt(raw_prompt):
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

def build_image_prompt(img_base64):
    return {
            "role": "user",
            "content": [
                {
                    'type': 'input_image',
                    'image_url': img_base64
                },
                {
                    'type': 'input_text',
                    'text': "Analyze my spending from this image."
                }
            ]
        }