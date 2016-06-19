module.exports = function(sequelize, DataTypes) {
  const db = {
    timestamps: false,
    tableName: 'wd_afbeeldingen',
    freezeTableName: true,
  };
  const Model = sequelize.define("image", {
    naaId: {
      field: 'naa_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      field: 'afbeelding',
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      field: 'volgnummer',
      type: DataTypes.INTEGER,
    },
    large: {
      type: DataTypes.INTEGER,
    },
    medium: {
      type: DataTypes.INTEGER,
    },
    small: {
      type: DataTypes.INTEGER,
    },
    xsmall: {
      type: DataTypes.INTEGER,
    },
    thumb: {
      type: DataTypes.INTEGER,
    },
  }, db);
  Model.removeAttribute('id');
  return Model;
}
