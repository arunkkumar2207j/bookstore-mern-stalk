import React, { useState, useEffect } from 'react'
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";

export default function DeleteBook() {
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState({})
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:5555/api/books/${id}`)
      .then(() => {
        setLoading(false)
        enqueueSnackbar("Book Deleted successfully", {variant: "success"})
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar("Error", {variant: "error"})
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/api/books/${id}`)
      .then((resp) => {
        setLoading(false)
        setBook(resp.data)
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar("Error", {variant: "error"})
        setLoading(false)
      })
  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (<Spinner />) : (
        <div className='flex flex-col border-2 border-sky-100 rounded-xl w-fit p-4 text-left'>
          <div className='p-4'>
            <span className='text-xl mr-5 text-gray-500'>Id:</span>
            <span>{book._id}</span>
          </div>
          <div className='p-4'>
            <span className='text-xl mr-5 text-gray-500'>Title:</span>
            <span>{book.title}</span>
          </div>
          <div className='p-4'>
            <span className='text-xl mr-5 text-gray-500'>Author:</span>
            <span>{book.author}</span>
          </div>
          <div className='p-4'>
            <span className='text-xl mr-5 text-gray-500'>Publish Year:</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='p-4'>
            <span className='text-xl mr-5 text-gray-500'>Create Time:</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='p-4'>
            <span className='text-xl mr-5 text-gray-500'>Last Updated Time:</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
          <h3 className='p-4 text-xl text-red-400'>Are you sure you want to delete this book</h3>
            <button className='p-4 bg-red-400 text-white m-8 w-full' onClick={() => handleDeleteBook()}>Delete</button>
        </div>
      )}
    </div>
  )
}
