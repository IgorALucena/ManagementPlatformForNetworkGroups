import { Router } from "express";
import intentionsRoutes from "./intentions.routes";
import membersRoutes from "./members.routes";

const router = Router();

router.use("/intentions", intentionsRoutes);
router.use("/members", membersRoutes);

export default router;
