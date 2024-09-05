import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import imageDownloader from "image-downloader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const uploaderDir = path.join(__dirname,'..', 'uploads');
if (!fs.existsSync(uploaderDir)) {
    fs.mkdirSync(uploaderDir);
}


const upload_By_Link = async(req,res)=>{
    const { link } = req.body;
    const newName = "photo" + Date.now() + '.jpg';
    const destinationPath = path.join(uploaderDir, newName);
    try {
        await imageDownloader.image({
            url: link,
            dest: destinationPath,
            timeout: 15000  // 15s timeout
        })
        
        console.log(newName)
        res.json(newName);
    } catch (error) {
        console.error("Error downloading image:", error);
        res.status(500).json({ message: "Error downloading image" });
    }

}




const upload = multer({ storage: storage });

const singleUpload = async(req,res)=>{
    if (!req.file) {
        console.error("No file in request.");
        return res.status(400).send({ message: 'No file uploaded. Please ensure the form is correctly configured and the field name matches.' });
    }
    try {
        console.log(req.file);
        res.send({ message: 'File uploaded successfully', fileName: req.file.filename });
    } catch (error) {
        console.error("Error handling the file upload:", error);
        res.status(500).send({ message: 'Error processing the file.' });
    }
}


const multipleUpload = async(req,res)=>{
    if (!req.files || req.files.length === 0) {
        console.error("No files in request.");
        return res.status(400).send({ message: 'No files uploaded. Please ensure the form is correctly configured and the field name matches.' });
    }
    try {
        console.log(req.files);
        const fileNames = req.files.map(file => file.filename);
        res.send(fileNames);
    } catch (error) {
        console.error("Error handling the file upload:", error);
        res.status(500).send({ message: 'Error processing the file.' });
    }
}

export {upload_By_Link, singleUpload,multipleUpload};