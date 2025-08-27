import multer from 'multer';

const memoryStorage = multer.memoryStorage();

export const memoryUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!allowed.includes(file.mimetype)) {
      // Fixed: Use proper MulterError constructor
      const err = new multer.MulterError('LIMIT_UNEXPECTED_FILE');
      err.message = 'Invalid file type. Only PNG/JPG/JPEG allowed.';
      return cb(err, false);
    }
    cb(null, true);
  }
});

export default memoryUpload;