import React, {useEffect, useState} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate , useParams} from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3331/books/${id}`)
    .then((res) => {
      setAuthor(res.data.author);
      setPublishYear(res.data.author);
      setTitle(res.data.title);
      setLoading(false);
    }).catch ((err) => {
      setLoading(false);
      alert('check console for error')
      console.log(err);
    })
  },[id])

  const handleEditBook = () => {
    const data = {title, author, publishYear};
    setLoading(true);
    axios
    .put(`http://localhost:3331/books${id}`, data)
    .then(() => {
      setLoading(false);
      navigate('/');
    })
    .catch((err) => {
      setLoading(false);
      alert('check console for error')
      console.log(err); 
    })
  }
// when edit is clicked data from book isn't showing
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className = 'text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 tect-gray-500">title</label>
          <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 tect-gray-500">Author</label>
          <input 
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4 tect-gray-500">Publish Year</label>
          <input 
          type="number"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Save</button>
      </div>
     </div>
  )
}

export default EditBook