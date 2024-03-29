FROM node:16-alpine3.11   
# Set the working directory inside the image
WORKDIR /app

# Copy the contents of the local project directory into the image at /app
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 to the Docker host, so we can access it
EXPOSE 3000

# Run the npm start command when the container launches
CMD ["npm", "start"]