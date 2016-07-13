#!/bin/bash

# Attempted automation of pipeline.txt to prepare protein files for docking
# Before running: download your protein sequence and save in a file with .ali extension
# For now at least, run this script from the same directory where you saved the protein

# Set paths
export TARGET=/home/ldasilva/target	# This directory contains the protein files
echo "TARGET is ${TARGET}" 
export ALGDOCKHOME=/home/iveseli/AlGDock	# This directory contains the scripts required by this pipeline
echo "ALGDOCKHOME is ${ALGDOCKHOME}"
modeller=/export/apps/modeller/9.14/lib/x86_64-intel8/python2.5/_modeller.so:/export/apps/modeller/9.14/lib/x86_64-intel8/python3.0/_modeller.so:/export/apps/modeller/9.14/lib/x86_64-intel8/python3.2/_modeller.so:/export/apps/modeller/9.14/lib/x86_64-intel8/python3.3/_modeller.so # path to modeller
case ":${PATH:=$modeller}:" in
	*:$modeller:*)
	echo "Modeller found in path"
	;;
	*) export PATH=$PATH:$modeller # add modeller to path if necessary
esac
echo "PATH is ${PATH}"

# parse command line argument to get protein sequence file
for i in "$@"
do
case $i in
	-p=*|--protein=*)	# protein sequence file should go after =
						# Example: ./protein_prep.sh -p=prot_seq.ali
	SEQUENCE_FILE="${i#*=}"
	echo "Sequence file is ${SEQUENCE_FILE}";
	shift	# go to next argument
	;;
	# you can add more arguments here in same format
	*)
	# unknown argument
	echo "Argument ${i} is not known";
esac #end case statement
shift
done

# Prep PDB database files if necessary
PDB_PIRFILE="pdball.pir"	# database of all PDB sequences
PDB_BINFILE="pdball.bin"	# binary file converted from .pir
if [ ! -f $ALGDOCKHOME/Pipeline/$PDB_BINFILE ]; then
	# .bin file not found, so look for .pir
	if [ -f $ALGDOCKHOME/Pipeline/$PDB_PIRFILE ]; then
		echo "${PDB_PIRFILE} found."
	else
		echo "${PDB_PIRFILE} not found; downloading from modeller...."
		# .pir file not found, so download and unzip it
		wget "http://salilab.org/modeller/downloads/pdball.pir.gz"
		gunzip pdball.pir.gz
	fi
	# once we have .pir file, convert it to .bin
	mod9.15 $ALGDOCKHOME/Pipeline/pdball_pir2bin.modeller.py
fi

# From same directory as where the protein sequence is saved:
#python $ALGDOCKHOME/Pipeline/profile.modeller.py 