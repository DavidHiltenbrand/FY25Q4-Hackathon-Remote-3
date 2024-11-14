#!/bin/bash

API_PUBLIC_KEY="hxzhsqhk"
API_PRIVATE_KEY="8ecf9730-4b93-410f-b3a9-6dac6919888c"
ORG_ID="63f8e44abde48371c649f6ac"
PROJECT_ID="673395a41b179b0ef19bb17a"


brew install mongodb-atlas-cli

atlas config init

#This isn't working for some reason, syntax appears correct to documentation.
atlas clusters onlineArchive create --clusterName telcoDemo --db equipment_monitor --collection events --dateField timestamp --archiveAfter 1

