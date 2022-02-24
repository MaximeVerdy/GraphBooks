import { useRef } from 'react';
import { useQuery, useMutation, } from '@apollo/client';
import { flowright as compose } from 'lodash';
// import {useQuery} from '@apollo/react-hooks';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook() {

     let bookName = useRef()
     let genre = useRef()
     let authorSelected = useRef()
     let formRef = useRef()

     const { loading, error, data } = useQuery(getAuthorsQuery);
     let displayAuthors = () => {
          if (loading) return <option disabled>Loading...</option>
          if (error) return <option disabled>Erreur !</option>
          if (data) {
               return data.authors.map(author =>
                    (<option key={author.id} value={author.id}>{author.name}</option>)
               )
          }
     }
     
     
     const [mutateBook, { dataM, loadingM, errorM }] = useMutation(addBookMutation);
     if (loadingM) return 'Submitting...';
     if (errorM) return `Submission error! ${error.message}`;
     
     const handleSub = (e) => {
          e.preventDefault()
          
          mutateBook({
               variables: {
                    name: bookName.current.value,
                    genre: genre.current.value,
                    authorId: authorSelected.current.value,
               },
               refetchQueries : [{query: getBooksQuery}]
          })

          formRef.current.reset()
     }



     return (

          <form id="add-book" onSubmit={handleSub} ref={formRef}>
               <div className="field">
                    <label>Book name:</label>
                    <input type="text" ref={bookName} />
               </div>
               <div className="field">
                    <label>Genre:</label>
                    <input type="text" ref={genre} />
               </div>
               <div className="field">
                    <label>Author:</label>
                    <select ref={authorSelected}>
                         <option>Select author</option>
                         {displayAuthors()}
                    </select>
               </div>
               <button>+</button>

          </form>
     );
}

export default AddBook;
