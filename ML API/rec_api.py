#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, render_template, Response
#from flask_cors import CORS
import json
from tutils import inimovie



app = Flask(__name__)
#CORS(app)


@app.route('/ini', methods=['POST'])
def rm():
    if request.method == "POST":
        info = json.loads(request.data)
        nservices = info["nservices"]
        ngenres = info["ngenres"]
        movies = inimovie(nservices, ngenres)
        return movies
    else:
        return "Go Away"


if __name__ == "__main__":
    app.run(debug=True, port=5051)