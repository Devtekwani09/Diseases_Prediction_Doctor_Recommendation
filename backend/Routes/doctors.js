import {getAllDoctor, getSingleDoctor, updateDoctorr, deleteDoctor, getDoctorProfile, getDoctorsBySpecialty } from "../Controllers/doctorController.js";
import express from "express";
const router = express.Router();

import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from './reviews.js'

router.get("/" , getAllDoctor)
router.get("/doctorbyspeciality/:specialty" , getDoctorsBySpecialty)
router.get("/:id", getSingleDoctor)
router.put("/:id",authenticate, restrict(["doctor"]), updateDoctorr)
router.delete('/:id',authenticate, restrict(["doctor"]), deleteDoctor)

router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile )


//nested route
router.use('/:doctorId/reviews', reviewRouter)

export default router;