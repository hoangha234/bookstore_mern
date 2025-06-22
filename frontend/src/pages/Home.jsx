import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table'); // 'table' or 'card'

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://khanhhoangapi.isharoverwhite.cloud/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            {/* View Toggle Buttons */}
            <div className='flex justify-center items-center gap-x-4'>
                <button
                    onClick={() => setShowType('table')}
                    className={`px-4 py-1 rounded-lg ${showType === 'table' ? 'bg-red-400 text-white' : 'bg-sky-300 hover:bg-sky-500'}`}
                >
                    Table
                </button>
                <button
                    onClick={() => setShowType('card')}
                    className={`px-4 py-1 rounded-lg ${showType === 'card' ? 'bg-red-400 text-white' : 'bg-sky-300 hover:bg-sky-500'}`}
                >
                    Card
                </button>
            </div>

            {/* Title + Add Button */}
            <div className='flex justify-between items-center mt-8'>
                <h1 className='text-3xl font-semibold'>Book List</h1>
                
            </div>

            {/* Data Display */}
            {loading ? (
                <Spinner />
            ) : books.length === 0 ? (
                <p className='text-center mt-6 text-gray-500'>No book found.</p>
            ) : showType === 'table' ? (
                <BooksTable books={books} />
            ) : (
                <BooksCard books={books} />
            )}
        </div>
    );
};

export default Home;
