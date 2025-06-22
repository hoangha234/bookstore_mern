import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
        setImageUrl(book.imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('An error happened. Please check the console.');
      });
  }, [id]);

  const handleEditBook = async () => {
    if (!title.trim()) {
      enqueueSnackbar('Title must not be emty', { variant: 'error' });
      return;
    }
    if (!author.trim()) {
      enqueueSnackbar('Author must not be emty', { variant: 'error' });
      return;
    }
    if (!publishYear) {
      enqueueSnackbar('Publish year must not be emty', { variant: 'error' });
      return;
    }

    const year = Number(publishYear);
    if (isNaN(year) || year < 2000 || year > 2025) {
      enqueueSnackbar('Publish year must be between 2000 to 2025', { variant: 'error' });
      return;
    }
    try {
      setLoading(true);

      let finalImageUrl = imageUrl;

      // If user chose a new image, upload it
      if (newImageFile) {
        const formData = new FormData();
        formData.append('image', newImageFile);

        const uploadRes = await axios.post('https://khanhhoangapi.isharoverwhite.cloud/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        finalImageUrl = uploadRes.data.imageUrl;
      }

      const data = {
        title,
        author,
        publishYear,
        imageUrl: finalImageUrl,
      };

      await axios.put(`https://khanhhoangapi.isharoverwhite.cloud/books/${id}`, data);
      enqueueSnackbar('Book updated successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error updating book', { variant: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-slate-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-slate-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-slate-500 px-4 py-2 w-full'
          />
        </div>
        
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Upload New Image </label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setNewImageFile(e.target.files[0])}
            className='border-2 border-slate-500 px-4 py-2 w-full'
          />
        </div>
        <button
          className='p-2 bg-sky-300 hover:bg-sky-400 transition-all duration-200 m-8'
          onClick={handleEditBook}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditBook;
