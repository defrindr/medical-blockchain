const index = async (req, res) => {
  res.json({ success: true, message: "Access profile from admin" });
};

module.exports = {
  index,
};
