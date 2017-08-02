var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var uuidV4 = require('uuid/v4');

var schema = buildSchema(`
  type Movie {
      id: ID!
      title: String!
      year: Int!
      rating: Float!
  }

  input MovieInput {
    title: String!
    year: Int!
    rating: Float!
  }

  type Query {
    allMovies: [Movie!]
    movie(id: ID!): Movie
  }

  type Mutation {
    addMovie(movie: MovieInput!): Movie!
  }
`)

var movies = {}

var root = {
    allMovies: function() {
        return Object.keys(movies).map(function(k) { return movies[k] })
    },

    movie: function({ id }) {
        return movies[id];
    },

    addMovie: function({ movie }) {
        var item = {
            "id": uuidV4(),
            "title": movie.title,
            "year": movie.year,
            "rating": movie.rating,
            "___type": "Movie"
        };

        movies[item.id] = item;

        return item;
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({ schema: schema, rootValue: root, graphiql: true }));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');