
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');



export const uploadImageCloudinary=
  async (file: Express.Multer.File, folder:string) : Promise<UploadApiResponse | UploadApiErrorResponse>=> {

    v2.config({
      api_key: (process.env.API_KEY),
      cloud_name: process.env.CLOUD_NAME,  
      api_secret: process.env.API_SECRET,
    });

    return new Promise((resolve, reject) => {
    const upload = v2.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      resolve(result);
    });  
    toStream(file.buffer).pipe(upload);
  });
};

export const deleteImageCloudinary=(image: string)=>{

  v2.config({
    api_key: (process.env.API_KEY),
    cloud_name: process.env.CLOUD_NAME,  
    api_secret: process.env.API_SECRET,
  });
  const nombreArr=image.split('/');
  const nombre=nombreArr[nombreArr.length-1];
  const [public_id] = nombre.split('.');
  v2.uploader.destroy(public_id);
}