const sequelize = require("../../../db");
const { User } = require("../../../models");

const index = async (req, res) => {
  const model = await User.findOne({
    where: {
      id: req.user.id,
    },
    attributes: { exclude: ["password"] },
  });
  res.json({
    status: true,
    message: "Access profile from admin",
    data: model,
  });
};

const update = async (req, res) => {
  const user = req.user;
  const { name, email, password, blockchainAddress } = req.body;
  console.log(req.body)

  const transaction = await sequelize.transaction();
  const model = await _getModel(user.id);
  if (!model) {
    return res.status(400).json({
      status: false,
      message: "User tidak ditemukan",
    });
  }

  try {
    if (name) model.name = name;
    if (email) model.email = email;
    if (blockchainAddress) model.blockchainAddress = blockchainAddress;
    if (password) model.password = await bcrypt.hash(password, 12);

    await model.save({ transaction });

    await transaction.commit();

    return res.json({
      status: true,
      message: "Berhasil mengubah dokter",
      data: model,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(400).json({ status: false, message: error.message });
  }
};


const _getModel = async (id, options = {}) => {
  let model = await User.findOne({
    where: { id, flag: 1 },
    ...options,
  });

  return model;
};

module.exports = {
  index,
  update,
};
