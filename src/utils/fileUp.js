import cloudinarySdk from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
const { v2: cloudinary } = cloudinarySdk;
import { v4 as uuidv4 } from 'uuid';

cloudinary.config({
  cloud_name: process.env.MY_CLOUD_NAME,
  api_key: process.env.MY_CLOUD_KEY,
  api_secret: process.env.MY_CLOUD_SECRETKEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const fileFormat = file.mimetype.split('/')[1];
    let folder = 'clinic';
    if (file.mimetype === 'application/pdf') {
      folder = 'pdfs';
    }
    return {
      folder: folder,
      format: fileFormat, 
      public_id: uuidv4() + "-" + file.originalname,
    };
  },
});

export const upload = multer({ storage });

export { cloudinary };