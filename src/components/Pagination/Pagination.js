import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEstate } from '../../actions/estate';
import { useHistory } from 'react-router-dom';

const createArray = (length) => {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(i);
    }
    return array;
};

const Pagination = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.estate);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (page) dispatch(getEstate(page));
    }, [page]);

    const handleClick = (e, page) => {
        e.preventDefault();
        history.push(`/estate?page=${page}`);
    };

    return (
        <div>
            {createArray(numberOfPages).map((_, i) => (
                <Button onClick={(e) => handleClick(e, i + 1)} key={i}>
                    {i + 1}
                </Button>
            ))}
        </div>
    );
};

export default Pagination;
