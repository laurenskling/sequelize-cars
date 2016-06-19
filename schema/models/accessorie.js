import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

// make Accessorie into a schema Type
const accessorieType = new GraphQLObjectType({
  name: 'Accessorie',
  description: `An accessorie object`,
  fields: () => ({
    value: {
      type: GraphQLString,
      description: `A accessorie.`,
    },
  }),
});

export default accessorieType;
