from flask import Flask, request, jsonify, render_template
import os
import sys
import dialogflow
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

'''@app.route('/webhook', methods=['POST', 'GET'])
def webhook():
    print("hello", file=sys.stderr)
    data = request.get_json(force=True)
    print(data, file=sys.stderr)
    if data['queryResult']['queryText'] == 'food':
       reply = {
            'fulfillmentText': 'YES TESTING.',
        }
       return jsonify(reply)
    elif data['queryResult']['queryText'] == 'no':
       reply = {
            'fulfillmentText': 'NO TESTING',
        }
       return jsonify(reply)'''

@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.form['message']
    project_id = os.getenv('DIALOGFLOW_PROJECT_ID')
    fulfillment_text = intent_texts(project_id, "unique", message, 'en')
    response_text = {
        'message': fulfillment_text
    }
    return jsonify(response_text)

def intent_texts(project_id, session_id, text, language_code):
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(project_id, session_id)

    if text:
        text_input = dialogflow.types.TextInput(text=text, language_code=language_code)
        query_input =dialogflow.types.QueryInput(text=text_input)
        response = session_client.detect_intent(session=session, query_input=query_input)
        return response.query_result.fulfillment_text

if __name__ == "__main__":
    app.run()


