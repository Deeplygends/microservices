# M2 MIAGE IF Microservices project

Authors :
- Mickaël Peeren
- Quentin Sauvage
    

### Project of an application built with microservices.

This application manages books, readers and the ability for the readers to borrow books.
It consits of three distinct microservices : book, reader and borrow.

This application has been built to be fully runnable on Docker.

To build and run the application on a Windows environment, please follow the instructions :
- install Docker Desktop for Windows from url : ...
- install Maven 3.6.3 from url : ...
- clone this repository using the following command : `git clone https://github.com/Deeplygends/microservices.git`
- for each microservice (bookservices, borrowservices and readerservices) : 
    - go into the root folder (ex : `cd bookservices`)
    - build the service package using the command `mvn package`
    - build the Docker image of this service using `docker build -t <docker-image-servicename> .`
    - run the Docker image (this creates a container) using `docker run -p <hostport>:<dockerport> <docker-image-servicename>:latest`, therefore we have to run :
        - `docker run -p 8001:8001 bookservices:latest` (if your docker image is named `bookservices`)
        - `docker run -p 8002:8002 readerservices:latest`
        - `docker run -p 8003:8003 borrowservices:latest`
- install WAMP server from url : ...
- copy/paste the `front` folder from this repository to `C:\wamp\www`
- open your favorite browser (i.e. not IE) and browse `http://localhost/front`
- enjoy your book borrower application :)

To forgive us for the long tutorial, here's a Mr Potato in ASCII :

      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░                          ░░░░░░░░░░░░░░
        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██████████████████████░░                      ░░░░░░░░░░    
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓██████████████████████▓▓▒▒                        ░░░░      
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓██████████████████████████▓▓▓▓          ░░        ░░░░        
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░████████████████████████████████  ██████░░          ░░          
░░░░░░░░░░░░░░░░░░░░░░░░░░  ░░████▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓██▓▓██                        
░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████████      ░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░      ▓▓▓▓██████████████████████████████████▓▓████▓▓    ░░  ░░░░░░░░░░░░░░░░
              ░░░░░░░░░░░░████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░██████    ░░░░░░░░░░░░░░
  ░░  ░░          ░░░░  ██░░░░░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████░░░░░░██░░░░    ░░░░░░░░
                    ░░██░░██████▒▒▒▒██████▒▒▒▒▒▒▒▒▒▒██████▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░░░████░░██              
                    ░░██░░░░████▒▒██▓▓▓▓▓▓██▒▒▒▒▒▒██▓▓▓▓▓▓██▒▒▒▒▒▒▒▒▒▒▒▒██░░██████░░██░░            
                      ██░░░░░░██▒▒██    ░░██▒▒▒▒▒▒██      ██▒▒▒▒▒▒▒▒▒▒▒▒██░░██░░░░░░██              
                      ██░░░░░░██▒▒░░▓▓▓▓▓▓░░▒▒▒▒▒▒░░▓▓▓▓▓▓░░▒▒▒▒▒▒▒▒▒▒▒▒██░░██░░░░░░██              
                      ██░░░░██▒▒▒▒  ██████░░▒▒▒▒▒▒  ██████  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░░░░░░░██              
                        ██░░██▒▒▒▒  ████▓▓░░▒▒▒▒▒▒░░██████░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░░░░░██                
                          ██▒▒▒▒▒▒██▓▓▓▓▓▓██▒▒▒▒▒▒██▓▓▓▓▓▓██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████                  
                          ██▒▒▒▒▒▒▒▒▓▓▓▓▓▓▒▒▓▓▓▓▒▒▒▒▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░                  
                          ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▓▓▓▓                
                  ░░  ▓▓██▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░░░░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██      ▓▓▒▒            
░░░░░░░░░░░░░░░░░░▓▓▓▓░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░░░░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██    ░░░░░░▒▒░░░░░░░░░░
░░░░░░░░░░░░░░░░▓▓░░░░  ██▒▒▒▒▒▒▒▒▒▒▒▒▓▓░░░░░░░░██▓▓██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒  ░░▓▓░░░░░░░░
░░░░░░░░░░░░░░▓▓░░  ▓▓▓▓██▒▒▒▒▒▒▒▒▒▒██░░░░░░░░░░░░░░░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░▓▓▒▒░░  ▓▓░░░░░░
░░░░░░░░░░░░░░▓▓  ▓▓▓▓░░██▒▒▒▒▒▒▒▒▒▒██░░░░░░░░░░░░░░░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░░░▓▓▓▓  ▓▓░░░░░░
░░░░░░░░░░▒▒▒▒▓▓  ▓▓▓▓░░██▒▒▒▒▒▒▒▒▒▒██▓▓░░░░░░▓▓▓▓▓▓▓▓██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░░░▓▓▓▓  ▓▓▓▓░░░░
░░░░░░▒▒░░▓▓      ▓▓▓▓▓▓▓▓▒▒▒▒▒▒██████████████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░▓▓▓▓▓▓      ▓▓░░
▒▒▒▒▒▒▒▒▓▓░░        ░░▒▒██▒▒▒▒▓▓████▓▓████▓▓████▓▓████▓▓██▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▓▓▒▒░░░░░░    ░░▓▓
▒▒▒▒▒▒▒▒▓▓  ░░        ▒▒▓▓▓▓▓▓▓▓██▓▓██████▓▓██████▓▓▓▓██▓▓████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▓▓▒▒    ░░░░  ░░▓▓
▒▒░░▒▒▒▒▓▓        ▒▒  ▒▒▓▓▓▓▓▓▓▓██▓▓██████▓▓██████▓▓████▓▓████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▓▓▒▒░░▒▒        ▓▓
▒▒▒▒▒▒▒▒▓▓░░      ▓▓▒▒▓▓▒▒██▓▓▒▒▒▒▒▒▓▓▓▓▒▒▓▓▓▓▒▒▓▓▓▓▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▒▒▓▓▓▓▒▒        ▓▓
▒▒▒▒▒▒▒▒▒▒▓▓░░    ▓▓▓▓▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▓▓▒▒░░    ▓▓▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
