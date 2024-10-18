import React, { useState } from 'react';
import Tools from '../../../json/GardeningInfo/ToolsList/Tools.json'; // Thay đổi đường dẫn nếu cần

const ProductsPerPage = 9; // Số sản phẩm hiển thị trên mỗi trang

function ProductSuggestion() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Trạng thái để lưu category đã chọn

    // Lọc sản phẩm có rating >= 4
    const highRatedTools = Tools.filter(tool => tool.rating >= 4);

    // Lấy danh sách các category duy nhất
    const categories = ['All', ...new Set(highRatedTools.map(tool => tool.category))];

    // Lọc sản phẩm theo category đã chọn và rating >= 4
    const filteredTools = selectedCategory === 'All' 
        ? highRatedTools 
        : highRatedTools.filter(tool => tool.category === selectedCategory);

    // Tính toán số lượng trang
    const totalPages = Math.ceil(filteredTools.length / ProductsPerPage);

    // Xác định các sản phẩm cần hiển thị cho trang hiện tại
    const indexOfLastTool = currentPage * ProductsPerPage;
    const indexOfFirstTool = indexOfLastTool - ProductsPerPage;
    const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Đặt lại trang về 1 khi thay đổi category
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4" style={{ color: '#2E8B57' }}>Recommended Products</h2>
            <div className="row">
                {/* Sidebar phân loại */}
                <div className="col-md-3 animate__animated animate__fadeInLeft" style={{ animationDuration: '1s' }}>
                    <h5 className="mb-3" style={{ color: '#2E8B57' }}>Categories</h5>
                    <ul className="list-group">
                        {categories.map(category => (
                            <li 
                                key={category} 
                                className={`list-group-item ${selectedCategory === category ? 'active' : ''}`} 
                                onClick={() => handleCategoryChange(category)}
                                style={{ cursor: 'pointer', backgroundColor: selectedCategory === category ? '#cce5cc' : '#fff', color: '#2E8B57' }}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Nội dung sản phẩm */}
                <div className="col-md-9">
                    <div className="row">
                        {currentTools.map(tool => (
                            <div key={tool.ID} className="col-lg-4 col-md-6 mb-4">
                                <div className="card shadow-sm border-light rounded animate__animated animate__fadeIn" style={{ transition: 'transform 0.2s' }}>
                                    <img 
                                        src={tool.imgUrl} 
                                        alt={tool.name} 
                                        className="card-img-top" 
                                        style={{ 
                                            height: '200px', // Kích thước hình ảnh nhỏ hơn
                                            width: '100%', 
                                            objectFit: 'cover', 
                                            borderTopLeftRadius: '.25rem', 
                                            borderTopRightRadius: '.25rem' 
                                        }} 
                                    />
                                    <div className="card-body d-flex flex-column" style={{ backgroundColor: '#f8f9fa' }}>
                                        <h5 className="card-title text-primary">{tool.name}</h5>
                                        <p className="card-text text-muted">{tool.category}</p>
                                        <p className="card-text">
                                            <span className="badge bg-success">{tool.rating} ⭐</span>
                                        </p>
                                        <a href="#" className="btn btn-success mt-auto">View Details</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav>
                        <ul className="pagination justify-content-center">
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default ProductSuggestion;
