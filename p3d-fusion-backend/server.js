// server.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb+srv://sunethma20210246:YVhSGgnmReKNfM8O@cluster0.mwyq0ls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
let db;

// Encryption functions
function encrypt(data) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY || 'a-32-character-key-for-aes-encryption', 'utf-8');
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted
  };
}

function decrypt(iv, encryptedData) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY || 'a-32-character-key-for-aes-encryption', 'utf-8');
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    db = client.db("image_to_3d_db");
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return false;
  }
}

// Route to save model data with image, 3D model, and optional review
app.post('/api/save-data', async (req, res) => {
  try {
    const { image, model, rating, feedback } = req.body;
    
    if (!image || !model) {
      return res.status(400).json({ error: 'Image and model data are required' });
    }
    
    // Encrypt the image and model data
    const encryptedImage = encrypt(image);
    const encryptedModel = encrypt(model);
    
    // Create document to store in MongoDB
    const modelData = {
      image: {
        iv: encryptedImage.iv,
        data: encryptedImage.encryptedData
      },
      model: {
        iv: encryptedModel.iv,
        data: encryptedModel.encryptedData
      },
      rating: rating || 0,
      feedback: feedback || '',
      createdAt: new Date()
    };
    
    // Save to MongoDB
    const collection = db.collection('models');
    const result = await collection.insertOne(modelData);
    
    res.status(201).json({ 
      message: 'Data saved successfully', 
      id: result.insertedId 
    });
    
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Route to fetch model data by ID
app.get('/api/model/:id', async (req, res) => {
  try {
    const collection = db.collection('models');
    const model = await collection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!model) {
      return res.status(404).json({ error: 'Model not found' });
    }
    
    // Decrypt data before sending (if you need to retrieve the original data)
    const decryptedImage = decrypt(model.image.iv, model.image.data);
    const decryptedModel = decrypt(model.model.iv, model.model.data);
    
    // Only send back decrypted data if specifically requested
    // Otherwise, just confirm the model exists (for security)
    if (req.query.includeData === 'true') {
      res.json({
        id: model._id,
        image: decryptedImage,
        model: decryptedModel,
        rating: model.rating,
        feedback: model.feedback,
        createdAt: model.createdAt
      });
    } else {
      res.json({
        id: model._id,
        rating: model.rating,
        feedback: model.feedback,
        createdAt: model.createdAt
      });
    }
    
  } catch (error) {
    console.error('Error fetching model:', error);
    res.status(500).json({ error: 'Failed to fetch model' });
  }
});

// Start server
async function startServer() {
  const connected = await connectToMongoDB();
  if (connected) {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } else {
    console.error("Failed to start server due to database connection error");
  }
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});