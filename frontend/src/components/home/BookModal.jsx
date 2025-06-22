import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='w-[600px] max-w-full bg-white rounded-xl p-4 flex flex-col relative'
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close Button */}
        <AiOutlineClose
          className='absolute top-4 right-4 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />

        {/* Book Image */}
        {book.imageUrl && (
          <div className="mb-4 flex justify-center">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="max-w-full max-h-64 object-contain rounded-lg"
            />
          </div>
        )}

        {/* Book Info */}
        <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
          {book.publishYear}
        </h2>
        <h4 className='my-2 text-gray-500 break-all'>{book._id}</h4>

        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-2xl text-red-300' />
          <h2 className='my-1'>{book.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-2xl text-red-300' />
          <h2 className='my-1'>{book.author}</h2>
        </div>

        {/* Optional Description or Notes */}
        <div className='mt-4 text-sm text-gray-700'>
          <p><strong>Created:</strong> {new Date(book.createdAt).toLocaleString()}</p>
          <p><strong>Updated:</strong> {new Date(book.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
