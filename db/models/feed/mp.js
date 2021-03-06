module.exports = function(sequelize, DataTypes) {
  const db = {
    updatedAt: false,
    createdAt: 'date',
    tableName: 'mp_feed',
    freezeTableName: true,
  };
  const Model = sequelize.define("mpFeed", {
    naaId: {
      field: 'naa_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      field: 'actie',
      //type: DataTypes.ENUM('', 'add', 'change', 'failed'),
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      // type: DataTypes.ENUM('OK', 'FAILED'),
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT('long'),
    },
    response: {
      type: DataTypes.TEXT('long'),
    },
    returning: {
      type: DataTypes.TEXT('long'),
    },
  }, db);
  return Model;
}
