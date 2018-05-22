from flask import Flask, request
from model import Model

print("Creating Model.", end="")
print(".", end="")
print(".")
model = Model(5)
print("Model Created...")
app = Flask(__name__)


@app.route("/model", methods=['GET', 'POST'])
def index():
    params = request.args.get("data")
    params = params.split('+')
    print(type(params))
    print(params)
    return str(params)


if __name__ == '__main__':
    app.run()
