import { Router } from "express";
import GetCombinedLogs from "../controllers/admin/logs.controller";


const log_router = Router();

log_router.get('/live-log', GetCombinedLogs);

export default log_router;