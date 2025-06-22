import { Link } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import BookSingleCard from "./BookSingleCard";
const BooksCard = ({ books }) => {
    return (
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4'>
        {books.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No books found.</p>
        ) : (
          books.map((item) => (
            <BookSingleCard key={item._id} book={item} />
          ))
        )}
      </div>
    );
  };
  
  export default BooksCard;
