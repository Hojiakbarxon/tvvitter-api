# 🐦 Tvvitter API

A fully-featured Twitter-like REST API built with **Node.js**, **Express**, and **MongoDB**. Supports user authentication with OTP email verification, role-based access control, posts, comments, and likes.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESModules) |
| Framework | Express.js v5 |
| Database | MongoDB + Mongoose |
| Auth | JWT (Access + Refresh Tokens) |
| Validation | Joi |
| Password Hashing | bcrypt |
| OTP / Email | Nodemailer + node-cache |
| Dev Tool | Nodemon |

---

## ✨ Features

- 🔐 **JWT Authentication** — Access token + Refresh token via httpOnly cookie
- 📧 **OTP Email Verification** — Required on sign-in and password reset
- 👥 **Role-Based Access Control** — SUPERADMIN / ADMIN / USER roles
- 🛡️ **Resource Ownership Guards** — Users can only edit/delete their own content
- 📝 **Posts** — Create, read, update, delete with like count tracking
- 💬 **Comments** — Attach comments to posts
- ❤️ **Likes** — Like/unlike posts with auto counter increment/decrement
- 🔁 **Cascade Deletes** — Deleting a user removes all their posts, comments, and likes
- ⚡ **Base Controller** — Reusable OOP pattern for all CRUD operations
- 🤖 **Auto SuperAdmin** — SuperAdmin is created automatically on server start

---

## 📁 Project Structure

```
source/
├── config/
│   ├── index.js          # env config
│   └── db.js             # MongoDB connection
├── controllers/
│   ├── base-controller.js
│   ├── auth.controller.js
│   ├── users.controller.js
│   ├── post-controller.js
│   ├── comment-controller.js
│   └── like.controller.js
├── crypto/
│   └── crypto.js         # bcrypt wrapper
├── enums/
│   └── index.js          # Roles, Genders
├── guards/
│   ├── auth.guard.js     # JWT verification
│   └── role.guard.js     # Role + ownership check
├── helpers/
│   ├── cache-control.js  # OTP cache (node-cache)
│   └── create-super-admin.js
├── middlewares/
│   ├── catch-async.js
│   ├── error-handle.js
│   └── middleware.js     # Joi validator
├── routers/
│   ├── index-route.js
│   ├── user.route.js
│   ├── post-router.js
│   ├── comments.route.js
│   └── like.routes.js
├── schemas/
│   ├── users-schema.js
│   ├── posts-schema.js
│   ├── comments-schema.js
│   └── likes-schema.js
├── utils/
│   ├── custom-error.js
│   ├── success-response.js
│   ├── token.js
│   ├── mail-service.js
│   └── otp-generator.js
├── validation/
│   ├── user-validator.js
│   ├── posts-validator.js
│   ├── comments-validator.js
│   └── likes-validator.js
└── main.js
```

---

## ⚙️ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/tvvitter.git
cd tvvitter
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/tvvitter

SUPERADMIN_USERNAME=superadmin
SUPERADMIN_PASSWORD=yourpassword
SUPERADMIN_FULLNAME=Super Admin
SUPERADMIN_PROFILEPHOTO=
SUPERADMIN_EMAIL=admin@example.com

ACCESS_TOKEN_KEY=your_access_secret
ACCESS_TOKEN_TIME=15m
REFRESH_TOKEN_KEY=your_refresh_secret
REFRESH_TOKEN_TIME=30d

MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_app_password
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
```

### 4. Run the server
```bash
# Development
npm run dev

# Production
npm start
```

---

## 📡 API Endpoints

### 🔑 Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/users/signin` | Sign in, sends OTP to email | ❌ |
| POST | `/api/users/otp` | Confirm OTP, returns tokens | ❌ |
| POST | `/api/users/token` | Get new access token via cookie | ❌ |
| POST | `/api/users/reset-password` | Send OTP for password reset | ❌ |
| POST | `/api/users/otp-reset` | Confirm OTP and set new password | ❌ |

### 👤 Users
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/users` | Create ADMIN user | SUPERADMIN |
| POST | `/api/users/regular-user` | Create regular USER | SUPERADMIN / ADMIN |
| GET | `/api/users` | Get all users | SUPERADMIN |
| GET | `/api/users/:id` | Get user by ID | SUPERADMIN / own |
| PATCH | `/api/users/:id` | Update user | SUPERADMIN / own |
| PATCH | `/api/users/password/:id` | Update password | SUPERADMIN / own |
| DELETE | `/api/users/:id` | Delete user | SUPERADMIN / own |

### 📝 Posts
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/posts` | Get all posts | ❌ |
| GET | `/api/posts/:id` | Get post by ID | ❌ |
| POST | `/api/posts` | Create post | ✅ |
| PATCH | `/api/posts/:id` | Update post | SUPERADMIN / owner |
| DELETE | `/api/posts/:id` | Delete post | SUPERADMIN / owner |

### 💬 Comments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/comments` | Get all comments | ❌ |
| GET | `/api/comments/:id` | Get comment by ID | ❌ |
| POST | `/api/comments` | Create comment | ✅ |
| PATCH | `/api/comments/:id` | Update comment | SUPERADMIN / ADMIN / owner |
| DELETE | `/api/comments/:id` | Delete comment | SUPERADMIN / ADMIN / owner |

### ❤️ Likes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/likes` | Get all likes | ❌ |
| GET | `/api/likes/:id` | Get like by ID | ❌ |
| POST | `/api/likes` | Like a post | ✅ |
| DELETE | `/api/likes/:id` | Unlike a post | SUPERADMIN / owner |

---

## 🔒 Auth Flow

```
1. POST /api/users/signin  →  OTP sent to email
2. POST /api/users/otp     →  confirm OTP → get accessToken + refreshToken cookie
3. Use accessToken in header: Authorization: Bearer <token>
4. When accessToken expires → POST /api/users/token (uses refreshToken cookie)
```

---

## 👑 Roles

| Role | Permissions |
|---|---|
| `SUPERADMIN` | Full access to everything |
| `ADMIN` | Manage users and content |
| `USER` | Own posts, comments, likes only |

---

## 📬 Contact

Built by **[Your Name]** — feel free to reach out!