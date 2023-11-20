import express from "express";
import { addAdmin, adminLogin, getAdminById, getAdmins } from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/Signup",addAdmin);
adminRouter.post("/login",adminLogin);
adminRouter.get("/",getAdmins);
adminRouter.post("/:id",getAdminById);

export default adminRouter;
