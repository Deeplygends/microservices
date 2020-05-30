FROM openjdk:14
# FROM adoptopenjdk/openjdk11:alpine-jre

# Refer to Maven build -> finalName
ARG JAR_FILE=target/book-micro-services.jar

# cd /opt/app
WORKDIR /opt/app

# cp target/spring-boot-web.jar /opt/app/app.jar
COPY ${JAR_FILE} book-micro-services.jar

ENTRYPOINT ["java", "-jar", "book-micro-services.jar"]