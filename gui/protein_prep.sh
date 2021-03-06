#!/bin/bash

# Attempted automation of pipeline.txt to prepare protein files for docking
# Before running: download your protein sequence and save in a file with .ali extension
# For now at least, run this script from the same directory where you saved the protein
# This only automates the pipeline up to the analyze_profile.py point

# Usage: [PATH_TO_SCRIPT]/protein_prep.sh -p=prot_seq.ali

# Set paths
export TARGET=/home/ldasilva/target	# This directory contains the protein files
echo "TARGET is ${TARGET}" 
export ALGDOCKHOME=/home/iveseli/AlGDock	# This directory contains the scripts required by this pipeline
echo "ALGDOCKHOME is ${ALGDOCKHOME}"

# load module environments
module load modeller/9.14
module load canopy/1.5.0
module load ambertools/14

# default sequence file name:
SEQUENCE_FILE="seq.ali"

# parse command line argument to get protein sequence file
for i in "$@"
do
case $i in
	-p=*|--protein=*)	# protein sequence file should go after =
						# Example: ./protein_prep.sh -p=prot_seq.ali
	SEQUENCE_FILE="${i#*=}"
	shift	# go to next argument
	;;
	# you can add more arguments here in same format
	*)
	# unknown argument
	echo "Argument ${i} is not known. Did you forget the -p= argument prefix?";
esac #end case statement
shift
done

echo "Sequence file is ${SEQUENCE_FILE}";
# if sequence file is not named seq.ali, the script will break. 

# Prep PDB database files if necessary
PDB_PIRFILE="pdball.pir"	# database of all PDB sequences
PDB_BINFILE="pdball.bin"	# binary file converted from .pir
PATH_TO_PBD="${ALGDOCKHOME}/Pipeline"	# the above files should be stored in this directory
if [ ! -f $PATH_TO_PBD/$PDB_BINFILE ]; then
	# .bin file not found, so look for .pir
	if [ -f $PATH_TO_PBD/$PDB_PIRFILE ]; then
		echo "${PDB_PIRFILE} found."
	else
		echo "${PDB_PIRFILE} not found; downloading from modeller...."
		# .pir file not found, so download and unzip it
		wget -O $PATH_TO_PBD/pdball.pir.gz "http://salilab.org/modeller/downloads/pdball.pir.gz"
		gunzip pdball.pir.gz
	fi
	# once we have .pir file, convert it to .bin
	echo "Converting ${PDB_PIRFILE} to ${PDB_BINFIlE}"
	python $ALGDOCKHOME/Pipeline/pdball_pir2bin.modeller.py
fi

# From same directory as where the protein sequence is saved:
echo "Running profile.modeller.py on ${SEQUENCE_FILE}"
python $ALGDOCKHOME/Pipeline/profile.modeller.py $PATH_TO_PBD/$PDB_BINFILE $SEQUENCE_FILE
# Output files: profile.prf and profile.ali

echo "Running analyze_profile.py. For this to work, you need to have done ssh -Y to the cluster"
python $ALGDOCKHOME/Pipeline/analyze_profile.py
# Output histograms of sequence identity: figures/hist_seq_id.png and figures/hist_seq_id_selected.png
# This will also display the sequences that are present in the selected chains. 
# The sequences will be sorted in descending order of the number of sequence identity and the number of equivalent positions.
# Selected chains have 
	# * a sequence identity greater than min_seq_identity (90 by default) and
	# * at least min_equivalent_positions (1 by default) equivalent positions.
# The defaults can be modified in [TARGET]/receptor/search_options.py
# using, e.g.,
# min_seq_identity = 100
# min_equivalent_positions = 50
# See pipeline.txt for further explanation

echo "One iteration of analyze_profile.py has been completed. Check reference sequence and structure."

