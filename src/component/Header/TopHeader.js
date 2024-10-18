import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserData from '../../json/Account/User.json'; // Đường dẫn đến file JSON

function TopHeader() {
    const his = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [userName, setUserName] = useState('');
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        // Lấy giá trị visitor count từ localStorage
        const storedCount = localStorage.getItem('visitorCount');
        const newCount = storedCount ? parseInt(storedCount) + 1 : 1;

        // Cập nhật visitor count trong state
        setVisitorCount(newCount);
        
        // Lưu lại visitor count vào localStorage
        localStorage.setItem('visitorCount', newCount);

        // Kiểm tra token và avatar
        const token = localStorage.getItem('token');
        const avatar = localStorage.getItem('avatar');

        if (token) {
            setIsLoggedIn(true);
            setAvatarUrl(avatar || 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png');

            try {
                const userId = JSON.parse(atob(token.split('.')[1])).id; // Lấy ID từ token

                const user = UserData.find(user => user.id === userId);
                if (user) {
                    setUserName(user.name);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []); // Chỉ chạy khi component mount

    const fnRemove = () => {
        localStorage.clear();
        his('/');
        window.history.go(0); // Refresh the page after logging out
    };

    return (
        <header className="py-2" style={{ backgroundColor: "#e8f5e9" }}>
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    
                    {/* Visitor Count */}
                    <div className="col-md-5 d-none d-md-block">
                        <div className="d-flex justify-content-start">
                            <div className="me-4">
                                <strong>Visitor Count: {visitorCount}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info (Visible only on larger screens) */}
                    <div className="col-md-5 d-none d-md-block">
                        <div className="d-flex justify-content-start">
                            <div className="me-4 d-flex align-items-center">
                                <i className="bi bi-telephone-fill me-1" style={{ color: "#388e3c", fontSize: "1rem" }}></i>
                                <span style={{ color: "#388e3c", fontWeight: "bold" }}>0365153119</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className="bi bi-envelope-fill me-1" style={{ color: "#388e3c", fontSize: "1rem" }}></i>
                                <span style={{ color: "#388e3c", fontWeight: "bold" }}>greengroves123@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Greeting Message */}
                    <div className="col-md-4 text-center">
                        {isLoggedIn && userName && <h5 style={{ color: "#4caf50" }}>Hello, {userName}</h5>}
                    </div>

                    {/* Login/Register and Avatar with Dropdown for Logged-in Users */}
                    <div className="col-md-3 col-6 text-end">
                        {isLoggedIn ? (
                            <div className="dropdown d-flex align-items-center">
                                <img
                                    src={avatarUrl}
                                    alt="User Avatar"
                                    className="rounded-circle me-2"
                                    style={{ width: "35px", height: "35px", objectFit: "cover", cursor: "pointer" }}
                                    data-bs-toggle="dropdown"
                                />
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={fnRemove}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-end">
                                <Link
                                    to="/Login"
                                    className="btn btn-outline-success btn-sm me-2"
                                    style={{
                                        borderColor: "#388e3c",
                                        color: "#388e3c",
                                        backgroundColor: "#f1f8e9",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/Register"
                                    className="btn btn-success btn-sm"
                                    style={{
                                        backgroundColor: "#388e3c",
                                        color: "#fff",
                                        fontSize: "0.85rem"
                                    }}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default TopHeader;
