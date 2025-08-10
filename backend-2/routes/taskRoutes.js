import express from "express";
import { deleteTask, getLabels, getTasks, newTask, updatedTask, updateLabels, updateStatus } from "../controllers/taskControllers.js";


const router = express.Router();

router.post("/task", newTask);
router.get("/task", getTasks);
router.put("/task/:id", updatedTask);
router.get("/labels",getLabels);
router.put("/task/:id/labels",updateLabels);
router.put("/task/:id/status", updateStatus);
router.delete("/task/:id", deleteTask);

export default router;
