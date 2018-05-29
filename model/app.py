from flask import Flask, request, jsonify
from model import Model

print("Creating Model.", end="")
print(".", end="")
print(".")
model = Model((5,))
print("Model Created...")
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/model", methods=['GET', 'POST'])
def index():
    params = request.args.get("data")

    if(params == "mutate"):
        model.mutate(1)

        response = jsonify(result=params)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        params = params.split(' ')
        pred = model.predict(params)

        response = jsonify(result=pred)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


if __name__ == '__main__':
    app.run()
