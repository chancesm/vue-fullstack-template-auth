const path = require("path");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "db.sqlite")
});

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING
  },
  {
    sequelize,
    modelName: "user",
    defaultScope: {
      attributes: { exclude: ["password"] }
    }
  }
);

class Image extends Model {}
Image.init(
  {
    name: DataTypes.STRING,
    fullpath: DataTypes.STRING,
    thumbpath: DataTypes.STRING
  },
  { sequelize, modelName: "image" }
);
Image.belongsTo(User);
sequelize.sync();

module.exports = {
  sequelize,
  User,
  Image
};
