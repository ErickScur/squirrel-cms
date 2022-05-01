import * as path from 'path';
import multer from 'multer';
import crypto from 'crypto';

export const storage = {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', folder),
        filename: (request, file, cb) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;
          return cb(null, fileName);
        },
      }),
    };
  },
};
