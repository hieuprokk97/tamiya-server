pipeline{
    agent any
    stages {
        stage('Clone'){
            steps{
                git "https://github.com/hieuprokk97/tamiya-server.git"
            }
        }
    }
    post {
    success {
        emailext (
            to: 'tamiyabuild@gmail.com', 
            subject: "Build Success - Version ${process.env.VERSION_NUMBER}", 
            body: """Custom content for success email.
            See attached log for details.
            
            Version: ${process.env.VERSION_NUMBER}
            """,
            attachLog: true
        )
    }
    failure {
        emailext (
            to: 'tamiyabuild@gmail.com', 
            subject: "Build Failure - Version ${process.env.VERSION_NUMBER}", 
            body: """Custom content for failure email.
            See attached log for details.
            
            Version: ${process.env.VERSION_NUMBER}
            """,
            attachLog: true
        )
    }
    }
}