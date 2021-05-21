const yup = require("yup");
const MyError = require("../error/MyError");
const Data = require("../../../database/dataModel");

const formValidation = yup.object({
  serviceCenter: yup.string().required(),
  serviceName: yup.string().required(),
});

exports.createData = async (req, res, next) => {
  try {
    const data = await formValidation
      .validate({
        ...req.body,
      })
      .catch((err) => {
        throw new MyError(400, err.errors?.[0]);
      });

    console.log(data);

    const payload = {
      serviceName: data.serviceName,
      serviceCenter: data.serviceCenter,
    };

    delete data.serviceName;
    delete data.serviceCenter;

    payload.otherInfo = Object.entries(data);

    console.log(payload);
    await Data.create(payload);

    res.json({
      success: true,
      data: "File created successfully.",
    });
  } catch (error) {
    next(error);
  }
};
