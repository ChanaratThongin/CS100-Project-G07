#!/bin/bash

# Update the instance
sudo yum update -y && sudo yum upgrade -y

# Install necessary packages
sudo yum install -y git
sudo yum install -y nodejs npm

# Install pm2 globally using npm
sudo npm install pm2 -g

# Go to the home directory of the current user
cd /home/ec2-user

# Clone the repository
git clone -b main https://github.com/ChanaratThongin/CS100-Project-G07.git

# Navigate to the project directory and install dependencies
cd /CS100-Project-G07/Backend
sudo npm install

# Start the application using pm2
sudo pm2 start index.js

# Save the current pm2 processes
sudo pm2 save

# Ensure pm2 starts on boot
sudo pm2 startup

sudo yum install -y nginx

sudo systemctl start nginx
sudo systemctl enable nginx

sudo cp /home/ec2-user/CS100-Project-G07/index.html /usr/share/nginx/html/
sudo cp -r /home/ec2-user/CS100-Project-G07/html /usr/share/nginx/html/
sudo cp -r /home/ec2-user/CS100-Project-G07/css /usr/share/nginx/html/
sudo cp -r /home/ec2-user/CS100-Project-G07/images /usr/share/nginx/html/
sudo cp -r /home/ec2-user/CS100-Project-G07/scripts /usr/share/nginx/html/

sudo nginx -s reload

# Restart Nginx to reflect the changes
sudo systemctl restart nginx