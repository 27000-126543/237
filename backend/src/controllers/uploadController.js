const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadsDir = path.join(__dirname, '../../uploads');
const imagesDir = path.join(uploadsDir, 'images');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.body;
    let uploadPath = imagesDir;
    
    if (type === 'avatar') {
      uploadPath = path.join(imagesDir, 'avatars');
    } else if (type === 'product') {
      uploadPath = path.join(imagesDir, 'products');
    } else if (type === 'design') {
      uploadPath = path.join(imagesDir, 'designs');
    } else if (type === 'construction') {
      uploadPath = path.join(imagesDir, 'constructions');
    } else if (type === 'review') {
      uploadPath = path.join(imagesDir, 'reviews');
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueName}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp|bmp/;
  const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedImageTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('只支持上传图片文件 (JPEG, JPG, PNG, GIF, WEBP, BMP)'));
  }
};

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: fileFilter
}).single('image');

const uploadImages = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 9
  },
  fileFilter: fileFilter
}).array('images', 9);

const uploadSingleImage = (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: '图片大小不能超过10MB' });
        }
        return res.status(400).json({ message: '文件上传失败', error: err.message });
      }
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: '请选择要上传的图片' });
    }

    const relativePath = path.relative(uploadsDir, req.file.path).replace(/\\/g, '/');
    const fileUrl = `/uploads/${relativePath}`;

    res.json({
      message: '图片上传成功',
      data: {
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  });
};

const uploadMultipleImages = (req, res) => {
  uploadImages(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: '单张图片大小不能超过10MB' });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({ message: '最多只能上传9张图片' });
        }
        return res.status(400).json({ message: '文件上传失败', error: err.message });
      }
      return res.status(400).json({ message: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: '请选择要上传的图片' });
    }

    const uploadedFiles = req.files.map(file => {
      const relativePath = path.relative(uploadsDir, file.path).replace(/\\/g, '/');
      return {
        url: `/uploads/${relativePath}`,
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      };
    });

    res.json({
      message: `成功上传 ${uploadedFiles.length} 张图片`,
      data: {
        files: uploadedFiles
      }
    });
  });
};

const deleteFile = (req, res) => {
  try {
    const { filePath } = req.body;

    if (!filePath || !filePath.startsWith('/uploads/')) {
      return res.status(400).json({ message: '无效的文件路径' });
    }

    const relativePath = filePath.replace('/uploads/', '');
    const absolutePath = path.join(uploadsDir, relativePath);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: '文件不存在' });
    }

    fs.unlinkSync(absolutePath);

    res.json({ message: '文件删除成功' });
  } catch (error) {
    res.status(500).json({ message: '删除文件失败', error: error.message });
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  deleteFile
};
