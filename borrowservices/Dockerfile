FROM openjdk:14
# FROM adoptopenjdk/openjdk11:alpine-jre

# Refer to Maven build -> finalName
ARG JAR_FILE=target/borrow-micro-services.jar

# cd /opt/app
WORKDIR /opt/app

# cp target/spring-boot-web.jar /opt/app/app.jar
COPY ${JAR_FILE} borrow-micro-services.jar

ENTRYPOINT ["java", "-jar", "borrow-micro-services.jar"]