import multer from "multer";
import path from "path";
import crypto from "crypto";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public/", "videos/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      crypto.randomBytes(16).toString("hex").substring(0, 8) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const createEpisodeUploader = multer({ storage: storage });
