FROM node:14-alpine
 
# Set the working directory in the container
WORKDIR /usr/src/app
 
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the entire application to the working directory
COPY . .
 
# Build the React app
RUN npm run build
 
# Expose the port that the app will run on
EXPOSE 3000
 
# Specify the command to run your application
CMD ["npm", "start"]
