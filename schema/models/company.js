import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

const companyType = new GraphQLObjectType({
  name: 'company',
  description: `A company object`,
  fields: () => ({
    companyId: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The company id.`,
    },
    clientId: {
      type: GraphQLID,
      description: `The id of the HEXON client.`,
    },
    OECClientId: {
      type: GraphQLID,
      description: `The id of the OEC client.`,
    },
    name: {
      type: GraphQLString,
      description: `The company name.`,
    },
    address: {
      type: GraphQLString,
      description: `The company address.`,
    },
    zipcode: {
      type: GraphQLString,
      description: `The company zipcode.`,
    },
    city: {
      type: GraphQLString,
      description: `The company city.`,
    },
    email: {
      type: GraphQLString,
      description: `The company email.`
    },
    telephone: {
      type: GraphQLString,
      description: `The company telephone.`
    },
    website: {
      type: GraphQLString,
      description: `The company website.`
    },
  }),
});

export default companyType;
