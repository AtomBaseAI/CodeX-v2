FROM public.ecr.aws/lambda/nodejs:14

# Install system dependencies
RUN yum -y install gcc-c++ gcc java-1.8.0-openjdk java-1.8.0-openjdk-devel

# Set the working directory
WORKDIR /var/task

# Copy the application code
COPY . .

# Install npm dependencies
RUN npm install

# Set the command to run the Lambda function
CMD ["src/index.handler"]
