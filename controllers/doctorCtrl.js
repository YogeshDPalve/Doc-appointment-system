const doctorModel = require("../models/doctorModel");
const getDoctorInfoController = async (req, res) => {

    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    // console.log(doctor);
  res.status(200).send({
    success: true,
    message: "Doctor details fetched successfully",
    data: doctor,
  });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching doctor details",
      error,
    });
  }
};

module.exports = { getDoctorInfoController };
