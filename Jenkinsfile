
pipeline {
    agent any
    environment {
        HOME = '.'
    }
   stages {
    stage('Node Install') {
      agent {
       docker {
         image 'node:14'
     }
  }
    steps {

       }
     }
     stage('Docker Build Image') {
      agent any
      steps {
        sh 'docker build -t m3droit/webappgas .'
      }
    }
    stage('Running Docker') {
      agent any
      steps {
           sh '''#!/bin/bash
                  docker run -d -p 9999:3000 --name webappgas --restart=always m3droit/webappgas
                  # docker system prune --volumes -fa
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
