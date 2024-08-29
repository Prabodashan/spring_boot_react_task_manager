## Introduction

The Task Manager application is a simple yet effective tool designed to help users manage their tasks efficiently. It allows users to add, edit, and delete tasks with ease, providing a streamlined experience for personal or professional task management. The application features a robust backend built with Spring Boot, while the frontend, developed using React, offers a responsive and intuitive user interface. Data is securely stored in a MySQL database. The entire application is containerized using Docker.

## Prerequisites

Before running the application, ensure that you have the following installed:

- **Java Development Kit (JDK) 17** or higher: [Download JDK 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- **Maven**: [Download Maven](https://maven.apache.org/download.cgi)
- **MySQL** (or other database if applicable): Ensure that you have MySQL installed and running if your application connects to a database. [Download MySQL](https://dev.mysql.com/downloads/)
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Prabodashan/spring_boot_react_task_manager

   ```

2. **Navigate into the project directory:**

   cd spring_boot_react_task_manager

3. **Configure the database:**

   Update the application.properties or application.yml file with your database configuration:

   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password

4. **Install dependencies:**

   Use Maven to install all required dependencies:

   mvn clean install

Follow these steps to set up the project using docker:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Prabodashan/spring_boot_react_task_manager

   ```

2. **Navigate into the project directory:**

   cd spring_boot_react_task_manager

3. **Build the Docker images:**

   If your docker-compose.yml file includes a build section, you can build the Docker images using the following command:

   docker compose build

## Running the Application

To run the Spring Boot application locally, execute the following command:

    mvn spring-boot:run

Or, if you prefer to run the packaged JAR file:

    1. Package the application:

        mvn package

    2. Run the JAR file:

        java -jar target/your-application-name.jar

To run the Spring Boot application using docker, execute the following command:

    docker compose up

or, If you want to run the containers in the background, use the -d flag:

    docker compose up -d

The application should now be running at http://localhost:8080

## Stopping the Application

To stop the Spring Boot application locally, execute the following command:

    Ctrl + C

To stop the running containers, use the following command:

    docker compose down
