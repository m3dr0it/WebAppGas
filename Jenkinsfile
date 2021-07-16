
pipeline {
    agent any
    environment {
        HOME = '.'
    }
   stages {
    stage('Node Install') {
      agent {
       docker {
         image 'node:10.6.0-alpine'
     }
  }
  steps {
      sh 'echo jancuk'
       }
     }
     stage('Docker Build Image') {
      agent any
      steps {
        sh 'docker build -t webappgas .'
      }
    }
    stage('Running Docker') {
      agent any
      steps {
           sh '''#!/bin/bash
                 if [ ! "$(docker ps -q -f name=webappgas)" ]; then
                     if [ "$(docker ps -aq -f status=exited -f name=webappgas)" ]; then
                         # cleanup
                         docker rm webappgas
                     fi
                     # run your container
                     docker run -d -p 9999:3000 --name webappgas --restart=always code/mlog-web-management:latest
                  else
                  docker container stop webappgas
                  docker rm webappgas
                  docker run -d -p 8085:80 --name webappgas --restart=always webappgas
                  # docker system prune --volumes -fa
                 fi
              '''
      }
    }
   }
   post {
     success {
        echo 'success'
     }
     failure {
        echo 'failure'
     }
     unstable {
        echo 'unstable'
     }
   }
 }
