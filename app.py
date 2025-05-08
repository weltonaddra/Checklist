from flask import Flask, render_template
import os

app = Flask(__name__)

# Route for the checklist page
@app.route('/')
def checklist():
    return render_template('index.html')

if __name__ == '__main__':
    # Ensure the app runs on port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)

    #python app.py 
    #flask --app app.py --debug run