import { Router } from "express";
import assignSoldiers from "../controllers/assignForce.controller.js";
import getLocation from "../controllers/getLocation.controller.js";
import showSoldiersOnMap from "../controllers/showSoldiersOnMap.controller.js";

const router = Router();

router.route('/').get(showSoldiersOnMap);
router.route('/locations').get(getLocation);
router.route('/assign-soldiers').post(assignSoldiers);

export default router;