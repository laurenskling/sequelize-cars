module.exports = function(sequelize, DataTypes) {
  const db = {
    timestamps: false,
    tableName: 'wd_accessories',
    freezeTableName: true,
  };
  const Model = sequelize.define("accessorie", {
    naaId: {
      field: 'naa_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      field: 'acc',
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, db);
  Model.removeAttribute('id');
  return Model;
}
