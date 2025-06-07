# 📚 Student Management REST API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**A modern and secure solution for managing student and course data**

*Built with Node.js, Express.js, and MongoDB*

</div>

---

## 🌟 Project Overview

The **Student Management REST API** empowers administrators to efficiently manage students and courses with a focus on security, scalability, and maintainability. This comprehensive solution provides full CRUD operations, JWT-based authentication, and establishes seamless relationships between students and their enrolled courses.

### 🎯 **Key Highlights**
- 🔐 **Secure** - JWT-based authentication
- 🚀 **Scalable** - Clean architecture design
- 🎓 **Comprehensive** - Full student-course relationship management
- 📱 **Modern** - RESTful API design

---

## 📋 Table of Contents

<details>
<summary>Click to expand navigation</summary>

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ Setup & Installation](#️-setup--installation)
- [🔧 Environment Variables](#-environment-variables)
- [📡 API Routes](#-api-routes)
- [🔐 Authentication Guide](#-authentication-guide)
- [📬 Postman Collection](#-postman-collection)
- [🎉 Bonus Features](#-bonus-features)
- [📂 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

</details>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔧 **Core Features**
- ✅ **CRUD Operations** - Complete Create, Read, Update, Delete
- 🔒 **JWT Authentication** - Secure token-based access
- 👥 **Student Management** - Comprehensive student profiles
- 📚 **Course Management** - Full course lifecycle
- ⚙️ **Environment Config** - Secure configuration management

</td>
<td width="50%">

### 🎁 **Advanced Features**
- 🔍 **Smart Search** - Course search by title
- 📄 **Pagination** - Efficient data handling
- 🔗 **Relationships** - Student-course associations
- 📊 **Filtering** - Department-based filtering
- 🗄️ **MongoDB Integration** - Robust data modeling

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Runtime Environment | v16+ |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | Web Framework | Latest |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | Database | Latest |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logoColor=white) | ODM | Latest |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | Authentication | Latest |

</div>

---

## ⚙️ Setup & Installation

### 📋 **Prerequisites**

> ⚠️ **Before you begin, ensure you have the following installed:**

- ✅ **Node.js** (v16 or higher)
- ✅ **MongoDB** (local installation or MongoDB Atlas account)
- ✅ **Git** (for repository cloning)
- ✅ **Postman** (for API testing)

### 🚀 **Quick Start**

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/student-management-api.git
cd student-management-api

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
cp .env.example .env
# Edit .env with your configurations

# 4️⃣ Start the server
npm start
```

> 🎉 **Success!** Your API is now running at `http://localhost:3000`

---

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/student-management

# Security Configuration
JWT_SECRET=your_secure_jwt_secret_key_here
```

> ⚠️ **Security Note:** Never commit your `.env` file to version control. Use `.env.example` for sharing structure.

---

## 📡 API Routes

### 🔐 **Authentication Endpoints**

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| `POST` | `/auth/register` | Register new admin | ❌ |
| `POST` | `/auth/login` | Login & get JWT token | ❌ |

### 🎓 **Student Endpoints**

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| `GET` | `/students` | List all students with courses | ✅ |
| `GET` | `/students/:id` | Get student by ID with courses | ✅ |
| `POST` | `/students` | Create new student | ✅ |
| `PUT` | `/students/:id` | Update student details | ✅ |
| `DELETE` | `/students/:id` | Delete student | ✅ |

### 📚 **Course Endpoints**

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| `GET` | `/courses` | List all courses | ✅ |
| `POST` | `/courses` | Create new course | ✅ |
| `PUT` | `/courses/:id` | Update course | ✅ |
| `DELETE` | `/courses/:id` | Delete course | ✅ |

### 🎁 **Bonus Endpoints**

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| `GET` | `/courses?title=abc` | Search courses by title | ✅ |
| `GET` | `/students?page=2&department=IT` | Paginated & filtered students | ✅ |

---

## 🔐 Authentication Guide

<details>
<summary><strong>🔑 Step-by-Step Authentication Process</strong></summary>

### 1️⃣ **Register Admin**

```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "Admin registered successfully"
}
```

### 2️⃣ **Login**

```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3️⃣ **Use Token**

Add to all protected endpoints:

```http
Authorization: Bearer your_jwt_token_here
```

</details>

---

## 📬 Postman Collection

We've included a comprehensive Postman collection for easy testing!

### 📥 **Import Instructions**

1. Open Postman
2. Click **Import** → **File**
3. Select `postman/Student_Management_API.postman_collection.json`
4. Create environment variable `token` for JWT storage

### 🧪 **What's Included**

- ✅ Complete authentication flow
- ✅ All CRUD operations for students
- ✅ All CRUD operations for courses
- ✅ Pre-configured authorization headers
- ✅ Sample request bodies

---

## 🎉 Bonus Features

<div align="center">

### 🌟 **Enhanced Functionality**

</div>

| Feature | Status | Description |
|---------|--------|-------------|
| 🔍 **Smart Search** | ✅ | Course search by title with query params |
| 📄 **Pagination** | ✅ | Efficient data handling with page limits |
| 🏷️ **Filtering** | ✅ | Department-based student filtering |
| 🖼️ **File Upload** | 🔄 | Profile picture uploads with Multer |
| ✅ **Validation** | 🔄 | Input validation with express-validator |
| 📋 **Logging** | 🔄 | Request logging with Morgan/Winston |
| ⏱️ **Rate Limiting** | 🔄 | API protection with rate limiting |

> 🔄 = Planned for future development

---

## 📂 Project Structure

```
student-management-api/
├── 📁 config/              # Database and environment configs
├── 📁 middleware/          # Authentication middleware
├── 📁 models/              # Mongoose schemas
│   ├── Student.js
│   ├── Course.js
│   └── Admin.js
├── 📁 routes/              # API route handlers
│   ├── auth.js
│   ├── students.js
│   └── courses.js
├── 📁 postman/             # Postman collection
├── 📄 .env.example         # Environment template
├── 📄 .gitignore          # Git ignore rules
├── 📄 app.js              # Application entry point
├── 📄 package.json        # Dependencies & scripts
└── 📄 README.md           # This documentation
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

<details>
<summary><strong>📋 Contributing Guidelines</strong></summary>

### 🔄 **Process**

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### 📝 **Guidelines**

- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and descriptive

</details>

---

## 📜 License

<div align="center">

This project is licensed under the **MIT License**

See the [LICENSE](LICENSE) file for details

---

### 👨‍💻 **Developed by**

**[Your Name]**

📧 **Contact:** [your.email@example.com]  
🐙 **GitHub:** [Your GitHub Profile]  
🏢 **For:** Bits and Volts Pvt. Ltd., Pune, IN

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

</div>

</div>
