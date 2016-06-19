import Sequelize from 'sequelize';

console.log('NODE_ENV:', process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === 'production' ? true : false;

const Conn = new Sequelize(
  isProduction ? 'admin_af-mod' : 'sequelize', // db name
  'root', // db user
  '', // db pass
  {
    dialect: 'mysql',
    host: 'localhost',
    define: {
      engine: 'MYISAM',
    },
  }
);

const modelsDir = `${__dirname}/models`;
const Company = Conn.import(`${modelsDir}/company`);
const Car = Conn.import(`${modelsDir}/car`);
const Image = Conn.import(`${modelsDir}/image`);
const Accessorie = Conn.import(`${modelsDir}/accessorie`);
const WdFeed = Conn.import(`${modelsDir}/feed/wd`);
const OecFeed = Conn.import(`${modelsDir}/feed/oec`);
const NakFeed = Conn.import(`${modelsDir}/feed/nak`);
const MpFeed = Conn.import(`${modelsDir}/feed/mp`);

Car.belongsTo(Company, { foreignKey: 'companyId' });
Car.hasMany(Image, { foreignKey: 'naaId' });
Car.hasMany(Accessorie, { foreignKey: 'naaId' });
Car.hasMany(WdFeed, { foreignKey: 'naaId' });
Car.hasMany(OecFeed, { foreignKey: 'naaId' });
Car.hasMany(NakFeed, { foreignKey: 'naaId' });
Car.hasMany(MpFeed, { foreignKey: 'naaId' });

if (!isProduction) {
  require('./create')(Conn);
}

export default Conn;
