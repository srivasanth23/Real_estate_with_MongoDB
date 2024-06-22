import express from "express";
import {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  addFavResidencies,
  getAllFavResidencies,
} from "../controllers/userControllers.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookvisit/:id", bookVisit);
router.get("/allbookings", getAllBookings);
router.post("/cancelbooking/:id", cancelBooking);
router.post("/addtofav/:rid", addFavResidencies);
router.get("/getallfav", getAllFavResidencies);

export { router as userRoutes };
