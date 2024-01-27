import {useState} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveBook = () => {
    const data = {title, author, publishYear};
    setLoading(true);
    axios
    .post('http://localhost:3331/books', data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Book created successfully', {variant: 'success'});
      navigate('/');
    })
    .catch((err) => {
      setLoading(false);
      enqueueSnackbar('check console for error', {variant: 'error'});
      console.log(err); 
    })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className = 'text-3xl my-4'>Create Book</h1>
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
          type="text"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>Save</button>
      </div>
     </div>
  )
}

export default CreateBook