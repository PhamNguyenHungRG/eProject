import React, { useState } from 'react';
import books from '../../../json/Resources/RelatedBooks/Book.json';

const BookList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;  // Số sách hiển thị trên mỗi trang

  // Tính toán tổng số trang
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Lấy sách thuộc trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Chuyển trang
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-success">Danh sách Sách Làm Vườn</h1>
      <div className="row">
        {currentBooks.map((book, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow-lg h-100 border-0" style={{ borderRadius: '15px' }}>
              <img
                src={book.image}
                alt={book.title}
                className="card-img-top"
                style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-success">{book.title}</h5>
                <p className="card-text"><strong>Tác giả:</strong> {book.author}</p>
                <a href={book.link} target="_blank" rel="noopener noreferrer" className="mt-auto btn btn-outline-success rounded-pill">
                  Xem trên Amazon
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button
                className="page-link border-0"
                style={{
                  backgroundColor: page === currentPage ? '#28a745' : 'transparent',
                  color: page === currentPage ? '#fff' : '#28a745',
                  transition: '0.3s',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px'
                }}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BookList;
