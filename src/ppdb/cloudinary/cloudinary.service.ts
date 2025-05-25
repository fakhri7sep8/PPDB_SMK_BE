import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary.response'; // Ini custom, bebasin aja
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(error || new Error('Upload gagal, result kosong'));
          }
          const response: CloudinaryResponse = {
            file_url: result.secure_url,
            file_name: `${result.public_id}.${result.format}`,
            file_size: result.bytes,
            // Kalau mau include semuanya juga oke
            ...result,
          };
          resolve(response);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
