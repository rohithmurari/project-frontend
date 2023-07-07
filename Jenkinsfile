pipeline {
    agent any
    tools {
        maven 'maven'
    }
    environment{
        TERM = 'xterm'
    }
  stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        // stage('Install Dependencies') {
        //     steps {
        //         sh 'npm ci'
        //     }
        // }
        stage('Build') {
            steps {
                // Build your JAR file here
                // For example, using Maven
                sh 'npm run build'
            }
        }
        stage('Transfer build file'){
              steps{
              sh """echo 'admin123' | sudo -S chmod 777 /var/lib/jenkins/workspace/cicd-frontend/dist/examfront/*"""
              sh """echo 'admin123' | sudo -S mv /var/lib/jenkins/workspace/cicd-frontend/dist/examfront/* /usr/share/nginx/html"""
              sh """echo 'admin123' | sudo -S chmod 777 /usr/share/nginx/html/*"""
              sh """sudo systemctl restart nginx"""
            }
        }
        
        // stage("Jar file transfer"){
        //     steps{
        //         sh """echo 'admin123' | sudo -S mv /var/lib/jenkins/workspace/cicd/target/examportal-0.0.1-SNAPSHOT.jar /home/ubuntu/project/"""
        //         sh """echo 'admin123' | sudo -S mv /home/ubuntu/project/examportal-0.0.1-SNAPSHOT.jar /home/ubuntu/project/examportal.jar"""
        //         sh """echo 'admin123' | sudo -S chmod 777 /home/ubuntu/project/examportal.jar"""
        //         // sh "admin123' | sudo -S ls"
        //     }
        // }
        // stage("Running jar file"){
        //     steps{
        //         // sh 'sudo java -jar /home/ubuntu/project/examportal.jar'
        //         // sh """echo 'admin123' | -S systemctl enable examportal"""
        //         // sh """echo 'admin123' | -S systemctl start examportal"""
        //         sh """sudo systemctl enable examportal"""
        //         sh """sudo systemctl start examportal"""
        //         sh """sudo systemctl restart examportal"""
        //         // sh 'sudo cd /home/ubuntu/project'
        //         // sh 'sudo java -jar /home/ubuntu/project/examportal.jar'
        //     }
        // }
    }
}
