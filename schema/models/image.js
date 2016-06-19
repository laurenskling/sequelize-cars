import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const URL = '//URL';

// make Image into a schema Type
const imageType = new GraphQLObjectType({
  name: 'Image',
  description: `An image object`,
  fields: () => ({
    image: {
      type: GraphQLString,
      description: `The default image url.`,
      resolve: ({ image }) => `${URL}/${image}`,
    },
    order: {
      type: GraphQLInt,
      description: `The order of the image.`,
    },
    large: {
      type: GraphQLString,
      description: `The large image url.`,
      resolve: ({ large, image }) => `${URL}/${large}/${image}`,
    },
    medium: {
      type: GraphQLString,
      description: `The medium image url.`,
      resolve: ({ medium, image }) => `${URL}/${medium}/${image}`,
    },
    small: {
      type: GraphQLString,
      description: `The small image url.`,
      resolve: ({ small, image }) => `${URL}/${small}/${image}`,
    },
    xsmall: {
      type: GraphQLString,
      description: `The xsmall image url.`,
      resolve: ({ xsmall, image }) => `${URL}/${xsmall}/${image}`,
    },
    thumb: {
      type: GraphQLString,
      description: `The thumb image url.`,
      resolve: ({ thumb, image }) => `${URL}/${thumb}/${image}`,
    },
  }),
});

export default imageType;
