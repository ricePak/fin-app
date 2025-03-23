import openai
import config

print(config.OPENAI_API_KEY)
openai.api_key = config.OPENAI_API_KEY

