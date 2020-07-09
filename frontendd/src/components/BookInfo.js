import React, { useEffect } from 'react';
import { InfoListItem } from './InfoListItem';

export const BookInfo = ({ category, data }) => {
  // functions
  const handleBookInfo = () => {
    if (data.items === undefined) return '';

    const infoList = data.items.map((book) => {
      return (
        <InfoListItem
          key={book.id}
          book={book.volumeInfo}
          detailedInfo={book}
          category={category}
        />
      );
    });
    return infoList;
  };
  return (
    <div>
      <ul>{handleBookInfo()}</ul>
    </div>
  );
};
