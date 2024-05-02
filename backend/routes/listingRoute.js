import express from "express";
import {
 listingController,getlistingController,
 storage,getlistingByIdController,
 searchController
} from "../controller/listingController.js";
import multer from "multer";

const upload = multer({ storage:storage });
const router = express.Router();

router.post("/create",upload.array("listingPhotos"),listingController)
router.get("/",getlistingController)
router.get("/:listingId",getlistingByIdController)
router.get("/search/:search",searchController)






export default router;
