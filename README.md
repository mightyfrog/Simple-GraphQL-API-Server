# Simple-GraphQL-API-Server
A simple GraphQL API server sample for shibuya.apk #17

## Download dependencies:
```text
npm install --save
```

## Start GraphQL API server:
```text
node server.js
```
The server starts running on localhost: http://localhost:4000/graphql

## Queries:
- allMovies: [Movie!]
```javascript
{
  allMovies {
    id
    title
    year
    rating
  }
}
```
- movie(id: ID!): Movie
```javascript
movie(id:"8e989b68-34a6-40ca-a33b-e0b7f7420cdc") {
  id
  title
}
```
## Mutation:
- addMovie(movie: MovieInput!): Movie!
```javascript
mutation addMovie($movie: MovieInput!) {
  addMovie(movie: $movie) {
    id
  }
}

{
  "movie": {
    "title": "The Shining",
    "year": 1980,
    "rating": 8.4
  }
}
```
See GraphiQL Documentation Explorer for more details.