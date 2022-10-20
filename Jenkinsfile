def COLOR_MAP = ['SUCCESS': 'good', 'FAILURE': 'danger', 'UNSTABLE': 'danger', 'ABORTED': 'danger']
def FRONTEND_SERVER_IP = "192.168.26.210"

pipeline {
  agent any
    
  tools {nodejs "NodeJS"}
    
  stages {
    stage('Prepare environment'){
      steps {
        git branch: 'dev', credentialsId: '5bc18525-2edd-46ac-b937-b289ae7972e3', url: 'http://192.168.14.31/barqsystems/e-invoicing/e-invoicingfe.git'
        sh 'npm cache verify'
        sh 'npm ci --keep'
        sh 'mv -f ".env.example" ".env"'
      }
    }

    stage('Build'){
      steps{
        sh 'npm run build'
        sh 'ls -al'
      }
    }

    stage('Deploy'){
      steps{
        sh "scp -r server.js build node_modules root@${FRONTEND_SERVER_IP}:/var/www/html/einvoice/client/"
        sh "ssh root@${FRONTEND_SERVER_IP} pm2 restart all"
      }
    }
  }
}
