const EnumRoles = require("../../../enums/roles");
const bcrypt = require("bcryptjs");
const { User, Role, RoleUser } = require("../../../models");
const sequelize = require("../../../db");
const { Op } = require("sequelize");

// const ROLE = EnumRoles.IDDOCTOR;
const showConfig = {
  include: [
    {
      model: Role,
      as: "roles",
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
      where: {
        id: {
          [Op.notIn]: [EnumRoles.IDPATIENT],
        },
      },
    },
  ],
  attributes: [
    "id",
    "name",
    "email",
    "blockchainAddress",
    "createdAt",
    "updatedAt",
  ],
};

const index = async (req, res) => {
  const data = await User.findAll({
    where: { flag: 1 },
    ...showConfig,
  });

  return res.json({ status: true, data, message: "fetching data" });
};

const show = async (req, res) => {
  const { id } = req.params;
  const model = await _getModel(id, {
    ...showConfig,
  });
  if (!model) {
    return res
      .status(404)
      .json({ status: false, message: "User tidak ditemukan" });
  }

  return res
    .status(200)
    .json({ status: true, message: "User tidak ditemukan", data: model });
};

const store = async (req, res) => {
  const { name, email, password, roleId, blockchainAddress } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const model = await User.create(
      {
        name,
        email,
        password: await bcrypt.hash(password, 12),
        blockchainAddress,
      },
      { transaction }
    );

    await model.setRoles(roleId, { transaction });

    if (!transaction.finished) await transaction.commit();
    return res.json({
      status: true,
      message: "Berhasil menambahkan data",
      data: model,
    });
  } catch (error) {
    console.log(error)
    if (!transaction.finished) await transaction.rollback();
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, blockchainAddress, roleId } = req.body;

  const transaction = await sequelize.transaction();
  const model = await _getModel(id);
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

    if (roleId) {
      console.log("-------------------");
      console.log("-------ROLES-------");
      let roles = await RoleUser.findAll({ where: { userId: id } }, { transaction });
      console.log(roles);
      roles.map(async (role) => {
        await model.removeRoles(role.roleId, { transaction });
      });
      await model.addRoles(roleId, { transaction });
    }

    await transaction.commit();

    return res.json({
      status: true,
      message: "Berhasil mengubah dokter",
      data: model,
    });
  } catch (error) {
    console.log(error)
    await transaction.rollback();
    return res.status(400).json({ status: false, message: error.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();
  const model = await _getModel(id);
  if (!model) {
    await transaction.rollback();
    return res.status(400).json({
      status: false,
      message: "User tidak ditemukan",
    });
  }

  try {
    model.flag = 0;
    await model.save({ transaction });

    await transaction.commit();
    return res.json({ message: "Berhasil menghapus data" });
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
  show,
  store,
  update,
  destroy,
};
