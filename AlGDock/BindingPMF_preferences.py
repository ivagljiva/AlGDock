import AlGDock.BindingPMF_plots
import os, shutil, glob

for run_type in ['all']:
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
    protocol='Adaptive', cool_therm_speed=1, dock_therm_speed=1,
    sampler='NUTS', 
    MCMC_moves=1, 
    seeds_per_state=1, steps_per_seed=1,
    sweeps_per_cycle=1, attempts_per_sweep=1, steps_per_sweep=1,
    cool_repX_cycles=1, dock_repX_cycles=1, 
    site='Sphere', site_center=[1, 1, 1], site_max_R=1, 
    site_density=1, 
    phases=['Gas'], 
    cores=-1, 
    rmsd=true)
  self._run(run_type)
  del self
