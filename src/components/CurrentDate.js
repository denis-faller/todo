import React from 'react';

const CurrentDate = () => {
    var now = new Date();
    return (
        <h4>{now.toString()}</h4>
    );
};

export default CurrentDate;