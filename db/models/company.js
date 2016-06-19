module.exports = function(sequelize, DataTypes) {
  const db = {
    timestamps: false,
    tableName: 'wd_bedrijven',
    freezeTableName: true,
  };
  return sequelize.define("company", {
    companyId: {
      field: 'bedrijf_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      field: 'klantnummer',
      type: DataTypes.INTEGER,
    },
    OECClientId: {
      field: 'klantnummer_oec',
      type: DataTypes.INTEGER,
    },
    name: {
      field: 'naam',
      type: DataTypes.STRING,
    },
    address: {
      field: 'adres',
      type: DataTypes.STRING,
    },
    zipcode: {
      field: 'postcode',
      type: DataTypes.STRING,
    },
    city: {
      field: 'plaats',
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    telephone: {
      field: 'telefoon',
      type: DataTypes.STRING,
    },
    website: {
      field: 'website',
      type: DataTypes.STRING,
    },
  }, db);
}
