import React, {useState, useEffect} from 'react'
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar} from "notistack"

const EditBook = () => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [publishYear, setPubhlishYear] = useState("")
  const navigate = useNavigate();
  const { id } = useParams();
  const handleEditBook = () => {
    const data = {
      title: title,
      author: author,
      publishYear: publishYear
    }
    setLoading(true);
    axios
      .put(`http://localhost:5555/api/books/${id}`, data)
      .then(() => {
        setLoading(false)
        enqueueSnackbar("Book Saved Successfully", {variant: "success"})
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar("Error", {variant: "error"})
        setLoading(false)
      })
  }
  useEffect(() => {
    const data = {
      title: title,
      author: author,
      publishYear: publishYear
    }
    setLoading(true);
    axios
      .get(`http://localhost:5555/api/books/${id}`, data)
      .then((resp) => {
        setTitle(resp.data.title)
        setAuthor(resp.data.author)
        setPubhlishYear(resp.data.publishYear)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Update Book</h1>
      {loading ? (<Spinner />) : (
         <div className='flex flex-col border-2 border-sky-100 rounded-xl w-fit p-4 text-left mx-auto'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Title</label>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 py-2 w-full p-2' />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Author</label>
              <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 py-2 w-full p-2' />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
              <input type='number' value={publishYear} onChange={(e) => setPubhlishYear(e.target.value)} className='border-2 border-gray-500 py-2 w-full p-2' />
            </div>
            <button onClick={() => handleEditBook()}>Save</button>
         </div>
      )}
    </div>
  )
}

export default EditBook;
