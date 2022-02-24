import { gql } from '@apollo/client';

const getBooksQuery = gql`
{
     books {
          name
          id
          author {
               name
          }
     }
}
`
const getAuthorsQuery = gql`
{
     authors {
          name
          id
     }
}
`

const addBookMutation = gql`
     mutation ($name:String!, $genre: String!, $authorId: ID!) {
          addBook (name:$name, genre:$genre, authorId:$authorId) {
               name
               id
          }
     }
`

const getBookQuery = gql`
     query ($id:ID) {
          book(id:$id){
          id
          name
          genre
          author{
               name
               age
               books {
                    name
                    id
               }
          }
     }
}
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery };