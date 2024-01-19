
export $(cat .env | xargs)
sudo docker build --build-arg EAS_USERNAME --build-arg EAS_PASSWORD -f packages/application/Dockerfile .