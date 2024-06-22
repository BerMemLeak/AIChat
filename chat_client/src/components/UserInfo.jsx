// src/UserInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('http://localhost:8000/api/user/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });
            setUser(response.data);
        };
        fetchUser();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Info</h2>
            <p>Username: {user.username}</p>
        </div>
    );
};

export default UserInfo;
