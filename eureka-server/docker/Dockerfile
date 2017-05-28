FROM ubuntu:16.04

RUN apt-get update && apt-get install -y unzip zip wget

#java1.8 jre
RUN mkdir /opt/java && \
    wget -qO- --header "Cookie: oraclelicense=accept-securebackup-cookie" --no-check-certificate http://javadl.oracle.com/webapps/download/AutoDL?BundleId=207765 | tar zxv -C /opt/java
ENV JAVA_HOME /opt/java/jre1.8.0_91
RUN export JAVA_HOME

#Tomcat9
RUN apt-get update &&\
  apt-get -y install ca-certificates &&\
  wget -q https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.0.M9/bin/apache-tomcat-9.0.0.M9.tar.gz.md5 &&\
  wget -q http://archive.apache.org/dist/tomcat/tomcat-9/v9.0.0.M9/bin/apache-tomcat-9.0.0.M9.tar.gz &&\
  md5sum -c apache-tomcat-9.0.0.M9.tar.gz.md5 &&\
  tar xzf apache-tomcat-9.0.0.M9.tar.gz &&\
  rm /apache-tomcat-*.tar.gz* &&\
  mv /apache-tomcat-9.0.0.M9 /tomcat &&\
  cd /tomcat/webapps &&\
  rm -Rf ROOT docs examples host-manager manager


#Eureka-Server
RUN mkdir -p /tomcat/webapps/eureka
ADD source/eureka-server-1.4.10-rc.1.war /tomcat/webapps/eureka/eureka-server-1.4.10-rc.1.war
RUN cd /tomcat/webapps/eureka && \
    unzip -qq eureka-server-1.4.10-rc.1.war

WORKDIR /tomcat/webapps/eureka

EXPOSE 8080

ENTRYPOINT ["/tomcat/bin/catalina.sh"]

CMD ["run"]


