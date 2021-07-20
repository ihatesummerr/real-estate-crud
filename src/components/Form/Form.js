import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEstate } from '../../actions/estate';

import {
    TextField,
    Button,
    Select,
    MenuItem,
    makeStyles,
    Typography,
    Paper,
} from '@material-ui/core';
import { updateEstate } from '../../actions/estate';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    buttonSubmit: {
        marginBottom: 10,
        marginTop: 10,
    },
}));

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const estate = useSelector((state) =>
        currentId ? state.estate.data.find((e) => e._id === currentId) : null
    );
    const [estateData, setEstateData] = useState({
        title: '',
        description: '',
        price: 0,
        type: 'commercial',
    });

    useEffect(() => {
        if (estate) setEstateData(estate);
    }, [estate]);

    const handleClick = (event) => {
        event.preventDefault();

        if (currentId) {
            dispatch(updateEstate(currentId, estateData));
        } else {
            dispatch(createEstate(estateData));
        }

        clear();
    };

    const clear = () => {
        setEstateData({
            title: '',
            description: '',
            price: 0,
            type: 'commercial',
        });
        setCurrentId(null);
    };

    const handleInput = (event) => {
        setEstateData({
            ...estateData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Paper className={classes.paper} elevation={6}>
            <form
                noValidate
                autoComplete='off'
                className={`${classes.root} ${classes.form}`}
            >
                <Typography variant='h2' align='center'>
                    {currentId ? 'Editing' : 'Creating'}
                </Typography>
                <TextField
                    label='Title'
                    name='title'
                    onChange={handleInput}
                    variant='outlined'
                    value={estateData.title}
                    fullWidth
                />

                <TextField
                    label='Description'
                    name='description'
                    onChange={handleInput}
                    variant='outlined'
                    value={estateData.description}
                    fullWidth
                />

                <TextField
                    label='Price'
                    name='price'
                    onChange={handleInput}
                    variant='outlined'
                    value={estateData.price}
                    fullWidth
                />

                <Select
                    onChange={handleInput}
                    name='type'
                    variant='outlined'
                    value={estateData.type}
                    fullWidth
                >
                    <MenuItem value='commercial'>Commercial</MenuItem>
                    <MenuItem value='living'>Living</MenuItem>
                </Select>

                <Button
                    onClick={handleClick}
                    variant='contained'
                    color='primary'
                    size='large'
                    className={classes.buttonSubmit}
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    onClick={() => clear()}
                    variant='contained'
                    color='secondary'
                    size='large'
                    className={classes.buttonSubmit}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
