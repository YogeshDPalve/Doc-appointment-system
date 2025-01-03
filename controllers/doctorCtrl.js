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

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message:"Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};
module.exports = { getDoctorInfoController, updateProfileController };
