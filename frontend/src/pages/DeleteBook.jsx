import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get(`https://khanhhoangapi.isharoverwhite.cloud/books/${id}`)
      .then(res => setBook(res.data))
      .catch(() => enqueueSnackbar('Failed to fetch book details', { variant: 'error' }));
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://khanhhoangapi.isharoverwhite.cloud/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('Error deleting book', { variant: 'error' });
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <h3 className='text-2xl text-center mb-4'>
          Are you sure you want to delete {book ? `"${book.title}"` : 'this book'}?
        </h3>
        <button
          onClick={handleDeleteBook}
          className='p-4 bg-red-600 text-white m-2 w-full'
        >
          Yes, Delete it
        </button>
        <button
          onClick={() => navigate('/')}
          className='p-4 bg-gray-300 text-black m-2 w-full'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
