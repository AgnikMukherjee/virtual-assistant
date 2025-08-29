import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

const uploadCloudinary = async (filepath)=>{
     // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(filepath)
       .catch((error) => {
           console.log(error);
       });

       fs.unlinkSync(filepath)

       return uploadResult.secure_url
    } catch (error) {
        fs.unlinkSync(filepath)
        console.log(error);
        return res.status(500).json({message: `uploadCloudinary error: ${error.message}`})
    }
}

export default uploadCloudinary