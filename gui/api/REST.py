from flask import Flask, jsonify, request, redirect, url_for, send_from_directory
import subprocess

import os
import errno
import json
from cross_domain import *

app = Flask(__name__)
ALLOWED_EXTENSIONS = set(['mol', 'smi'])

try:
    TARGET = os.environ['TARGET']
except Exception:
    print 'export TARGET=<path to data>'
    exit(1)

try:
    AlGDock = os.environ['AlGDock_Pref']
except Exception:
    print 'export AlGDock_Pref=<path to BindingPMF_arguments.py>'
    exit(1)

import sys
sys.path.insert(0, AlGDock)
from BindingPMF_arguments import *

#File system functions
@app.route('/api/v1.0/proteins', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_protein_names():
    proteins_folder = os.path.join(TARGET,"proteins")
    proteins = os.walk(proteins_folder).next()[1] #search for folders in TARGET/proteins
    protein_list = [{"filename": protein} for protein in sorted(proteins)]
    return jsonify({"files": protein_list})

#File system functions
@app.route('/api/v1.0/ligands', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_ligand_names():
    ligands_folder = os.path.join(TARGET,"ligands")
    ligands = os.walk(ligands_folder).next()[2] #search for files in TARGET/ligands
    ligand_list = [{"filename": ligand.split(".ism")[0]} for ligand in sorted(ligands) if ".ism" in ligand]
    return jsonify({"files": ligand_list})

#@app.route('/api/v1.0/ligands/<protein>', methods=['GET', 'OPTIONS'])
#@crossdomain(origin='*')
#def get_ligand_names(protein):
#    ligands = os.walk(os.path.join(TARGET, protein, "ligand")).next()[2]
#    ligand_lst = [{"filename": ligand} for ligand in sorted(ligands) if ".ism" in ligand]
#    return jsonify({"files": ligand_lst})

@app.route('/api/v1.0/ligandSelection/<protein>/<library>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_ligand_selections(protein, library):
    trimmed_library = library.split(".ism")[0] + ".A__"
    try:
        ligand_selections = sorted(os.walk(os.path.join(TARGET, protein, "AlGDock/cool", trimmed_library)).next()[1])
    except Exception:
        ligand_selections = None
    return jsonify({"ligandSelections": ligand_selections})

@app.route('/api/v1.0/ligandLine/<protein>/<library>/<lineNumber>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_ligand_line(protein, library, lineNumber):
    try:
        path = os.path.join(TARGET, protein, "ligand", library)
        library_f = open(path, 'r')
        for i, line in enumerate(library_f):
            if i == int(lineNumber) - 1:
                return line.split()[0]
        library_f.close()
    except Exception:
        return None

@app.route('/api/v1.0/addToLibrary/<protein>/', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
def add_to_library(protein):
    fileJson = request.get_json()
    libraryName = fileJson["libraryName"]
    smiles = fileJson["smiles"]
    path = os.path.join(TARGET, protein, "ligand", libraryName)
    library_f = open(path, 'a')
    library_f.write(smiles)
    library_f.write("\n")
    library_f.close()
    return "Added ligand to library."

#Gets for preference dropdowns
@app.route('/api/v1.0/protocols', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_protocols():
    choices = arguments['protocol']['choices']
    choice_lst = [{"choice": choice} for choice in choices]
    return jsonify({"protocol": choice_lst})

@app.route('/api/v1.0/samplers', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_samplers():
    choices = arguments['sampler']['choices']
    choice_lst = [{"choice": choice} for choice in choices]
    return jsonify({"sampler": choice_lst})

@app.route('/api/v1.0/sites', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_sites():
    choices = arguments['site']['choices']
    choice_lst = [{"choice": choice} for choice in choices]
    return jsonify({"site": choice_lst})

@app.route('/api/v1.0/phases', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_phases():
    choices = allowed_phases
    choice_lst = [{"choice": choice} for choice in choices]
    return jsonify({"phase": choice_lst})

@app.route('/api/v1.0/runtypes', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_runtype():
    choices = arguments['run_type']['choices']
    choice_lst = [{"choice": choice} for choice in choices]
    return jsonify({"runtype": choice_lst})

#Saving preferences file
@app.route('/api/v1.0/run/<protein>/<protocol>/<runtype>/<cthermspeed>/<dthermspeed>/<sampler>/<mcmc>/<seedsperstate>/<stepsperseed>/<sweepspercycle>/<attemptspersweep>/<stepspersweep>/<crepxcycles>/<drepxcycles>/<site>/<sxcenter>/<sycenter>/<szcenter>/<sradius>/<sdensity>/<phase>/<cores>/<score>/<from_reps>/<to_reps>/<rmsd>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def save_preferences(protein, protocol, runtype, cthermspeed, dthermspeed, sampler, mcmc, seedsperstate, stepsperseed, sweepspercycle, attemptspersweep, stepspersweep, crepxcycles, drepxcycles, site, sxcenter, sycenter, szcenter, sradius, sdensity, phase, cores, score, from_reps, to_reps, rmsd):
    rmsd_n = " "
    score_n = " "
    if rmsd == "false":
        rmsd_n = "#"

    if score == "Score" or score == "None":
        score_n = "#"

    args = ["./create_saved_args.sh", runtype, protocol, cthermspeed, dthermspeed, sampler, mcmc, seedsperstate, stepsperseed, sweepspercycle, attemptspersweep, stepspersweep, crepxcycles, drepxcycles, site, sxcenter, sycenter, szcenter, sradius, sdensity, phase, cores, score, from_reps, to_reps, rmsd, score_n, rmsd_n]
    p = subprocess.Popen(args, stdout=subprocess.PIPE)
    f = open(os.path.join(TARGET, protein, "AlGDock/saved_arguments.py"), 'w')
    f.write(p.stdout.read())
    f.close()
    return "Preferences File Saved"

#Run button
@app.route('/api/v1.0/run/<protein>/<ligand>/<email>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def run(protein, ligand, email):
    run_string = "python " + os.path.join(AlGDock, "../Pipeline/run_anchor_and_grow.py") + " --max_jobs 20 --email " + email + " --ligand " + os.path.join(TARGET, "ligands","dock_in", ligand + ".A__") + " --receptor " + os.path.join(TARGET, "proteins", protein)
    os.chdir(os.path.join(TARGET,"users")) #change the current working dir to TARGET/users
    try:
        os.makedirs(email) #try to create the email folder inside TARGET/users/
    except OSError as exception:
        if exception.errno != errno.EEXIST:
            raise
    os.chdir(os.path.join(TARGET, "users", email))
    print run_string
    os.system(run_string)
    return "Job Sent to Cluster"

#Prepare ligands button
@app.route('/api/v1.0/prepLigandLibrary/<protein>/<ligand>/<email>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def prepareLigandLibrary(protein, ligand, email):
    run_string = "python " + os.path.join(AlGDock, "../Pipeline/run_prep_ligand_for_dock.py") + " " + ligand + " --email " + email
    os.chdir(os.path.join(TARGET, protein, "ligand"))
    print run_string
    os.system(run_string)
    return "Ligand is being prepared."
    
#Download button
@app.route('/api/v1.0/download/<email>/<protein>/<ligand>', methods=['GET', 'POST'])
@crossdomain(origin='*')
def download(email, protein, ligand):
    upload_dir = os.path.join(TARGET, "users", email, protein); #change to directory in which results are stored
    file = "%s.mol2.gz" % ligand
    print "Attempting to download ", file, " from directory ", upload_dir
    return send_from_directory(directory=upload_dir, filename=file)
	
if __name__ == '__main__':
    app.run(debug=True)
