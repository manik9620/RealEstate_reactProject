import express from "express";
import { newBookingContoller } from "../controller/bookingController.js";
const router = express.Router();


router.post("/create",newBookingContoller)
export default router;
