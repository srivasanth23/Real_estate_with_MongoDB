import User from "../database/user.model.js";
import Residency from "../database/residencies.model.js";
import moment from "moment";

//creating a user
// export const createUser = asyncHandler(async (req, res) => {
//   console.log("creating a user");

//   let { email } = req.body;
//   const userExists = await prisma.user.findUnique({ where: { email: email } });
//   if (!userExists) {
//     const user = await prisma.user.create({ data: req.body });
//     res.send({
//       message: "User registered successfully",
//       user: user,
//     });
//   } else res.status(201).send({ message: "User already registered" });
// });

export const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(201).send({ message: "User already registered" });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error creating user" });
  }
};

//booking a residency
// export const bookVisit = asyncHandler(async (req, res) => {
//   const { email, date } = req.body;
//   const { id } = req.params;

//   try {
//     const alreadyBooked = await prisma.user.findUnique({
//       where: { email },
//       select: { bookedVisits: true },
//     });

//     if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
//       res.status(400).json({ message: "This residency is already booked" });
//     } else {
//       await prisma.user.update({
//         where: { email: email },
//         data: {
//           bookedVisits: { push: { id, date } },
//         },
//       });
//       res.send("Booked successfully");
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

export const bookVisit = async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;
  const parsedDate = moment(date, "DD/MM/YYYY").toDate();
  console.log(id);

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const residency = await Residency.findById(id);
    if (!residency) {
      return res.status(404).json({ message: "Residency not found" });
    }


    const alreadyBooked = user.bookedVisits.some(
      (visit) => visit.id.toString() === id
    );

    if (alreadyBooked) {
      return res
        .status(400)
        .json({ message: "This residency is already booked for this date" });
    }

    user.bookedVisits.push({ id: id, date: parsedDate });
    await user.save();

    res.send("Booked successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error booking residency" });
  }
};

//getting all bookings of a user
// export const getAllBookings = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   try {
//     const bookings = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//       select: {
//         bookedVisits: true,
//       },
//     });
//     res.send(bookings);
//   } catch (err) {
//     res.status(401).json({ message: err });
//   }
// });

export const getAllBookings = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email }).select("bookedVisits");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user.bookedVisits); // Sending only bookedVisits
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting bookings" });
  }
};

//cancelling a booking of a user
// export const cancelBooking = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { email } = req.body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//       select: { bookedVisits: true },
//     });

//     const index = user.bookedVisits.findIndex((visit) => visit.id === id); //finds index of cancelling residency
//     if (index == -1) {
//       res.send("Booking not found").status(404);
//     } else {
//       user.bookedVisits.splice(index, 1);
//       await prisma.user.update({
//         where: { email },
//         data: { bookedVisits: user.bookedVisits },
//       });
//       res.send("Booking cancelled successfully");
//     }
//   } catch (e) {
//     res.status(401).json({ message: e });
//   }
// });

export const cancelBooking = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      return res.status(404).send({ message: "Booking not found" });
    }

    user.bookedVisits.splice(index, 1);
    await user.save();

    res.send("Booking cancelled successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error cancelling booking" });
  }
};

//to add a residencies to fav of a user
// export const addFavResidencies = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { rid } = req.params;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (user.favResidenciesId.includes(rid)) {
//       const updateUser = await prisma.user.update({
//         where: { email },
//         data: {
//           favResidenciesId: {
//             set: user.favResidenciesId.filter((id) => id !== rid),
//           },
//         },
//       });
//       res.send({ message: "Removed from favourites", data: updateUser });
//     } else {
//       const updateUser = await prisma.user.update({
//         where: { email },
//         data: {
//           favResidenciesId: {
//             push: rid,
//           },
//         },
//       });
//       res.send({ message: "Added to favourites", data: updateUser });
//     }
//   } catch (e) {
//     res.send(e);
//   }
// });

export const addFavResidencies = async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const alreadyFavorited = user.favResidenciesId.includes(rid);

    if (alreadyFavorited) {
      user.favResidenciesId = user.favResidenciesId.filter((id) => id !== rid);
      await user.save();
      res.send({ message: "Removed from favourites" });
    } else {
      user.favResidenciesId.push(rid);
      await user.save();
      res.send({ message: "Added to favourites" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating favorites" });
  }
};

// get all favourite residencies
// export const getAllFavResidencies = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   try {
//     const getFav = await prisma.user.findUnique({
//       where: { email },
//       select: { favResidenciesId: true },
//     });
//     res.status(200).send(getFav);
//   } catch (e) {
//     res.status(401).send(e);
//   }
// });

export const getAllFavResidencies = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).select("favResidenciesId");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user.favResidenciesId); // Sending only favResidenciesId array
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting favorite residencies" });
  }
};
