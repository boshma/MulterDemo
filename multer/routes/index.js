const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 },
  fileFilter: (req, file, cb) => {
    // Allow only image files with the extensions .jpg, .jpeg, .png, and .gif
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

router.get('/', (req, res) => {
  res.render('index', { file: null }); // Add a default value for the file variable
});

router.post('/upload', upload.single('file'), (req, res) => {
  res.render('index', { file: req.file });
});


// Replace the following values with your Content Moderator API credentials
// const endpoint = 'https://<your-resource-name>.cognitiveservices.azure.com/contentmoderator/moderate/v1.0/ProcessImage/Evaluate';
// const subscriptionKey = '<your-subscription-key>';

// router.get('/', (req, res) => {
//   res.render('index', { file: null }); // Add a default value for the file variable
// });

// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     // Send the uploaded file to the Content Moderator API for analysis
//     const response = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Ocp-Apim-Subscription-Key': subscriptionKey
//       },
//       body: JSON.stringify({
//         DataRepresentation: 'URL',
//         Value: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
//       })
//     });

//     const result = await response.json();

//     // Check if the image is inappropriate
//     if (result.IsImageAdultClassified || result.IsImageRacyClassified || result.AdultClassificationScore >= 0.5 || result.RacyClassificationScore >= 0.5) {
//       // Delete the uploaded file
//       fs.unlinkSync(req.file.path);
//       return res.status(400).send('The uploaded image is inappropriate!');
//     }

//     res.render('index', { file: req.file });

//   } catch (error) {
//     console.log(error);
//     res.status(500).send('An error occurred while processing the image!');
//   }
// });

module.exports = router;



