import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

// make oec into a schema Type
const oecType = new GraphQLObjectType({
  name: 'OecFeed',
  description: `A feed object from OEC.`,
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The car identifier.`,
    },
    type: {
      type: GraphQLString,
      description: `The type of feed. e.g.: 'add', 'change', 'failed'.`,
    },
    status: {
      type: GraphQLString,
      description: `OK on success, FAILED on failure.`,
    },
    licensePlate: {
      type: GraphQLString,
      description: `The car its license plate.`,
    },
    text: {
      type: GraphQLString,
      description: `What has been received from OEC.`,
    },
    response: {
      type: GraphQLString,
      description: `What OEC responded on the feed.`,
    },
    returning: {
      type: GraphQLString,
      description: `What we sent back to OEC.`,
    },
    date: {
      type: GraphQLString,
      description: `Insert date.`,
    },
  }),
});

export default oecType;
