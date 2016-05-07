#bin/bash
rm -rf build
webpack -p
scp -r -i ./../MyMac.pem build/ ec2-user@52.58.59.210:~/peltiassat/
