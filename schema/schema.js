import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
} from 'graphql';

import carType from './models/car';
import Db from '../db/db';

const Query = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Fetch cars from the NAA database.',
  fields: () => ({
    cars: {
      type: new GraphQLList(carType),
      args: {
        id: {
          type: GraphQLInt,
          description: `Fetch a car by its ID.`,
        },
        limit: {
          type: GraphQLInt,
          description: `Limit the result.`,
        },
        licensePlate: {
          type: GraphQLString,
          description: `Fetch a car by its license plate.`,
        },
        companyId: {
          type: GraphQLInt,
          description: `Fetch all the cars of this company.`,
        },
        origin: {
          type: GraphQLString,
          description: `Enum 'oec', 'wd'.`,
        },
      },
      resolve(root, { origin, limit, ...args}) {
        if (origin === 'wd') {
          args.hexonId = { $ne: 0 };
        } else if (origin === 'oec') {
          args.hexonId = 0;
        }
        return Db.models.car.findAll({
          where: args,
          limit,
        });
      },
    },
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
