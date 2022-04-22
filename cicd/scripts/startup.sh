#!/bin/bash

# script to be executed on EC2 instance start up/reboot
# https://aws.amazon.com/premiumsupport/knowledge-center/execute-user-data-ec2/

echo "Starting up Jenkins job"
echo "Using API Token starting with: $(echo $JENKINS_API_TOKEN | cut -c 1-4)"
PUBLIC_IP=$(curl http://checkip.amazonaws.com | xargs)
echo "EC2 public IP: $PUBLIC_IP"

sudo curl -X POST \
    -u didishouchang:"$JENKINS_API_TOKEN" \
    --max-time 30 \
    "http://localhost:8080/job/ec2_startup/buildWithParameters?BRANCH=main&TRIGGER_DOWNSTREAM_JOBS=true"

touch /home/ec2-user/startup_script_ran
