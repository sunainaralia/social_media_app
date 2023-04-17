/*api for uplaod the image  */
module.exports = async (req, res) => {
  try {
    /*find user's filename */
    return res.status(200).json({
      success: true,
      filename: req.file.filename,
      message: "image uplaoded and  image url found succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
