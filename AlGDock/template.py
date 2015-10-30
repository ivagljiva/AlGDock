import AlGDock.BindingPMF_plots
import os, shutil, glob

for run_type in ['all']:
  self = AlGDock.BindingPMF_plots.BPMF_plots(\
    dir_dock='dock', dir_cool='cool',\
    ligand_tarball='prmtopcrd/ligand.tar.gz', \
    ligand_database='ligand.db', \
    forcefield='prmtopcrd/gaff.dat', \
    ligand_prmtop='ligand.prmtop', \
    ligand_inpcrd='ligand.trans.inpcrd', \
    receptor_tarball='prmtopcrd/receptor.tar.gz', \
    receptor_prmtop='receptor.prmtop', \
    receptor_inpcrd='receptor.trans.inpcrd', \
    receptor_fixed_atoms='receptor.pdb', \
    complex_tarball='prmtopcrd/complex.tar.gz', \
    complex_prmtop='complex.prmtop', \
    complex_inpcrd='complex.trans.inpcrd', \
    complex_fixed_atoms='complex.pdb', \
    score = 'prmtopcrd/anchor_and_grow_scored.mol2', \
    dir_grid='grids', \
    protocol='$protocol', cool_therm_speed=$cthermspeed, dock_therm_speed=$dthermspeed,\
    sampler='$sampler', \
    MCMC_moves=$mcmc, \
    seeds_per_state=$seedsperstate, steps_per_seed=$stepsperseed,
    sweeps_per_cycle=$sweepspercycle, attempts_per_sweep=$attemptspersweep, steps_per_sweep=$stepspersweep,
    cool_repX_cycles=$crepxcycles, dock_repX_cycles=$drepxcycles, \
    site='$site', site_center=[$sxcenter, $sycenter, $szcenter], site_max_R=$sradius, \
    site_density=$sdensity, \
    phases=['$phases'], \
    cores=$cores, \
    rmsd=$rmsd)
  self._run(run_type)
  del self
