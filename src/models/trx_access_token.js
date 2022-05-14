'use strict';

module.exports = (sequelize, DataTypes) => {
  const Trx_access_token = sequelize.define('Trx_access_token', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    access_token: {
      type: DataTypes.TEXT,
    },
    ip_address: {
      type: DataTypes.STRING(200)
    }
  }, {
    tableName: 'trx_access_tokens',
    timestamps: true
  });

  Trx_access_token.associate = function (models) {
    Trx_access_token.belongsTo(models.Master_account, {
      foreignKey: {
        name: 'id',
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
  };

  return Trx_access_token;
};