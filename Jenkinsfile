pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling latest code from GitHub...'
            }
        }

        stage('Test') {
            steps {
                echo 'Checking all files exist...'
                sh 'test -f index.html && echo "index.html OK"'
                sh 'test -f booking.html && echo "booking.html OK"'
                sh 'test -f confirm.html && echo "confirm.html OK"'
                sh 'test -f style.css && echo "style.css OK"'
            }
        }

        stage('Build') {
            steps {
                echo 'Packaging project files...'
                sh 'tar -czf cinebook.tar.gz index.html booking.html confirm.html style.css app.js'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying website to server...'
                sh 'sudo cp index.html booking.html confirm.html style.css app.js /var/www/html/'
                echo 'Website is live!'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed! Website deployed successfully.'
        }
        failure {
            echo 'Something went wrong. Check the logs.'
        }
    }
}