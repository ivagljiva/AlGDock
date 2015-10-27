#!/bin/sh

# Specify arguments
RUN_TYPE=$1
PROTOCOL=$2
COOL_THERM_SPEED=$3
DOCK_THERM_SPEED=$4
SAMPLER=$5
MCMC_MOVES=$6
SEEDS_PER_STATE=$7
STEPS_PER_SEED=$8
SWEEPS_PER_CYCLE=$9
ATTEMPTS_PER_SWEEP=${10}
STEPS_PER_SWEEP=${11}
COOL_REPX_CYCLES=${12}
DOCK_REPX_CYCLES=${13}
SITE=${14}
X=${15}
Y=${16}
Z=${17}
SITE_MAX_R=${18}
SITE_DENSITY=${19}
PHASES=${20}
CORES=${21}
RMSD=${22}

# Define the template for BindingPMF preferences
cat << EOF
import AlGDock.BindingPMF_plots
import os, shutil, glob

self = AlGDock.BindingPMF_plots.BPMF_plots(
  dir_dock='dock', dir_cool='cool',
  ligand_tarball='prmtopcrd/ligand.tar.gz',
  ligand_database='ligand.db',
  forcefield='prmtopcrd/gaff.dat',
  ligand_prmtop='ligand.prmtop',
  ligand_inpcrd='ligand.trans.inpcrd',
  receptor_tarball='prmtopcrd/receptor.tar.gz',
  receptor_prmtop='receptor.prmtop',
  receptor_inpcrd='receptor.trans.inpcrd', 
  receptor_fixed_atoms='receptor.pdb', 
  complex_tarball='prmtopcrd/complex.tar.gz', 
  complex_prmtop='complex.prmtop', 
  complex_inpcrd='complex.trans.inpcrd', 
  complex_fixed_atoms='complex.pdb', 
  score = 'prmtopcrd/anchor_and_grow_scored.mol2', 
  dir_grid='grids', 
  protocol='$PROTOCOL', cool_therm_speed=$COOL_THERM_SPEED, dock_therm_speed=$DOCK_THERM_SPEED,
  sampler='$SAMPLER', 
  MCMC_moves=$MCMC_MOVES, 
  seeds_per_state=$SEEDS_PER_STATE, steps_per_seed=$STEPS_PER_SEED,
  sweeps_per_cycle=$SWEEPS_PER_CYCLE, attempts_per_sweep=$ATTEMPTS_PER_SWEEP, steps_per_sweep=$STEPS_PER_SWEEP,
  cool_repX_cycles=$COOL_REPX_CYCLES, dock_repX_cycles=$DOCK_REPX_CYCLES, 
  site='$SITE', site_center=[$X, $Y, $Z], site_max_R=$SITE_MAX_R, 
  site_density=$SITE_DENSITY, 
  phases=['$PHASES'], 
  cores=$CORES, 
  rmsd=$RMSD)
self._run($RUN_TYPE)
del self
EOF