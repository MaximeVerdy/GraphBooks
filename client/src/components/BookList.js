import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { getBooksQuery } from '../queries/queries';

import BookDetails from './BookDetails';

function BookList() {

     const [bSelect, setBSelect] = useState('')
     // console.log(`⭐ - bSelect`, bSelect)

     const { loading, error, data } = useQuery(getBooksQuery);
     if (loading) return <p>Wait a second, It's loading...</p>;
     if (error) return <p>Erreur dans le query graphQL</p>;
     // console.log(`⭐ - data`, data)

     let books = data.books.map(book => 
        { return (<li key={book.id} onClick={e => {setBSelect(book.id)}}>{book.name}</li>)}
     )

     return (
          <div>
               <ul id="book-list">
                    {books}
               </ul>
               <BookDetails bookId={bSelect}/>
          </div>
     );
}

export default BookList;
