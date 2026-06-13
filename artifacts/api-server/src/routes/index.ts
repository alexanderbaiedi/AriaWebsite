import { Router, type IRouter } from "express";
import healthRouter from "./health";
import interpreterApplicationsRouter from "./interpreter-applications";

const router: IRouter = Router();

router.use(healthRouter);
router.use(interpreterApplicationsRouter);

export default router;
