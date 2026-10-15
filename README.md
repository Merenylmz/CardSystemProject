# CardSystemProject

🌍 **Dil / Language:** [Türkçe](#-proje-amacı) | [English](#-project-purpose)

---

## 🎯 Proje Amacı
CardSystemProject, kurumsal ve ölçeklenebilir kart/kategori yönetim süreçlerini yönetmek üzere tasarlanmış, yüksek performanslı ve güvenli bir RESTful arka uç (backend) servisidir. Proje; kart işlemlerinin, kategorilendirme mekanizmalarının ve ilişkili iş akışlarının asenkron mimarilerle kesintisiz bir biçimde yürütülmesini sağlar.

Sistem, dağıtık mimari standartlarına uygun olarak Redis tabanlı önbellekleme, RabbitMQ ile mesaj kuyruğu yönetimi, worker thread havuzları aracılığıyla arka plan iş yüklerinin paralel işlenmesi ve zamanlanmış görevlerin (cron) koordine edilmesi gibi ileri düzey teknik yetenekleri barındırır. Güvenlik ve veri bütünlüğü; katmanlı kimlik doğrulama (JWT, bcrypt), istek sınırlama (rate-limiting) ve gelişmiş girdi doğrulama mekanizmaları ile en üst düzeyde tutulmaktadır.

## 🛠️ Kullanılan Teknolojiler
* **Çalışma Ortamı ve Dil:** Node.js (v19+), TypeScript
* **Web Çatısı ve Güvenlik:** Express.js (v5), Helmet, CORS, Express Rate Limit, Express Validator
* **Veritabanı ve ODM:** MongoDB, Mongoose (mongoose-autopopulate, mongoose-delete, mongoose-paginate-v2)
* **Önbellek ve Mesaj Kuyruğu:** Redis (ioredis, redis), RabbitMQ (amqplib)
* **Paralel İşleme ve Arka Plan Görevleri:** Worker Threads, Workerpool, Node-Cron
* **Kimlik Doğrulama ve İletişim:** JSON Web Token (JWT), Bcrypt, Nodemailer
* **Konteynerleştirme ve Araçlar:** Docker, Nodemon, TypeScript Compiler (`tsc`)

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
* Node.js (>= 19.0.0)
* MongoDB
* Redis
* RabbitMQ (isteğe bağlı/mesaj kuyrukları için)
* Docker (isteğe bağlı)

### Adım Adım Kurulum

1. **Projeyi Klonlayın:**
   ```bash
   git clone https://github.com/Merenylmz/CardSystemProject.git
   cd CardSystemProject
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Ortam Değişkenlerini Yapılandırın:**
   ```bash
   cp .env.example .env
   # .env dosyasını kendi veritabanı, Redis, RabbitMQ ve port yapılandırmalarınıza göre düzenleyin.
   ```

4. **Geliştirme Modunda Çalıştırın:**
   ```bash
   npm run start:dev
   ```

5. **Canlı (Production) Derleme ve Çalıştırma:**
   ```bash
   npm run build
   npm start
   ```

### Docker ile Çalıştırma
Uygulama Docker ortamında `3002` portu üzerinden yayınlanır:

```bash
docker build -t cardsystemproject .
docker run -p 3002:3002 --env-file .env cardsystemproject
```

## 📌 Ek Bilgiler ve Özellikler
* **Katmanlı Mimari:** Controller, Middleware, Model, Route ve Lib katmanları ile ayrıştırılmış temiz ve sürdürülebilir kod yapısı.
* **Gelişmiş Veri Modelleme:** Mongoose eklentileri sayesinde otomatik veri doldurma (autopopulate), geçici/mantıksal silme (soft delete) ve optimize edilmiş sayfalama (pagination) desteği.
* **İş Parçacığı Yönetimi:** `workerpool` ve `worker-threads` kullanılarak CPU yoğunluklu işlemlerin ana thread'i bloke etmeden paralel olarak yürütülmesi.
* **Mesajlaşma ve Kuyruk Sistemi:** RabbitMQ entegrasyonu sayesinde servisler arası asenkron olay yönetimi ve güvenilir iş kuyrukları.
* **Kapsamlı Güvenlik:** Helmet başlıkları, hız sınırlaması (rate limiting) ve sıkı parametre doğrulamaları (express-validator) ile güvenli API uç noktaları.

---

# CardSystemProject (English)

## 🎯 Project Purpose
CardSystemProject is a high-performance, secure, and scalable RESTful backend service architected to handle card and category management workflows. It addresses the complexity of modern financial and business data processing by providing robust endpoints for card lifecycle operations, classification, and event-driven business logic.

The system is engineered for distributed environments, incorporating Redis for high-speed caching, RabbitMQ for resilient message queuing, worker thread pools for non-blocking intensive background jobs, and scheduled cron tasks. Data integrity and security are enforced through role-ready JWT authentication, password hashing with bcrypt, intelligent rate limiting, and structured request validation.

## 🛠️ Technologies Used
* **Runtime & Language:** Node.js (v19+), TypeScript
* **Web Framework & Security:** Express.js (v5), Helmet, CORS, Express Rate Limit, Express Validator
* **Database & ODM:** MongoDB, Mongoose (mongoose-autopopulate, mongoose-delete, mongoose-paginate-v2)
* **Caching & Queue Systems:** Redis (ioredis, redis), RabbitMQ (amqplib)
* **Concurrency & Background Jobs:** Worker Threads, Workerpool, Node-Cron
* **Authentication & Communication:** JSON Web Token (JWT), Bcrypt, Nodemailer
* **Containerization & Dev Tools:** Docker, Nodemon, TypeScript Compiler (`tsc`)

## 🚀 Installation and Usage

### Prerequisites
* Node.js (>= 19.0.0)
* MongoDB
* Redis
* RabbitMQ (optional/for message brokers)
* Docker (optional)

### Step-by-Step Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Merenylmz/CardSystemProject.git
   cd CardSystemProject
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   # Update the .env file with your database URI, Redis credentials, RabbitMQ configurations, and ports.
   ```

4. **Run in Development Mode:**
   ```bash
   npm run start:dev
   ```

5. **Build and Run for Production:**
   ```bash
   npm run build
   npm start
   ```

### Running with Docker
The application is pre-configured to expose port `3002` in a Docker container:

```bash
docker build -t cardsystemproject .
docker run -p 3002:3002 --env-file .env cardsystemproject
```

## 📌 Additional Information & Features
* **Layered Architecture:** Organized codebase separating concerns into Controllers, Middlewares, Models, Routes, and Shared Libraries.
* **Enhanced Data Handling:** Out-of-the-box support for soft-deleting documents, automated query population, and paginated responses via Mongoose plugins.
* **Thread Pool Concurrency:** Efficient offloading of CPU-heavy operations to worker threads via `workerpool` to maintain low API latency.
* **Asynchronous Messaging:** Integrated RabbitMQ client (`amqplib`) to support pub/sub and distributed job processing.
* **Production-Grade Security:** Hardened HTTP headers using Helmet, request throttling to mitigate DDoS/brute-force attacks, and granular input sanitization.