import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import ip from "ip";
import fs from "fs/promises";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { formattedDateStamp, promiser } from "./utils";

dotenv.config();
const app = express();
const ipAddress = ip.address();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const port = process.env.PORT || 5000;

path.join("server", "uploads", "new");

const storage = multer.diskStorage({
  destination: "public/uploads/new",

  filename: (req, file, cb) => {
    cb(
      null,
      formattedDateStamp() + "_" + Date.now() + path.extname(file.originalname)
    );
  },

  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/uploads/new", upload.single("image"), async (req, res) => {
  const uploadPath = path.join(__dirname, "..", "public", "uploads", "new/");
  // Check if the file exists in the upload location
  const [fileExists, fileExistsErr] = await promiser(
    fs.access(uploadPath, fs.constants.F_OK)
  );

  // Make sure the file actually uploaded before sending the response
  if (fileExistsErr) {
    throw fileExistsErr;
  } else {
    res.send({
      url: "/uploads/new/" + req.file?.filename,
    });
  }
});

app.post("/save-post", upload.none(), async (req, res) => {
  const filenameDelimiter = "_";
  let filename =
    formattedDateStamp() +
    filenameDelimiter +
    Date.now() +
    filenameDelimiter +
    req.body.slug;
  let fileSuffix = ".md";
  let uploadPath = path.join("server", "posts", filename + fileSuffix);

  const [_save, saveMarkdownErr] = await promiser(
    fs.writeFile(uploadPath, req.body.markdown)
  );

  if (saveMarkdownErr) {
    throw saveMarkdownErr;
  }

  // Check if the file exists in the upload location
  const [_file, fileExistsErr] = await promiser(
    fs.access(uploadPath, fs.constants.F_OK)
  );

  // Make sure the file actually uploaded before sending the response
  if (fileExistsErr) {
    throw fileExistsErr;
  } else {
    res.send({
      title: req.body.title,
      markdown: req.body.markdown,
      url: path.join("/posts", filename + fileSuffix),
    });
  }
});

app.get("/products", (req, res) => {
  const options = {
    method: "GET",
    url: `https://dummyjson.com/products`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () =>
  console.log(`Server started on port http://${ipAddress}:${port}`)
);

function handleError(err, res) {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
}
