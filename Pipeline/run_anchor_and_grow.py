# Runs a set of anchor and grow calculation with UCSF DOCK 6
# To be run from the [TARGET]/dock6/ directory

# Constants
job_block = 5
# If it takes ~30 minutes per docking, then 5 docking should take 2.5 hours

# set the arguments for run_anchor_and_grow.py and the help file
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--ligand', \
  default='../ligand/dock_in', \
  help='The root directory to look for ligand mol2 files or a single file (SYBYL atom types)')
parser.add_argument('--library_requirement', default=None, \
  help='The ligand file name must contain the string LIBRARY_REQUIREMENT')
parser.add_argument('--receptor', \
  default='../receptor/dock_in', \
  help='The directory to look for receptors or a single receptor site file (spheres). Grids should have the same prefix.')
parser.add_argument('--output', default='.', \
  help='The root directory to put the dock 6 anchor and grow output')
parser.add_argument('--job_block', default=job_block, type=int, \
  help='Number of dockings per job')
parser.add_argument('--run_number', default=None, type=int,
  help='Up to RUN_NUMBER anchor and grow jobs will run' + \
    ' (if an argument is passed)')
parser.add_argument('--max_jobs', default=None, type=int)
parser.add_argument('--dry', action='store_true', default=False, \
  help='Does not actually submit the job to the queue')

parser.add_argument('--email', default='', type=str, help="Preferred email for notification")

args = parser.parse_args()

# Check for the existence of input files
import os, glob

# Store the ligands in the ligands_FNs var (.mol2 extension)
if os.path.isfile(args.ligand):
  ligand_FNs = [args.ligand]
elif os.path.isdir(args.ligand):
  args.ligand = os.path.abspath(args.ligand)
  ligand_FNs = glob.glob(os.path.join(args.ligand,'*/*.mol2'))
  if len(ligand_FNs)==0:
    ligand_FNs = glob.glob(os.path.join(args.ligand,'*.mol2'))
else:
  raise Exception('Ligand input %s is not a file or directory!'%args.ligand)
ligand_FNs = sorted([os.path.abspath(FN) for FN in ligand_FNs if os.path.getsize(FN)>0])

# Store the receptors in the receptor_FNs file (.sph extension)
if os.path.isfile(args.receptor):
  receptor_FNs = [args.receptor]
elif os.path.isdir(args.receptor):
  args.receptor = os.path.abspath(args.receptor)
  receptor_FNs = glob.glob(os.path.join(args.receptor,'*.sph'))
else:
  raise Exception('Receptor input %s is not a file or directory!'%args.receptor)

# Require nrg and bmp as well as sph files
receptor_FNs = [os.path.abspath(FN) for FN in receptor_FNs \
  if os.path.isfile(FN[:-4]+'.nrg') and os.path.isfile(FN[:-4]+'.bmp')]

if os.path.isdir(args.output):
  args.output = os.path.abspath(args.output)
else:
  raise Exception('Docking out %s is not a directory!')

# Find anchor_and_grow.py and qsub_command.py
import os, inspect, errno
dirs = {}
dirs['script'] = os.path.dirname(os.path.abspath(\
  inspect.getfile(inspect.currentframe())))
execfile(os.path.join(dirs['script'],'_external_paths.py'))
ancg_script = os.path.join(dirs['script'], 'anchor_and_grow.py')
qsub_script = os.path.join(dirs['script'], 'qsub_command.py')

print 'run_anchor_and_grow: %d ligands and %d receptors found'%(len(ligand_FNs),len(receptor_FNs))

if (args.library_requirement is not None):
  ligand_FNs = [FN for FN in ligand_FNs \
    if FN[len(args.ligand)+1:].find(args.library_requirement)>-1]
  print 'run_anchor_and_grow: %d ligand(s) meet the library requirement'%(len(ligand_FNs))

if (args.run_number is not None) and (args.run_number < len(ligand_FNs)):
  import numpy as np
  inds_o = set([int(np.floor(ind)) \
    for ind in np.linspace(0,len(ligand_FNs)-1,args.run_number)])
  ligand_FNs = [ligand_FNs[ind] for ind in inds_o]
  print 'run_anchor_and_grow: %d ligand(s) will be prepared'%(len(ligand_FNs))

import subprocess

command_list = []
out_FNs = []
out_remaps = []
code_list = []
job_count = 0
for receptor_FN in receptor_FNs:
  labels = {'receptor':os.path.basename(receptor_FN[:-4])}
  for ligand_FN in ligand_FNs:                              # combine each receptor with each ligand
    labels['key'] = os.path.basename(ligand_FN[:-5])
    labels['library'] = '.'.join(os.path.dirname(\
      ligand_FN[len(args.ligand)+1:]).split('.')[:-1])
    #the out_prefix is the path that the output will be stored
    try:
        path = str(labels['receptor'])+str(labels['library'])+'/'+str(labels['key'])
        print 'path %s'%(path)
        os.makedirs(path)
    except OSError as exception:
        if exception.errno != errno.EEXIST:
        	raise
    out_prefix = os.path.join(args.output, path,'output')
    print 'out: %s'%(out_prefix)
    if not (os.path.exists(out_prefix+'.mol2.gz') or os.path.exists(out_prefix+'.nc')):
      out_FN = out_prefix + '.mol2.gz'
      command = 'python {0} {1} {2} {3}'.format(
        ancg_script, ligand_FN, receptor_FN, out_FN)        # run anchor_and_grow.py for this combination
      command_list.append(command)                          #add the command above to the command_list to be executed
      out_FNs.append(out_FN)                                #append the output into out_FNs
      if os.path.basename(out_FN)!=out_FN:
        out_remaps.append(os.path.basename(out_FN))
        out_remaps.append(out_FN)
      code_list.append(labels['key'])
    ncommands = len(command_list)
    if ncommands==args.job_block or \
      ((ncommands>0) and (ligand_FN==ligand_FNs[-1])):
      command = '; '.join(command_list)
      name = labels['receptor'] + '-' + '.'.join(code_list)
      print 'run_anchor_and_grow: command %s'%(command)
      system_command = ' '.join(['python',qsub_script,\
        name, "'"+command+"'", \
        '--input_files', ancg_script, \
        receptor_FN[:-4]+'.nrg', receptor_FN[:-4]+'.bmp', \
        '--output_files', ' '.join(out_FNs), \
        {True:'--output_remaps ' + ' '.join(out_remaps), \
         False:''}[len(out_remaps)>0], \
        {True:'--dry',False:''}[args.dry], '--email', args.email])
      print 'run_anchor_and_grow: system_command %s'%(system_command)
      os.system(system_command)
      command_list = []                                   #restart variables
      out_FNs = []
      out_remaps = []
      code_list = []
      job_count += 1
      print 'run_anchor_and_grow: Submitted %d jobs'%(job_count)
      if (args.max_jobs is not None) and (job_count>=args.max_jobs):
        break
  if (args.max_jobs is not None) and (job_count>=args.max_jobs):
    break
