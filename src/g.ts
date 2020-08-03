import * as cloudinary from 'cloudinary';

cloudinary.v2;
cloudinary.v2.config({
  cloud_name: 'reactcommerce',
  api_key: '344174846447425',
  api_secret: 'Dvo_ji1zPjoV9Ba7zHqAMopSPIM',
});

cloudinary.v2.uploader.upload('check.jpg', function(error, result) {
  console.log(result, error);
});
