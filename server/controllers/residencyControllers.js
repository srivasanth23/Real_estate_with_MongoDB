import Residency from "../database/residencies.model.js";

export const createResidency = async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    facilities,
    image,
    userEmail,
  } = req.body.data;
  try {
    const existingResidency = await Residency.findOne({ address, userEmail });
    if (existingResidency) {
      return res
        .status(400)
        .json({ message: "A residency with this address already exists" });
    }

    const newResidency = new Residency({
      title,
      description,
      price,
      address,
      city,
      country,
      facilities,
      image,
      userEmail,
    });

    await newResidency.save();
    res.send({
      message: "Residency created successfully",
      residency: newResidency,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error creating residency" });
  }
};

//creating a residency
// export const createResidency = asyncHandler(async (req, res) => {
//   console.log("Creating a Residency");
//   const {
//     title,
//     description,
//     price,
//     address,
//     country,
//     city,
//     facilities,
//     image,
//     userEmail,
//   } = req.body.data;

//   console.log(req.body.data);
//   try {
//     const residency = await prisma.residency.create({
//       data: {
//         title,
//         description,
//         price,
//         address,
//         country,
//         city,
//         facilities,
//         image,
//         owner: { connect: { email: userEmail } }, //without user email we cant create a residency
//       },
//     });

//     res.send({ message: "Residency created successfully", residency });
//   } catch (err) {
//     if (err.code === "P2002") {
//       throw new Error("A residency with address already exists");
//     }
//     throw new Error(err.message);
//   }
// });

export const getAllResidencies = async (req, res) => {
  try {
    const residencies = await Residency.find().sort({ createdAt: -1 }); // Sort by descending creation date
    res.send(residencies);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting residencies" });
  }
};

//get all residency
// export const getAllResidencies = asyncHandler(async (req, res) => {
//   try {
//     const residencies = await prisma.residency.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     res.send(residencies);
//   } catch (e) {
//     res.status(400).send("No residencies found");
//   }
// });

export const getResidency = async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await Residency.findById(id);
    if (!residency) {
      return res.status(404).send({ message: "Residency not found" });
    }
    res.send(residency);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting residency" });
  }
};

//get a single residency
// export const getResidency = asyncHandler(async (req, res) => {
//     const {id} = req.params
//     try{
//         const residency = await prisma.residency.findUnique({
//             where : {id}
//         })
//         res.send(residency);
//     }catch(err){
//         throw new Error(err.message);
//     }
// });
