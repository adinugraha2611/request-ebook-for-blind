/**
 * included components: ReqButton, VoteSection
 * props:
 * - category ('ReqSection', 'bookResult')
 * - book: array of book's brief info
 * - detailedInfo: array of all detailed book's info
 */

import React, { Fragment, useState } from 'react';
import { VoteSection } from './VoteSection';
import { ReqButton } from './ReqButton';

export const InfoListItem = ({ book, detailedInfo, category }) => {
  const handleListItem = () => {
    const infos = [
      'imageLinks',
      'title',
      'subtitle',
      'authors',
      'averageRating',
      'publishedDate',
      'publisher',
      'categories',
    ];

    // assign to '-' if info was empty/unavailable
    for (let info of infos) {
      if (!book[info]) {
        book[info] = '-';
      }
    }

    const arrJoin = (info) => {
      if (info === '-') return '-';
      else return info.join(', ');
    };

    const b = book;
    return (
      <Fragment>
        <div>
          <img
            src={b.imageLinks.smallThumbnail}
            alt={`Gambar Cover untuk ${b.title}`}
          />
        </div>
        <h4>{b.title}</h4>
        <p>{b.subtitle === '-' ? '' : b.subtitle}</p>
        <div>
          Pengarang: {arrJoin(b.authors)}.
          <br />
          Penerbit: {b.publisher}.
          <br />
          Tanggal Terbit: {b.publishedDate}
          <br />
          Kategori: {arrJoin(b.categories)}
          <br />
          Rating: {b.averageRating + '/5'}
        </div>
      </Fragment>
    );
  };

  // run info handler function
  const listItem = handleListItem();

  return (
    <li>
      {listItem}
      <BookDescription content={book.description} />

      {category === 'bookResult' ? <ReqButton book={detailedInfo} /> : null}

      {category === 'reqSection' ? (
        <VoteSection bookInfo={detailedInfo} />
      ) : null}
    </li>
  );
};

// BookDescription component
const BookDescription = ({ content }) => {
  const [showDesc, setShowDesc] = useState(false);

  const toggleDesc = (e) => {
    e.preventDefault();
    setShowDesc(!showDesc);
  };
  return (
    <div>
      <a href="#" onClick={toggleDesc}>
        {showDesc ? 'Sembunyikan deskripsi' : 'Lihat deskripsi'}
      </a>
      {showDesc && <p>{content}</p>}
    </div>
  );
};
