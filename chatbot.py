import os, openai
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

openai.api_key = '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'
system_message = 'be good'

# @app.route('/api/chatbot/<str:prompt>', methods=['GET', 'POST'])
def get_comp(prompt, model="gpt-3.5-turbo"):
    # system_message = ''
    # if request.method == "POST":
    # prompt = request.json['prompt']
    messages = [
    {"role": "system", "content": system_message},
    {"role": "user", "content": prompt}
]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.2
    )
    result = response.choices[0].message["content"]
    print(result)
    #  jsonify({'message': result})

get_comp('who is the president of nigeria?')