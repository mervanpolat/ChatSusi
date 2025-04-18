# Chat Application Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [Authentication](#authentication)
6. [Real-time Messaging](#real-time-messaging)
7. [Profile Management](#profile-management)
8. [Deployment](#deployment)
9. [Development Setup](#development-setup)

## Project Overview

This is a modern chat application built with a React frontend and Node.js/Express backend. The application features real-time messaging, user authentication, profile management, and image upload capabilities using Cloudinary.

### Key Features
- Real-time messaging between users
- User authentication (signup, login, logout)
- Profile management with image upload
- Responsive design
- Modern UI with Tailwind CSS and DaisyUI
- Secure API endpoints
- MongoDB database integration
- Cloudinary integration for image storage

## Architecture

The project follows a client-server architecture with the following components:

### Frontend (React)
- Built with Vite
- State management using Zustand
- UI components with Tailwind CSS and DaisyUI
- Real-time updates using WebSocket
- Form handling and validation
- Responsive design

### Backend (Node.js/Express)
- RESTful API endpoints
- MongoDB database
- JWT authentication
- WebSocket server for real-time messaging
- Cloudinary integration
- Error handling middleware
- CORS configuration

## Frontend

### Project Structure
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── store/         # Zustand state management
│   ├── lib/           # Utility functions and configurations
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
```

### Key Components

#### Authentication
- `LoginPage.jsx`: Handles user login
- `SignupPage.jsx`: Handles user registration
- `useAuthStore.js`: Manages authentication state

#### Profile Management
- `ProfilePage.jsx`: Displays and manages user profile
- Features:
  - Profile picture upload
  - User information display
  - Account status

#### Messaging
- Real-time chat interface
- Message history
- User list sidebar

### State Management
The application uses Zustand for state management with the following stores:
- `useAuthStore`: Manages authentication state
- `useMessageStore`: Manages messaging state

## Backend

### Project Structure
```
backend/
├── src/
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── lib/          # Utility functions
│   └── index.js      # Server entry point
```

### API Endpoints

#### Authentication
- `POST /api/auth/signup`: User registration
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout
- `GET /api/auth/check`: Authentication status check
- `PUT /api/auth/update-profile`: Profile update

#### Messaging
- `GET /api/messages/users`: Get users for sidebar
- `GET /api/messages/:id`: Get messages with a user
- `POST /api/messages/send/:id`: Send a message

### Database Models

#### User Model
```javascript
{
  email: String,
  fullName: String,
  password: String,
  profilePic: String,
  createdAt: Date
}
```

#### Message Model
```javascript
{
  senderId: ObjectId,
  receiverId: ObjectId,
  message: String,
  image: String,
  createdAt: Date
}
```

## Authentication

The application uses JWT (JSON Web Tokens) for authentication with the following flow:

1. User login/signup
2. Server generates JWT
3. Token stored in HTTP-only cookie
4. Protected routes verify token
5. Token expiration after 7 days

### Security Features
- HTTP-only cookies
- Secure flag for cookies in production
- Password hashing with bcrypt
- CORS protection
- Input validation

## Real-time Messaging

The application implements real-time messaging using WebSocket with the following features:

- Instant message delivery
- Message history
- Online/offline status
- Read receipts
- Image sharing

## Profile Management

### Profile Picture Upload
1. User selects image
2. Image converted to base64
3. Uploaded to Cloudinary
4. URL stored in user profile
5. UI updates with new image

### Profile Information
- Full name
- Email address
- Account creation date
- Account status

## Deployment

### Requirements
- Node.js environment
- MongoDB database
- Cloudinary account
- Environment variables

### Environment Variables

#### Backend (.env)
```
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5001/api
```

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```

3. Set up environment variables
4. Start development servers:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```

### Available Scripts

#### Backend
- `npm run dev`: Start development server
- `npm start`: Start production server

#### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 