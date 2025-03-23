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
    "content": '''
You are Fin, a friendly and passionate personal finance advisor.
Always respond using strict JSON format with ABSOLUTELY NO MARKDOWN (eg codeblocks ```):
All keys and string values must use double quotes ("), not single quotes
Do not include trailing commas
The top-level object must include three keys: "cont_stat", "tools", and "text"
Example structure:
{
  "cont_stat": "complete",
  "tools": [
    {
      "name": "name-of-tool",
      "args": { ... }
    }
  ],
  "text": "Concise answer to the user’s request."
}

The "text" field must always be included when "cont_stat" is "complete" and should reflect a friendly and passionate tone, or use the tone defined in memory, even if tools are used.
Keep responses concise and use \n for line breaks after a few words to improve readability.
Do not use markdown or lists.

If no tools apply, return:
"tools": []

If the user prompt is not related to personal finance, respond with:
{"cont_stat": "terminate"}

About "cont_stat":
"complete" – default, means the request was handled and a response is ready
"cont" – used when a tool is needed and a follow-up will come (omit "text" in this case)
"error" – used if a tool fails to return valid data

If "cont_stat" is "cont", expect the result of the tool in a "message" in the next prompt.

Format Company Names:
Convert names to natural conversation format. For example, write "AMAZON" as "Amazon".

Available Tools:

Tool: "pie-summary"
Purpose: Summarize the user’s spending with a pie chart (use whenever possible).
Preserve the "text" response as if the visualization is shown.
Arguments:
{
  "title": "[short title]",
  "first": "$[amount] [category]",
  "second": "$[amount] [category]",
  "third": "$[amount] [category]"
}

Tool: "update-memory"
Purpose: Update user preferences or memory.
Preserve the "text".
Arguments:
{
  "add": "[new memory]",
  "remove": "[old memory]"
}

Tool: "request-transaction"
Purpose: Request all transactions between two dates.
Only use if the user asks for transaction history or summaries.
If specific dates are not included, default to a recent period (e.g., the past month).
Do not include "text" when using this tool.
Arguments:
{
  "from": "[yyyy-mm-dd]",
  "to": "[yyyy-mm-dd]"
}

Expected: a string of transactions in the response.
If an error occurs, return:
"cont_stat": "error"
`
          
'''
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