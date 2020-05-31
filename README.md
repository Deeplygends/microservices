# M2 MIAGE IF Microservices project

Authors :
- Mickaël Peeren
- Quentin Sauvage
    

### Project of an application built with microservices.

This application manages books, readers and the ability for the readers to borrow books.
It consits of three distinct microservices : book, reader and borrow.

This application has been built to be fully runnable on Docker.

To build the application, please follow the instructions :
- install Docker Desktop for Windows from url : ...
- install Maven 3.6.3 from url :
- clone this repository using the following command : `git clone https://github.com/Deeplygends/microservices.git`
- for each microservice (bookservices, borrowservices and readerservices) : go into the root folder (ex : `cd bookservices`)
- build the service package using the command `mvn package`
- build the Docker image of this service using `docker build -t <servicename> .`
- run the Docker image (this creates a container) using `docker run -p <hostport>:<dockerport> <servicename>:latest`, i.e.
    - `docker run -p 8001:8001 bookservices:latest`
    - `docker run -p 8002:8002 readerservices:latest`
    - `docker run -p 8003:8003 borrowservices:latest`
