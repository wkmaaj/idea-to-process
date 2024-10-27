# use an official Node.js runtime as a parent image
FROM node:20-alpine

# set the working directory inside the container
WORKDIR /app

# copy package.json and package-lock.json to the working directory
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code to the container
COPY . .

# expose port 3000 for the Next.js app
EXPOSE 3000

# command to run the Next.js app in development mode
CMD ["npm", "run", "dev"]
