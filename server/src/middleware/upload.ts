import { s3 } from "../services/amazon";

const multer = require("multer");
const multerS3 = require("multer-s3");
const fs = require("fs");
const path = require("path");
var uuid = require("uuid");

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket:'vhuportal',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req: any,file: any, cb: any) {
        cb(null, "student/" + uuid.v4() + path.extname(file.originalname));
    },
  }),

  limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports = uploadS3;

