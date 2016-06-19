import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

// make nak into a schema Type
const nakType = new GraphQLObjectType({
  name: 'NakFeed',
  description: `A feed object to NAK.`,
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
    text: {
      type: GraphQLString,
      description: `What we are sending to NAK.`,
    },
    response: {
      type: GraphQLString,
      description: `What NAK responded on the feed.`,
    },
    returning: {
      type: GraphQLString,
      description: `What we did after.`,
    },
    date: {
      type: GraphQLString,
      description: `Insert date.`,
    },
  }),
});

export default nakType;
