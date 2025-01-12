# Documentation détaillée - Projet DevOps pour une Application de Gestion de Stock

## Vue d'ensemble
Ce projet met en œuvre une solution DevOps pour une application de gestion de stock développée en **React** (front-end) et **Node.js** (back-end). L'application inclut des fonctionnalités pour gérer les **utilisateurs**, les **fournisseurs**, les **articles** et les **stocks**.  

Ce document explique les étapes détaillées de déploiement, configuration et utilisation de l'application, en intégrant les concepts suivants :
- Conteneurisation avec **Docker**.
- Intégration continue avec **Jenkins**.
- Déploiement sur un cluster **Kubernetes** local.
- Monitoring post-déploiement avec **Prometheus** et **Grafana**.

---

## 1. Instructions de Déploiement

### Prérequis
Assurez-vous d'avoir installé les outils suivants sur votre machine :
- **Docker** et **Docker Compose**.
- **Kubernetes** (avec Minikube, Kind, ou un autre cluster local).
- **kubectl** (pour interagir avec Kubernetes).
- **Jenkins** (serveur CI/CD).
- **Prometheus** et **Grafana** (pour le monitoring).

### Étapes de Déploiement

#### 1. Conteneurisation avec Docker
- Créez un réseau Docker pour l'application :
  ```bash
  docker network create stock-network
  ```

- Lancez les conteneurs nécessaires :
  ```bash
  docker run -d --name mongodb --network stock-network mongo
  docker run -d --name server --network stock-network -p 3000:3000 stock-server
  docker run -d --name client --network stock-network -p 3001:3001 stock-client
  ```

#### 2. Intégration continue avec Jenkins
- Lancez un conteneur Jenkins avec Docker :
  ```bash
  docker run -d -p 8080:8080 -p 50000:50000 --name jenkins2 --privileged -v jenkins_home:/var/jenkins_home salahgo/jenkins:dind
  ```
- Récupérez le mot de passe initial Jenkins :
  ```bash
  docker exec -it jenkins2 cat /var/jenkins_home/secrets/initialAdminPassword
  ```
- Configurez les identifiants Jenkins :
  - **Docker Hub** :
    - Utilisateur : `stock`
    - Mot de passe : `stock123`
    - ID : `stockID`
  - **GitLab** :
    - Utilisateur : `github`
    - ID : `privatekey`
    - Clé privée :
      ```
      -----BEGIN OPENSSH PRIVATE KEY-----
      ...
      -----END OPENSSH PRIVATE KEY-----
      ```
    - Clé publique :
      ```
      ssh-rsa AAAAB3Nza... molka.zaouii@gmail.com
      ```

#### 3. Déploiement avec Kubernetes
1. Créez les fichiers YAML pour les déploiements et services Kubernetes.
2. Appliquez les fichiers YAML :
   ```bash
   kubectl apply -f <nom_du_fichier>.yaml
   ```
3. Accédez aux services déployés :
   - `server-service` :
     ```bash
     minikube service server-service
     ```
   - `client-service` :
     ```bash
     minikube service client-service
     ```

#### 4. Monitoring avec Prometheus et Grafana
- Démarrez Prometheus :
  ```bash
  minikube service prometheus-server -n monitoring
  ```
- Démarrez Grafana :
  ```bash
  minikube service grafana -n monitoring
  ```
- Accédez à Grafana :
  - URL : http://localhost:3000
  - Utilisateur : `admin`
  - Mot de passe : `admin`

#### 5. Argo CD
- Accédez à Argo CD :
  ```bash
  kubectl port-forward svc/argocd-server -n argocd 8080:443
  ```
  Ouvrez [https://localhost:8080](https://localhost:8080) dans un navigateur.
  - Mot de passe Argo CD : `8IbbAU85rMHu5-Qt`

---

## 2. Configuration

### Variables d'environnement
- Configurez les variables nécessaires pour le front-end et le back-end (exemple : `DATABASE_URL`).
- Utilisez des ConfigMaps et des Secrets Kubernetes pour injecter ces variables dans vos conteneurs.

### Accès au Cluster
- Utilisez Minikube ou une commande `kubectl port-forward` pour accéder à vos services.

---

## 3. Instructions d'Utilisation

1. **Lancer l'application :**
   - Accédez à l'interface via l'URL fournie par Kubernetes ou Docker.

2. **Principales fonctionnalités :**
   - **Gestion des utilisateurs** : Créez, modifiez ou supprimez des comptes.
   - **Gestion des fournisseurs** : Suivez les informations des fournisseurs.
   - **Gestion des articles et stocks** : Ajoutez et mettez à jour les articles.

3. **Monitoring :**
   - Accédez à Grafana pour visualiser les performances et métriques du système.

---

## Conclusion
Ce projet met en évidence l'efficacité de l'approche DevOps, en simplifiant les processus de déploiement et en renforçant la supervision des services. Les instructions ci-dessus vous permettront de reproduire ce workflow dans votre environnement.
