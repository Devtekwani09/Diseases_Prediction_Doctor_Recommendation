import { updateUser, deleteUser, getSingleUser, getAllUser, getUserProfile, getMyAppoinments } from "../Controllers/userController.js";
import express from "express";
const router = express.Router();
import { authenticate, restrict } from "../auth/verifyToken.js";

router.get("/:id",authenticate, restrict(["patient"]), getSingleUser)
router.get("/" , authenticate, restrict(["admin"]), getAllUser)
router.put("/:id", authenticate, restrict(["patient"]), updateUser)
router.delete('/:id', authenticate, restrict(["patient"]), deleteUser)
router.get('/profile/me', authenticate, restrict(["patient"]), getUserProfile)
router.get('/appointments/my-appointments', authenticate, restrict(["patient"]), getMyAppoinments)

export default router;