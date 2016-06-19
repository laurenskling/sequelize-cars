import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

// make wd into a schema Type
const wdType = new GraphQLObjectType({
  name: 'WdFeed',
  description: `A feed object from WD.`,
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The car identifier.`,
    },
    hexonId: {
      type: GraphQLID,
      description: `The origin identifier.`,
    },
    type: {
      type: GraphQLString,
      description: `The type of feed. e.g.: 'add', 'change', 'failed'.`,
    },
    status: {
      type: GraphQLString,
      description: `OK on success, FAILED on failure.`,
    },
    text: {
      type: GraphQLString,
      description: `What has been received from WD.`,
    },
    response: {
      type: GraphQLString,
      description: `What we responded on the feed.`,
    },
    returning: {
      type: GraphQLString,
      description: `What we sent back to WD.`,
    },
    date: {
      type: GraphQLString,
      description: `Insert date.`,
    },
  }),
});

export default wdType;
