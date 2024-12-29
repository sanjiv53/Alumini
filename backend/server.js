
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // Import the fs module
// const bcrypt = require('bcryptjs');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Check and create uploads directory
const uploadsDir = path.join(__dirname, '/image');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Create uploads directory if it doesn't exist
}

// Multer configuration to store uploaded files in the "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// MongoDB connection with additional timeout
mongoose.connect('mongodb+srv://rssanjiv8:sa532003@cluster0.sb144.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if MongoDB is unreachable
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define a schema for storing items with an image field
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null, // Ensures 'name' is not null
  },
  phone: {
    type: Number,
    default: null, // Ensures 'phone' is not null
  },
  email: {
    type: String,
    default: null, // Basic email format validation
  },
  from: {
    type: String,
    default: null, // Ensures 'from' is not null
  },
  to: {
    type: String,
    default: null, // Ensures 'to' is not null
  },
  pass: {
    type: String,
    default: null, // Ensures 'pass' is not null
  },
  imagePath: {
    type: String,
    default: null, // Ensures 'imagePath' is not null
  }// Store the image file path
});

const Item = mongoose.model('user', ItemSchema);

const Login = new mongoose.Schema({
  name: {
    type: String,
    default: null, // Ensures 'name' is not null
  },
  
  email: {
    type: String,
    default: null, // Basic email format validation
  },
  
  password: {
    type: String,
    default: null, // Ensures 'pass' is not null
  },
 
});

const Itemse = mongoose.model('login', Login);

// Route to handle item creation with an image
const bcrypt = require('bcryptjs'); // Import bcryptjs

app.post('/reg', upload.single('image'), async (req, res) => {
  try {
    const { name, phone, email, from, to, pass } = req.body;
    
    // Hash the email before saving it to the database
    const hashedEmail = await bcrypt.hash(email, 10);  // 10 is the salt rounds for bcrypt

    // Process the image if provided
    const imagePath = req.file ? req.file.path.replace('D:\\sanjiv\\alumni react\\alumni react\\backend\\image', '') : null;

    // Create a new item with the hashed email
    const newItem = new Item({
      name,
      phone,
      email, // Store the hashed email
      from,
      to,
      pass,
      imagePath, // Save the image path to MongoDB
    });

    // Save the item to the database
    const savedItem = await newItem.save();

    // Respond with the saved item
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating item', error: err.message });
  }
});

// Serve static files from the "image" directory
app.use('/image', express.static(path.join(__dirname, '/image')));



app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    console.log(items); // Check the imagePath in the console
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



 // To parse JSON bodies

// Create Nodemailer transporter (you can configure this with Gmail, SendGrid, etc.)
// Parse JSON data sent in the request body
app.use(bodyParser.json());

// POST route to send email
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or 'smtp'
  auth: {
    user: 'youtownyoutown@gmail.com',
    pass: 'avad dapv qhtn agvk',
  }
});

app.post('/send-email', (req, res) => {
  console.log('Received email data:', req.body);  // Log incoming data

  const { name, email } = req.body;

  // Set up the email options
  const mailOptions = {
    from: 'SRVHSS-Alumini',  // Sender email address
    to: email,               // Receiver email address (from frontend)
    subject: `Sri Ramakrishna Vivekananda Higher Secondary School`,  // Subject line
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
      <head>
        <link rel="preload" as="image" href="https://react-email-demo-bymyam2i5-resend.vercel.app/static/yelp-logo.png" />
        <link rel="preload" as="image" href="https://react-email-demo-bymyam2i5-resend.vercel.app/static/yelp-header.png" />
        <link rel="preload" as="image" href="https://react-email-demo-bymyam2i5-resend.vercel.app/static/yelp-footer.png" />
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
      </head>
      <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em">
          <tbody>
            <tr style="width:100%">
              <td>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:30px 20px">
                  <tbody>
                    <tr>
                       <td><img src="" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
                  <tbody>
                    <tr>
                      <td>
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                          <tbody style="width:100%">
                            <tr style="width:100%"><img src="cid:./image/header4.webp" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%" width="620" /></tr>
                          </tbody>
                        </table>
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px;padding-bottom:0">
                          <tbody style="width:100%">
                            <tr style="width:100%">
                              <td data-id="__react-email-column">
                                <h2 style="font-size:26px;font-weight:bold;text-align:center">Sri Ramakrishna Vivekananda Higher Secondary School Thiruppunavasal</h2>
                                <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${name},</h1>
                                <h2 style="font-size:26px;font-weight:bold;text-align:center">Thank You For Your Registration...</h2>
                               <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px">Get back to us for any Queries</p>
                                <h4 style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px">Team..</h4>
                                 <h3 style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px">SRVHSS-Alumini</h3>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:45px 0 0 0">
                          <tbody>
                              <tr>
                                 <td><a href="http://localhost:3000/emailaction?email=${encodeURIComponent(email)}8dsdasawewdsdadqqwwweed2">Click here to view your Email Id</a></td>
                              </tr>
                              <tr>
                                <td><img src="https://react-email-demo-bymyam2i5-resend.vercel.app/static/yelp-footer.png" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%" width="620" /></td>
                              </tr>
                          </tbody>
                        </table>
                        <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© Copyright 2024. Designed and Developed by <a href="https://aadhiyanit.com/">Aadhiyan Infotech</a>  Aranthangi India</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>`,
    attachments: [
      {
        filename: 'header4.webp',
        path: path.join(__dirname, './image/header4.webp'),
        cid: './image/header4.webp', // Same as the cid in the img src
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);  // Log the error
      return res.status(500).json({ message: 'Error sending email', error: error });
    }

    console.log('Email sent:', info.response);  // Log the response
    res.status(200).json({ message: 'Email sent successfully', info: info });
  });
});



app.get('/emailaction', async (req, res) => {
  const { email } = req.query; // Get email from the query string

  if (!email) {
    return res.status(400).send('No email provided.');
  }

  try {
    // Find the user by email directly (no need to hash it)
    
    // Send confirmation response
    res.send(`
      <html>
        <body>
          <h1>Email Activation Successful</h1>
          <p>Thank you for activating your account, ${email}!</p>
        </body>
      </html>
    `);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error.');
  }
});

app.post('/sign', async (req, res) => {
  const hashedEmail = await bcrypt.hash(req.body.password, 10); 
  const item = new Itemse({
    name: req.body.name,
    password:hashedEmail, 
    email: req.body.email,  // Fixed to use price instead of email
  });
  
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Itemse.findOne({ email: email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials eamil' });
    }
// Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials password' });
    }

    // If credentials are correct, return success
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/// Update an item (PUT)
// app.put('/items/:id', upload.single('image'), async (req, res) => {
//   try {
//     const { name, age, email } = req.body;
//     const imagePath = req.file ? req.file.path : undefined;

//     // Find and update the item
//     const updatedItem = await Item.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         age,
//         email,
//         ...(imagePath && { imagePath }) // Only update imagePath if a new image is uploaded
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedItem) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     res.json(updatedItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete an item (DELETE)
// app.delete('/items/:id', async (req, res) => {
//   try {
//     const deletedItem = await Item.findByIdAndDelete(req.params.id);

//     if (!deletedItem) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     res.json({ message: 'Item deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// Start server



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
