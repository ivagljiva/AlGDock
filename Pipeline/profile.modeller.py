# To be run with modeller.
# The location of pdball.bin should be passed as an argument.
# The protein sequence file should be passed as the second argument.

import modeller
import os

modeller.log.none()
env = modeller.environ()

print "The arguments are: ", str(sys.argv)
if len(sys.argv) != 3:
	sys.exit("Not enough parameters were passed. You need to provide the full path to pdball.bin and the protein sequence file")
	
#-- Read in the binary database
pdball_FN = '/Users/dminh/Documents/modeller/pdball.bin'
if not os.path.isfile(pdball_FN):
  import sys
  pdball_FN = sys.argv[1]
  if not os.path.isfile(pdball_FN):
    raise Exception('PDB sequences not found in %s!'%pdball_FN)
print 'Reading PDB sequences from '+pdball_FN

sdb = modeller.sequence_db(env)
sdb.read(seq_database_file=pdball_FN, seq_database_format='BINARY',
         chains_list='ALL')

#-- Read in the target sequence/alignment
seq_file = sys.argv[2]
print "Running profile.modeller.py on ", seq_file, "\n"
aln = modeller.alignment(env)
aln.append(file=seq_file, alignment_format='PIR', align_codes='ALL')

#-- Convert the input sequence/alignment into
#   profile format
prf = aln.to_profile()

#-- Scan sequence database to pick up homologous sequences
prf.build(sdb, matrix_offset=-450, rr_file='${LIB}/blosum62.sim.mat',
          gap_penalties_1d=(-500, -50), n_prof_iterations=1,
          check_profile=False, max_aln_evalue=0.01)

#-- Write out the profile in text format
prf.write(file='profile.prf', profile_format='TEXT')

#-- Convert the profile back to alignment format
aln = prf.to_alignment()

#-- Write out the alignment file
aln.write(file='profile.ali', alignment_format='PIR')
