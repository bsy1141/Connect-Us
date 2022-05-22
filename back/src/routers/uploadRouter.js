import is from "@sindresorhus/is";
import { Router } from "express";
import multer from "multer";
import { login_required } from "../middlewares/login_required";

const uploadRouter = Router();
uploadRouter.use(login_required);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

uploadRouter.post(
  "/uploadImage",
  upload.single("image"),
  async function (req, res, next) {
    try {
      const saveFileName = req.file.filename; // 저장된 파일명​
      const saveFilePath = `http://localhost:5001/uploads/${saveFileName}`; // 업로드된 파일의 경로 (index.html 기준)

      res.status(201).send(saveFilePath);
    } catch (error) {
      next(error);
    }
  }
);

export { uploadRouter };
