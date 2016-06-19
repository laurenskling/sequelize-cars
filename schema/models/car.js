import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import imageType from './image';
import accessorieType from './accessorie';
import companyType from './company';
import wdType from './feed/wd';
import oecType from './feed/oec';
import nakType from './feed/nak';
import mpType from './feed/mp';

// make Car into a schema Type
const carType = new GraphQLObjectType({
  name: 'Car',
  description: `A car object.`,
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The car identifier.`,
    },
    hexonId: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The origin identifier.`,
    },
    clientId: {
      type: GraphQLID,
      description: `The origin company identifier.`,
    },
    vehicleType: {
      type: GraphQLString,
      description: `The type of vehicle, e.g.: 'voertuigsoort'.`,
    },
    name: {
      type: GraphQLString,
      description: `The brand, model and type of the car combined.`,
      resolve({ brand, model, type }) {
        return `${brand} ${model} ${type}`;
      },
    },
    brand: {
      type: GraphQLString,
      description: `The brand name.`,
    },
    model: {
      type: GraphQLString,
      description: `The model name.`,
    },
    type: {
      type: GraphQLString,
      description: `The type name.`,
    },
    licensePlate: {
      type: GraphQLString,
      description: `The license plate number.`,
    },
    body: {
      type: GraphQLString,
      description: `The type of body. e.g.: 'carrosserie'.`,
    },
    fuel: {
      type: GraphQLString,
      description: `The type of fuel. e.g.: 'benzine'.`,
    },
    transmission: {
      type: GraphQLString,
      description: `The type of transmission. e.g.: 'handgeschakeld'.`,
    },
    numberOfGears: {
      type: GraphQLInt,
      description: `The number of gears.`,
    },
    numberOfDoors: {
      type: GraphQLInt,
      description: `The number of doors.`,
    },
    mileage: {
      type: GraphQLInt,
      description: `The mileage in kilometers.`,
    },
    year: {
      type: GraphQLString,
      description: `The year this car was built.`,
    },
    color: {
      type: GraphQLString,
      description: `The exterior color.`,
    },
    interiorColor: {
      type: GraphQLString,
      description: `The interior color.`,
    },
    emission: {
      type: GraphQLString,
      description: `The level of co2 emission.`,
    },
    energyLabel: {
      type: GraphQLString,
      description: `The energy label.`,
    },
    stockPrice: {
      type: GraphQLInt,
      description: `The default price.`,
    },
    price: {
      type: GraphQLInt,
      description: `The current offering price.`,
    },
    preparationCost: {
      type: GraphQLInt,
      description: `The cost of preparing the car.`,
    },
    expected: {
      type: GraphQLInt,
      description: `The car is not in yet, but expected soon.`,
    },
    remarks: {
      type: GraphQLString,
      description: `Additional comments.`,
    },
    sendtonak: {
      type: GraphQLString,
      description: `The status of sending to Nieuweautokopen.`,
    },
    sendtomp: {
      type: GraphQLString,
      description: `The status of sending to Marktplaats.`,
    },
    mpKey: {
      type: GraphQLString,
      description: `The given Marktplaats key.`,
    },
    images: {
      type: new GraphQLList(imageType),
      description: `The car its images.`,
      resolve: (car) => car.getImages({ order: [['order', 'ASC']] }),
    },
    accessories: {
      type: new GraphQLList(accessorieType),
      description: `The car its accessories.`,
      resolve: (car) => car.getAccessories(),
    },
    company: {
      type: companyType,
      description: `The car its company.`,
      resolve: (car) => car.getCompany(),
    },
    wdFeed: {
      type: new GraphQLList(wdType),
      description: `The car its feed history from wd.`,
      resolve: (car) => car.getWdFeeds(),
    },
    oecFeed: {
      type: new GraphQLList(oecType),
      description: `The car its feed history from oec.`,
      resolve: (car) => car.getOecFeeds(),
    },
    origin: {
      type: GraphQLString,
      description: `What kind of feed does this car come from.`,
    },
    nakFeed: {
      type: new GraphQLList(nakType),
      description: `The car its feed to NAK.`,
      resolve: (car) => car.getNakFeeds(),
    },
    mpFeed: {
      type: new GraphQLList(mpType),
      description: `The car its feed to MP.`,
      resolve: (car) => car.getMpFeeds(),
    },
  }),
});

export default carType;
