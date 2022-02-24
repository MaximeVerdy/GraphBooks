import { useQuery } from '@apollo/client';

import { getBookQuery } from '../queries/queries';


const BookDetails = ({ bookId }) => {
     // console.log(bookId);

     const { loading, error, data } = useQuery(getBookQuery, {
          variables: { id: bookId },
     });

     let displayDetails = () => {
     if (bookId) {
          if (loading) return <p>Loading...</p>;
          if (error) return `Error! ${error}`;
          if (data) {
               // console.log(`⭐ - data`, data.book.author.books);
               

                    return (
                         <div>
                         <h2>TITRE : { data.book.name }</h2>
                         <p>GENRE : { data.book.genre }</p>
                         <p>AUTEUR : { data.book.author.name }</p>
                         <p>TOUS LES TITRES DU MEME AUTEUR :</p>
                         <ul className="other-books">
                             { data.book.author.books.map(item => {
                                 return <li key={item.id}>{ item.name }</li>
                             })}
                         </ul>
                     </div>
                    )
               }
          }
     }

     return (
          <div id="book-details">
               {displayDetails()}
          </div>
     );
}

export default BookDetails;