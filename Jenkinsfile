pipeline {
    agent any

    triggers {
      pollSCM('H/5 * * * *') // Poll SCM every 5 minutes
    }

    environment {
        IMAGE_NAME_SERVER = 'molka0204/stock-server' // Docker Hub username
        IMAGE_NAME_CLIENT = 'molka0204/stock-client' // Docker Hub username
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo 'Starting Git checkout...'
                    git branch: 'main',
                        url: 'git@github.com:MolkaZaoui/Stock.git',
                        credentialsId: 'privatekey' // Jenkins credentials ID for GitHub SSH key
                }
            }
        }

        stage('Check for Changes') {
            steps {
                script {
                    echo 'Checking for changes in backend and frontend...'

                    // Detect changes in the backend folder
                    def backendChanged = sh(script: 'git diff --name-only HEAD~1 backend', returnStdout: true).trim()
                    env.BACKEND_CHANGED = backendChanged ? 'true' : 'false'
                    echo backendChanged ? "Changes detected in backend" : "No changes detected in backend"

                    // Detect changes in the frontend folder
                    def frontendChanged = sh(script: 'git diff --name-only HEAD~1 frontend', returnStdout: true).trim()
                    env.FRONTEND_CHANGED = frontendChanged ? 'true' : 'false'
                    echo frontendChanged ? "Changes detected in frontend" : "No changes detected in frontend"
                }
            }
        }

        stage('Build Images') {
            parallel {
                stage('Build Backend Image') {
                    when {
                        environment name: 'BACKEND_CHANGED', value: 'true'
                    }
                    steps {
                        script {
                            echo 'Building backend image...'
                            dir('backend') {
                                dockerImageServer = docker.build(IMAGE_NAME_SERVER)
                            }
                        }
                    }
                }
                stage('Build Frontend Image') {
                    when {
                        environment name: 'FRONTEND_CHANGED', value: 'true'
                    }
                    steps {
                        script {
                            echo 'Building frontend image...'
                            dir('frontend') {
                                dockerImageClient = docker.build(IMAGE_NAME_CLIENT)
                            }
                        }
                    }
                }
            }
        }

        stage('Scan Backend Image') {
            when {
                environment name: 'BACKEND_CHANGED', value: 'true'
            }
            steps {
                script {
                    echo 'Scanning backend image...'
                    sh """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                            aquasec/trivy:latest image --exit-code 1 \
                            --severity LOW,MEDIUM,HIGH,CRITICAL \
                            ${IMAGE_NAME_SERVER}
                    """
                }
            }
        }

        stage('Scan Frontend Image') {
            when {
                environment name: 'FRONTEND_CHANGED', value: 'true'
            }
            steps {
                script {
                    echo 'Scanning frontend image...'
                    sh """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                            aquasec/trivy:latest image --exit-code 1 \
                            --severity LOW,MEDIUM,HIGH,CRITICAL \
                            ${IMAGE_NAME_CLIENT}
                    """
                }
            }
        }

        stage('Push Images to Docker Hub') {
            parallel {
                stage('Push Backend Image') {
                    when {
                        environment name: 'BACKEND_CHANGED', value: 'true'
                    }
                    steps {
                        script {
                            echo 'Pushing backend image to Docker Hub...'
                            withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                                sh "docker login -u ${USERNAME} -p ${PASSWORD}"
                                dockerImageServer.push("${BUILD_NUMBER}") // Use build number for tagging
                            }
                        }
                    }
                }
                stage('Push Frontend Image') {
                    when {
                        environment name: 'FRONTEND_CHANGED', value: 'true'
                    }
                    steps {
                        script {
                            echo 'Pushing frontend image to Docker Hub...'
                            withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                                sh "docker login -u ${USERNAME} -p ${PASSWORD}"
                                dockerImageClient.push("${BUILD_NUMBER}")
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Cleaning up Docker resources...'

                // Remove dangling images (intermediate images with no tags)
                sh 'docker image prune -f'

                // Remove stopped containers
                sh 'docker container prune -f'

                // Optionally remove unused volumes
                sh 'docker volume prune -f'

                // Remove intermediate images (unused builder images)
                sh 'docker builder prune -f'
            }
        }
    }
}
