import cloudinarySdk from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const { v2: cloudinary } = cloudinarySdk;

cloudinary.config({
  cloud_name: process.env.MY_CLOUD_NAME,
  api_key: process.env.MY_CLOUD_KEY,
  api_secret: process.env.MY_CLOUD_SECRETKEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'clinic';
    let resourceType = 'image';

    if (file.mimetype === 'application/pdf') {
      folder = 'pdfs';
      resourceType = 'raw';
    }

    return {
      folder: folder,
      resource_type: resourceType, // Ensures proper handling of PDFs
      public_id: uuidv4() + "-" + file.originalname,
    };
  },
});

export const upload = multer({ storage });

export { cloudinary };