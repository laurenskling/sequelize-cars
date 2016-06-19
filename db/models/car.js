module.exports = function(sequelize, DataTypes) {
  const db = {
    updatedAt: 'changed',
    createdAt: 'added',
    tableName: 'wd_wheelerdelta',
    freezeTableName: true,
  };
  return sequelize.define("car", {
    id: {
      field: 'naa_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      field: 'bedrijf_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hexonId: {
      field: 'voertuignr_hexon',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin: {
      type: DataTypes.VIRTUAL(DataTypes.ENUM('oec', 'wd'), ['hexonId']),
      get: function() {
        return this.get('hexonId') === 0 ? 'oec' : 'wd';
      },
    },
    clientId: {
      field: 'klantnummer',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehicleType: {
      field: 'voertuigsoort',
      type: DataTypes.STRING,
    },
    brand: {
      field: 'merk',
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    licensePlate: {
      field: 'kenteken',
      type: DataTypes.STRING,
    },
    body: {
      field: 'carrosserie',
      type: DataTypes.STRING,
    },
    fuel: {
      field: 'brandstof',
      type: DataTypes.STRING,
    },
    transmission: {
      field: 'transmissie',
      type: DataTypes.STRING,
    },
    numberOfGears: {
      field: 'aantal_versnellingen',
      type: DataTypes.INTEGER,
    },
    numberOfDoors: {
      field: 'aantal_deuren',
      type: DataTypes.INTEGER,
    },
    mileage: {
      field: 'kilometerstand',
      type: DataTypes.INTEGER,
    },
    year: {
      field: 'bouwjaar',
      type: DataTypes.STRING,
    },
    color: {
      field: 'kleur',
      type: DataTypes.STRING,
    },
    interiorColor: {
      field: 'interieurkleur',
      type: DataTypes.STRING,
    },
    emission: {
      field: 'co2_uitstoot',
      type: DataTypes.STRING,
    },
    energyLabel: {
      field: 'energielabel',
      type: DataTypes.STRING,
    },
    stockPrice: {
      field: 'prijs',
      type: DataTypes.INTEGER,
    },
    price: {
      field: 'actieprijs',
      type: DataTypes.INTEGER,
    },
    preparationCost: {
      field: 'rijklaar_kosten',
      type: DataTypes.INTEGER,
    },
    expected: {
      field: 'verwacht',
      type: DataTypes.INTEGER,
    },
    remarks: {
      field: 'opmerkingen',
      type: DataTypes.TEXT,
    },
    sendtonak: {
      type: DataTypes.STRING,
    },
    sendtomp: {
      type: DataTypes.STRING,
    },
    mpKey: {
      field: 'mp_key',
      type: DataTypes.STRING,
    },
  }, db);
}
