import React from 'react'
import BookSingleCard from './BookSingleCard'

function BooksCard({books}) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3'>
      {books.map((book) => (
        <BookSingleCard book={book} />
      ))}
    </div>
  )
}

export default BooksCard
