import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    if (!title.trim()) {
      enqueueSnackbar('Title must not be empty', { variant: 'error' });
      return;
    }
    if (title.trim().length < 5) {
      enqueueSnackbar('Title must be at least 5 characters long', { variant: 'error' });
      return;
    }

    if (!author.trim()) {
      enqueueSnackbar('Author must not be empty', { variant: 'error' });
      return;
    }
    if (!publishYear) {
      enqueueSnackbar('Publish year must not be empty', { variant: 'error' });
      return;
    }

    const year = Number(publishYear);
    if (isNaN(year) || year < 2000 || year > 2025) {
      enqueueSnackbar('Publish year must be between 2000 and 2025', { variant: 'error' });
      return;
    }

    try {
      setLoading(true);

      let imageUrl = '';

      // Upload image if provided
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadRes = await axios.post('https://khanhhoangapi.isharoverwhite.cloud/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        imageUrl = uploadRes.data.imageUrl;
      }

      // Save book
      const newBook = {
        title: title.trim(),
        author: author.trim(),
        publishYear: year,
        imageUrl,
      };

      await axios.post('https://khanhhoangapi.isharoverwhite.cloud/books', newBook);

      enqueueSnackbar('Book created successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to create book. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
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
          <label className='text-xl text-gray-500'>Choose Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setImageFile(e.target.files[0])}
            className='border-2 border-slate-500 px-4 py-2 w-full'
          />
        </div>
        <button
          className='p-2 bg-red-300 hover:bg-red-400 transition-all duration-200 m-8'
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
