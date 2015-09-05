from flask import Flask, jsonify

import os
from cross_domain import *

app = Flask(__name__)

DATA = 'data'

@app.route('/api/v1.0/data/<data_type>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_data(data_type):
    data_subdirs = os.listdir(DATA)
    if data_type in data_subdirs:
        fl_lst = [{"filename": fl} for fl in sorted(os.listdir(os.path.join(DATA, data_type)))]
        return jsonify({"data_type": data_type, "files": fl_lst})

@app.route('/api/v1.0/run/<protein>/<ligand>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def run(protein, ligand):
    return "Protein selected: %s; Ligand selected: %s" % (protein, ligand)

if __name__ == '__main__':
    app.run(debug=True)
