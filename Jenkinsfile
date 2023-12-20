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
        script {
            mail to: 'tamiyabuild@gmail.com',
                 subject: 'Build thành công Server của app Tamiya',
                 body: 'Build thành công \nXem thêm chi tiết\nBuild Number: ${BUILD_NUMBER}\nVersion: ${VERSION_NUMBER}',
        }
    }
    failure {
        script {
            mail to: 'tamiyabuild@gmail.com',
                 subject: 'Build lỗi Server của app Tamiya',
                 body: 'Build lỗi'
        }
    }
}
}