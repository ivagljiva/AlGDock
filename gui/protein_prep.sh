#!/bin/bash

# Attempted automation of pipeline.txt to prepare protein files for docking

echo $TARGET;	# double check that this is set to the correct directory: /home/ldasilva/target/

# parse command line argument to get protein sequence file
for i in "$@"
do
case $i in
	-p=*|--protein=*)	# protein sequence file should go after =
	SEQUENCE="${i#*=}"
	echo 'Sequence file is $SEQUENCE';
	shift	# go to next argument
	;;
	# you can add more arguments here in same format
	*)
	# unknown argument
	echo 'Argument $i is not known';
esac #end case statement
shift
done