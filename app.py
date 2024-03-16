from flask import Flask, render_template
import random

app = Flask(__name__)

@app.route('/')
def index():
    data = generate_data()
    return render_template('index.html', data=data)

def generate_data():
    # Generate random data for the bar graph
    labels = ['A', 'B', 'C', 'D', 'E']
    values = [random.randint(1, 10) for _ in range(len(labels))]
    return {'labels': labels, 'values': values}

if __name__ == '__main__':
    app.run(debug=True)
