'use strict';

module.exports = (sequelize, DataTypes) => {
  const Master_user = sequelize.define(
    "Master_user",
    {
      firstname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      fullname: {
        type: DataTypes.VIRTUAL,
        get() {
          const firstname = this.firstname;
          const lastname = this.lastname;
          return `${firstname} ${lastname}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullname` value!");
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Female", "Male"),
        allowNull: false,
      },
      date_birth: {
        type: DataTypes.DATEONLY,
      },
      photo: {
        type: DataTypes.TEXT,
      },
      idUser_create: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idUser_update: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "master_users",
      timestamps: true,
    }
  );

  Master_user.associate = function (models) {
    Master_user.belongsTo(models.Master_account, {
      foreignKey: {
        name: "id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    })
  }

  return Master_user;
};