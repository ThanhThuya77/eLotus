const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const Images = require('./models/Images');

// Connect to DB
const db = require('./config/db');
db.connect();

const app = express();
const port = 3000;

const imageStorage = multer.diskStorage({
  destination: 'tmp/', // Destination to store image
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: imageStorage,
  limits: { fileSize: 8388608 },
  fileFilter: (req, file, cb) => {
    if (file && file?.mimetype?.split('/')?.[0] === 'image') {
      cb(null, true);
    } else {
      cb(new Error('Please upload image!'));
    }
  },
});

app.use(morgan('combined'));
app.use(cors());

//The <NAME> you use in multer's upload.single(<NAME>) function must be the same as the one
//you use in <input type="file" name="<NAME>" ...>
const uploadSingleImage = upload.single('data');
app.post('/update', (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    console.log('req', req.file);

    const newImage = new Images(req.file);
    const insertedImage = await newImage.save();
    return res.status(201).json(insertedImage);
  });
});

app.get('/images', async (req, res) => {
  const allImages = await Images.find();
  return res.status(200).json(allImages);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
