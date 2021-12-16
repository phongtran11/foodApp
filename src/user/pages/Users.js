import React from 'react';

import UserList from '../components/UserList';

const Users = (props) => {
    const USERS = [
        {
            id: 1,
            name: 'p',
            image: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
            places: 3,
        },
        {
            id: 2,
            name: 'p',
            image: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
            places: 3,
        },
    ];

    return <UserList items={USERS} />;
};

export default Users;
