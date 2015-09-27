from flask import Flask, jsonify

import os
from cross_domain import *

app = Flask(__name__)

try:
    TARGET = os.environ['TARGET']
    AlGDock = os.environ['AlGDock']
except Exception:
    print 'export TARGET=<path to data>'
    exit(1)

import sys
sys.path.insert(0, AlGDock)
from BindingPMF_arguments import *

@app.route('/api/v1.0/proteins', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_protein_names():
    proteins = os.walk(TARGET).next()[1]
    protein_lst = [{"filename": protein} for protein in sorted(proteins)]
    return jsonify({"files": protein_lst})

@app.route('/api/v1.0/ligands/<protein>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_ligand_names(protein):
    ligands = os.walk(os.path.join(TARGET, protein, "ligand")).next()[2]
    ligand_lst = [{"filename": ligand} for ligand in sorted(ligands)]
    return jsonify({"files": ligand_lst})

@app.route('/api/v1.0/protocols', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_protocols():
    choices = arguments['protocol']['choices']
    choice_lst = [{"choice": choice} for choice in choices]
    return jsonify({"protocol": choice_lst})

@app.route('/api/v1.0/run/<protein>/<ligand>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def run(protein, ligand):
    return "Protein selected: %s; Ligand selected: %s" % (protein, ligand)

if __name__ == '__main__':
    app.run(debug=True)
