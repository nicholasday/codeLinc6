from flask import Flask, request, jsonify, render_template
import os
import sys
import dialogflow
import json
from google.protobuf.json_format import MessageToDict
import pandas as pd

app = Flask(__name__)
df = pd.read_excel (r'services.xlsx') #(use "r" before the path string to address special character, such as '\'). Don't forget to put the file name at the end of the path + '.xlsx'

executed = False

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
    if (message == "Ok thank you"): 
        executed = False
        response_text = {
            'message': "Here is one organization you can look into: <a href=\"http://www.caringservices.org\">Caring Services</a>. It offers assistance over food, shelter, and benefits."
        }
    else: 
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
        if (response.query_result.intent.display_name == 'location.register'):
            res_dict = MessageToDict(response)
            needTypes = res_dict['queryResult']['outputContexts'][0]['parameters']['need-type']
            data = {'Program Name': 1, 'Food': False, 'Shelter': False, 'Career': False, 'Mental Health':False, 'Substance Abuse':False, 'Healthcare':False, 'Benefits':False, 'Education':False, 'Region':'N/a'}
            d = pd.DataFrame(data, index=[0])
            for need in needTypes:
                if (need == 'food'):
                    d.at[0, 'Food'] = True
                elif (need == 'shelter'):
                    d.at[0, 'Shelter'] = True
                elif (need == 'healthcare'):
                    d.at[0, 'Healthcare'] = True
                elif (need == 'mental health'):
                    d.at[0, 'Mental Health'] = True
                elif (need == 'career'):
                    d.at[0, 'Career'] = True
                elif (need == 'education'):
                    d.at[0, 'Education'] = True
                elif (need == 'benefits'):
                    d.at[0, 'Benefits'] = True
                elif (need == 'substance abuse'):
                    d.at[0, 'Substance Abuse'] = True
            newDF = pd.DataFrame({'Program Name': 1, 'Food': [], 'Shelter': [], 'Career': [], 'Mental Health':[], 'Substance Abuse':[], 'Healthcare':[], 'Benefits':[], 'Education':[], 'Region':[], 'Matches':[]})
            for index, row in df.iterrows():
                if row['Shelter'] == True and d.at[0, 'Shelter'] == True and row['Benefits'] == True and d.at[0, 'Benefits'] == True and row['Substance Abuse'] == True and d.at[0, 'Substance Abuse'] == True:
                    s = pd.Series({'Program Name': df.at[index, 'Program Name'], 'Food': df.at[index, 'Food'], 'Shelter': df.at[index, 'Shelter'], 'Career': df.at[index, 'Career'], 'Mental Health':df.at[index, 'Mental Health'], 'Substance Abuse':df.at[index, 'Substance Abuse'], 'Healthcare':df.at[index, 'Healthcare'], 'Benefits':df.at[index, 'Benefits'], 'Education':df.at[index, 'Education'], 'Region':df.at[index, 'Region']})
                    newDF = newDF.append(s, ignore_index=True)
            print(newDF)
        return response.query_result.fulfillment_text

if __name__ == "__main__":
    app.run()


