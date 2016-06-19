import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
  GraphQLString,
} from 'graphql';

// make mp into a schema Type
const mpType = new GraphQLObjectType({
  name: 'MpFeed',
  description: `A feed object to MP.`,
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The car identifier.`,
    },
    type: {
      type: new GraphQLEnumType({
        name: 'type_enum',
        values: {
          add: {},
          change: {},
          failed: {},
        },
      }),
      description: `The type of feed. e.g.: 'add', 'change', 'failed'.`,
    },
    status: {
      type: new GraphQLEnumType({
        name: 'status_enum',
        values: {
          OK: {},
          FAILED: {},
        },
      }),
      description: `OK on success, FAILED on failure.`,
    },
    text: {
      type: GraphQLString,
      description: `What we are sending to MP.`,
    },
    response: {
      type: GraphQLString,
      description: `What MP responded on the feed.`,
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

export default mpType;
