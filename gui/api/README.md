## REST API
*Endpoint running on ccb cluster*

## Quick Start
Before running, REST.py requires 2 folders:
- TARGET: Folder containing the Protein and Ligand Library files.
```sh
# For Anthocyanin molecules
export TARGET=/home/dminh/AnthocyaninMechanism
export AlGDock_Pref=/home/<username>/AlGDock/AlGDock

# Run!
python REST.py
```

- AlGDock_pref: Folder containing AlGDock files. It is usually this:
```sh
export AlGDock_Pref=/home/<username on cluster>/AlGDock/AlGDock

# Run!
python REST.py
```
After these steps you can run the following:
```
# Run!
python REST.py
```
