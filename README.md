### About this Project
This demo application uses Netflix EUREKA, an open source REST service to find other services in Cloud.There is a "Hello World" service written in Node which tries to register itself to Eureka and keep sending its hertbeat to indicate that it is alive.This allows other applications to discover Hello World.

Eureka has been most widely used in AWS but supports custom DataCenters as well.

### What problem does it solve?
This allows for load-balancing between different instances of services and handle failover of middle tier servers.

### How to run this project?
The only prerequisite is to have Docker installed on your machine. No other software is required.
Follow the below steps to deploy and run and deploy it:

**Step1:** 

Clone this repository.

**Step2:**

Go to the eurekaServer directory in the cloned project and run the following commands to get the Eureka Server up and running on your local machine.

**Build Docker image for Eureka-Server**

```
docker build -t eureka-server:latest ./docker
```

**Run EurekaServer in Docker container**

```
TOMCAT_HOME=/tomcat/webapps/eureka/WEB-INF/classes; docker create --name eureka-server -p 8888:8080 -v `pwd`:$TOMCAT_HOME eureka-dev:latest; docker start eureka-server  
```

**Step3:**

Now to check if the EurekaServer is running properly, check the Admin UI for EurekaServer.

If using docker on Linux or the docker version that runs natively on Windows and Mac OSx hit this URL in the browser

```
http://localhost:888/eureka
```

If running Docker version that uses docker-machine for Mac OSx and Windows, hit the below URL in the browser. This is the docker-machine ip that is alloted to your docker.

```
http://192.168.99.100/eureka
```

You can also get this IP address by using the below comand on the Docker Terminal:

```
docker-machine ip
```

**Step4:**

Now we will run a Hello-World app that will register itself to Eureka-Server and will keep sending heartbeat every 30 seconds to Server indicating that it is healthy and alive.
Go to the node-app directory inside the cloned project and run the following commands to get the get Hello-World app up and running in another docker container.

**Build Docker image for a Hello-World app**

```
docker build -t node-app:latest ./docker
```

**Run Hello-World app in docker container**

```
docker create --name hello-world -p 9999:9999 -v `pwd`:/nodejs/apps  --link eureka-server node:latest; docker start hello-world

```
Note: Hello-World app is a node js application.It has a EurekaClient embedded in its code which is also written in node.

**Step5:**

Verify if Hello-World app registered itself with Eureka Server using the below URL. Refer to Step3 above to check the same. Now this time you should see Hello-World is visible on the Admin UI. This means the application registered itslef. 

   

### Why Separate EurekaClient?
Eureka has a Server and Client. But the inbuilt EurekaClient is implemented in Java.
So if your applications are written in language other than Java then there are 2 ways to use the EurekaClient.

1) To implement a EurekaClient in a programming language of your choice. There is a list Eureka REST operations that should be supported by the EurekaClient. You may chose to implement the operations according to your requirement. For this demo, I have written implmentations for:

- **Registration**: HelloWorld app register itself with Eureka-Server.
	
- **Heartbeat**:  The app sends heartbeat every 30 seconds.
	
2) Write a wrapper in your choice of language around the existing Java based EurekaClient,to call the respective functions.



