import React from 'react';

import Card from '../../shared/UIElement/Card';
import UserItem from './UserItem';
import './UserList.css';

const UserList = (props) => {
    if (props.items.length === 0) {
        return (
            <Card className="centered">
                <h2>No Users Found</h2>
            </Card>
        );
    }

    return (
        <ul className="users-list">
            {props.items.map((user) => (
                <UserItem key={user.id} {...user} />
            ))}
        </ul>
    );
};

export default UserList;
