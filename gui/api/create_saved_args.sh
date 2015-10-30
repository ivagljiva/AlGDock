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
SCORE=${22}
FROM_REPS=${23}
TO_REPS=${24}
RMSD=${25}
SCORE_NONE=${26}
RMSD_NONE=${27}

# Define the template for BindingPMF preferences
cat << EOF
class args_saved:
  protocol = '$PROTOCOL'
  cool_therm_speed = $COOL_THERM_SPEED
  dock_therm_speed = $DOCK_THERM_SPEED 
  sampler = '$SAMPLER'
  MCMC_moves = $MCMC_MOVES
  steps_per_seed = $STEPS_PER_SEED
  seeds_per_state = $SEEDS_PER_STATE
  sweeps_per_cycle = $SWEEPS_PER_CYCLE
  attempts_per_sweep = $ATTEMPTS_PER_SWEEP
  steps_per_sweep = $STEPS_PER_SWEEP
  cool_repX_cycles = $COOL_REPX_CYCLES
  dock_repX_cycles = $DOCK_REPX_CYCLES
  site = '$SITE'
  site_density = $SITE_DENSITY.
  phases = ['$PHASES']
  site_max_R = $SITE_MAX_R.
  cores = $CORES
  site_center=[$X, $Y, $Z]
  run_type = '$RUN_TYPE'
  $SCORE_NONEscore = '$SCORE'
  $RMSD_NONErmsd = $RMSD
  reps = [$FROM_REPS,$TO_REPS]
EOF