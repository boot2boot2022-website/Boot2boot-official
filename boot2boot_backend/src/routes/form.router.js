import { Router } from "express"
import { submitForm } from "../controllers/form.controller.js"

const router = Router();

router.route("/").post(submitForm);

export default router;
