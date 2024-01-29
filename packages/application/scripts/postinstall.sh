#!/bin/bash

IP_ADDRESS=$(hostname -I | awk '{print $1}')
ENV_FILE="$(pwd)/.env"

echo "# This file has been generated by script/postinstall.sh" > "$ENV_FILE"
echo "EXPO_PUBLIC_SERVER_HOST=http://$IP_ADDRESS:5001/lockwire-9561c/us-central1" >> "$ENV_FILE"


