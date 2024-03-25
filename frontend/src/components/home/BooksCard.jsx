/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import BooksSingleCard from "./BooksSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
      {books.map((item) => (
        <BooksSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksCard;
