// const Migrations = artifacts.require("Migrations");
const RekamMedis = artifacts.require("RekamMedis")

// module.exports = function (deployer) {
//   deployer.deploy(Migrations);
// };

module.exports = function (deployer) {
  deployer.deploy(RekamMedis);
}
