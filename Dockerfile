FROM public.ecr.aws/lambda/nodejs:16

# Install system dependencies
RUN yum -y install gcc-c++ gcc java-1.8.0-openjdk java-1.8.0-openjdk-devel

# Set the working directory
WORKDIR /var/task

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to run the Lambda function
CMD ["src/index.handler"]
