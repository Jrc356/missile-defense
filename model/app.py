from flask import Flask, request, jsonify
from model import Model
from random import choice
import numpy as np

global models
models = []

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/model", methods=['GET', 'POST'])
def index():
    loops = int(request.args.get("num_models"))
    for i in range(loops):
        print("Creating Model {}.".format(i), end="")
        print(".", end="")
        print(".")
        models.append(Model((1, 5)))
        print("Model {} Created...".format(i))

    response = jsonify(result="Check")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/model/predict", methods=['GET', 'POST'])
def predict():
    global models
    params = request.args.get("data")
    params = params.split(' ')
    model = int(request.args.get("model"))

    pred = models[model].predict(params)

    response = jsonify(result=pred)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/model/evolve", methods=['GET', 'POST'])
def evolve():
    newPop = []
    global models
    for i in range(len(models)):
        parentA = choice(models)
        parentB = choice(models)
        child = parentA.crossOver(parentB)
        newPop.append(child)

    models = newPop

    response = jsonify(result="success")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/model/mutate", methods=['GET', 'POST'])
def mutate():
    params = request.args.get("data")
    params == "mutate"
    # model.mutate(.5)

    response = jsonify(result=params)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run()
