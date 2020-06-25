# STEP 1: Install base image. Optimized for Node
FROM node:14.4.0-stretch
# STEP 2: Install required dependencies.
COPY package.json package.json
RUN npm install 
# STEP 3: Copy the source code in the current directory to the container.
ADD . /app
# STEP 4: Set working directory to /app so we can execute commands in it
WORKDIR /app
# STEP 5: Declare environment variables
ENV SECRET=asdasdasdasd
ENV MONGODB_URI=mongodb://localhost/reddit-js
ENV MONGO_PORT=27017
ENV PORT=3000
# STEP 6: Expose the port that Flask is running on
EXPOSE 3000

RUN npm install -g nodemon

# STEP 7: Run Flask!
CMD ["nodemon","server.js"]
