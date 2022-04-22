#!/bin/bash

# script to be executed on EC2 instance start up/reboot
# https://aws.amazon.com/premiumsupport/knowledge-center/execute-user-data-ec2/

# need to source directly since this script runs on startup of instance
# meaning it's early enough in lifecycle that we don't have our typical environment
source /home/ec2-user/.bashrc

# clean jenkins workspace + logs
rm -rf /var/lib/jenkins/workspace/*
rm -rf /var/log/jenkins/*

PUBLIC_IP=$(curl http://checkip.amazonaws.com | xargs)
echo "PUBLIC_IP: $PUBLIC_IP, JENKINS_API_TOKEN: $(echo $JENKINS_API_TOKEN | cut -c 1-4)" >> /home/ec2-user/startup_var.txt

sudo curl -X POST \
    -u didishouchang:"$JENKINS_API_TOKEN" \
    --max-time 30 \
    "http://localhost:8080/job/ec2_startup/buildWithParameters?BRANCH=main&TRIGGER_DOWNSTREAM_JOBS=true" >> /home/ec2-user/startup_request.log
