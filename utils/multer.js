// const multer = require("multer");
// const path = require("path");

// // Configure Multer Storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../uploads");
//     cb(null, uploadPath); // Ensures the directory path is absolute
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Timestamp for unique filenames
//   },
// });



// // File Filter for Valid Image Types
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/jpg", "image/png",] // .docx];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed.")); // Reject the file
//   }
// };

// // Initialize Multer with Storage, Filter, and Limits
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB per file
//   },
// });

// module.exports = upload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directory exists
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Ensures the directory path is absolute
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Timestamp for unique filenames
  },
});

// File Filter for Valid Image Types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]; // Removed trailing comma
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed.")); // Reject the file
  }
};

// Initialize Multer with Storage, Filter, and Limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
  },
  fileFilter: fileFilter, // Add the file filter
});

module.exports = upload;