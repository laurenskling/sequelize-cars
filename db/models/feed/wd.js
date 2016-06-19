module.exports = function(sequelize, DataTypes) {
  const db = {
    updatedAt: false,
    createdAt: 'date',
    tableName: 'wd_feed',
    freezeTableName: true,
  };
  const Model = sequelize.define("wdFeed", {
    naaId: {
      field: 'naa_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hexonId: {
      field: 'voertuignr_hexon',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      field: 'actie',
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
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
