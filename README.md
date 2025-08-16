# P3D-FusionNet Frontend 

This the front end of my final year project P3D-FusionNet, Thr backend of this project which includes the model the traning and evaluation is added into [P3D-FusionNet backend](https://github.com/sunethma/P3D-FusionNet-backend.git) repostory. This is built with React.js frontend and Node.js backend, featuring secure data storage and user feedback systems. 

## 🚀 Features

Image Upload & Processing: Support for PNG and JPEG image formats

3D Model Generation: AI-powered conversion from 2D images to 3D models

Interactive History: View and manage previously generated models

User Feedback System: Rate and review generated models

Secure Data Storage: Encrypted storage of images and 3D models

Responsive Design: Works seamlessly across desktop and mobile devices

Real-time Loading States: Visual feedback during model generation

## 🛠️ Tech Stack

```
Frontend

React.js - Modern JavaScript library for building user interfaces

React Router - Client-side routing

Axios - HTTP client for API requests

CSS3 - Custom styling with modern design patterns

```
```

Backend

Node.js - JavaScript runtime environment

Express.js - Web application framework

MongoDB Atlas - Cloud database service

Crypto - Built-in encryption for data security

Multer - File upload handling

CORS - Cross-origin resource sharing

```

## 📋 Prerequisites
Before running this application, make sure you have the following installed:

Node.js (v14.0.0 or higher)

npm (v6.0.0 or higher)

MongoDB Atlas Account (for database)

## ⚙️ Installation

1. Clone the Repository

 ```bash
   
git clone https://github.com/sunethma/P3D-FusionNet-Frontend.git
cd P3D-FusionNet-Frontend

```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd p3d-fusion-app

# Install dependencies
npm install

# Install additional required packages
npm install axios react-router-dom

```

## 3. Backend Setup

```bash

# Navigate to backend directory
cd p3d-fusion-backend

# Install dependencies
npm install express mongodb cors multer dotenv body-parser crypto

```
## 4. Environment Configuration

Create a .env file in your p3d-fusion-backend directory with the following variables:

```bash 
# MongoDB Connection String
MONGODB_URI=your_mongodb_atlas_connection_string

# Encryption key (must be exactly 32 characters for AES-256)
ENCRYPTION_KEY=your_32_character_encryption_key

# Server port
PORT=5000
```

Important:

Replace your_mongodb_atlas_connection_string with your actual MongoDB Atlas connection string
Generate a secure 32-character encryption key for data protection
Never commit your .env file to version control

## 🚦 Running the Application
Development Mode

1. Start the Backend Server:

```bash

cd p3d-fusion-backend
node server.js
# Server will run on http://localhost:5000

```

2. Start the Frontend Development Server:

```bash

cd p3d-fusion-app
npm start
# Application will open at http://localhost:3000

```

Production Build

```bash

# Build the frontend for production
cd p3d-fusion-app
npm run build

# Serve the production build (optional)
npm install -g serve
serve -s build

```

## 📁 Project Structure

```
p3d-fusion-app/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── MainContent.js
│   │   ├── History.js
│   │   ├── About.js
│   │   ├── ImageDisplay.js
│   │   ├── LoadingSpinner.js
│   │   ├── ReviewPopup.js
│   │   ├── ReviewNotification.js
│   │   ├── ImageTypeErrorModal.js
│   │   └── AppStateContext.js
│   ├── assets/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/
├── package.json
p3d-fusion-backend/
├── server.js
├── .env
└── package.json
└── README.md
```

## 🎯 Usage
1. Upload an Image

Click on the image upload area
Select a PNG or JPEG file from your device
The image will be displayed in the preview area

2. Generate 3D Model

Click the "Generate 3D Model" button
Wait for the AI processing to complete
View your generated 3D model

3. Review and Save

Rate your experience (1-5 stars)
Provide optional feedback
Save the model to your history

4. View History

Navigate to the History page
Browse your previously generated models
Reload any model back into the editor

---

## 🔐 Security Features

Data Encryption: All images and 3D models are encrypted using AES-256 before storage


Secure Headers: CORS protection and secure HTTP headers

Input Validation: File type validation and size limits

Error Handling: Comprehensive error handling throughout the application

---

## 🚀 API Endpoints

POST ```/api/save-data```

Save a new image and 3D model with optional review data.

Request Body:

```bash 
{
  image: String,      // Base64 encoded image
  model: String,      // 3D model data
  rating: Number,     // Optional rating (1-5)
  feedback: String    // Optional feedback text
}

```

GET ```/api/model/:id```

Retrieve model metadata or full model data.

Query Parameters:

```includeData=true``` - Include encrypted image and model data

---

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.


## 🐛 Troubleshooting
### Common Issues
Frontend won't start:

Check if Node.js is installed correctly
Run npm install to ensure all dependencies are installed
Check for port conflicts (default: 3000)

### Backend connection errors:

Verify MongoDB Atlas connection string in .env file in p3d-fusion-backend
Ensure your IP address is whitelisted in MongoDB Atlas
Check if the backend server is running on port 5000 using node server.js

### File upload issues:

Ensure files are PNG or JPEG format
Check file size limits
Verify network connectivity

### 3D Model generation fails:

Check backend logs for detailed error messages
Ensure the AI service is properly configured
Verify image format compatibility

---

## 🧑‍💻 Author
Created by Sunethma Welathanthri
