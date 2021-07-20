import React, { useState } from 'react';
import {
    Grid,
    Typography,
    makeStyles,
    Container,
    Grow,
    AppBar,
    Select,
    MenuItem,
    Button,
    Paper,
} from '@material-ui/core';

import Form from '../Form/Form';
import EstateList from '../EstateList/EstateList';

import { useDispatch, useSelector } from 'react-redux';
import { getEstateBySearch } from '../../actions/estate';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';

const useStyles = makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
    },
    searchButton: {
        marginTop: theme.spacing(3),
    },
    pagination: {
        marginTop: theme.spacing(3),
    },
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Main = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const [search, setSearch] = useState('commercial');

    const page = query.get('page') || 1;

    const estates = useSelector((state) => state.estate.data);

    const [currentId, setCurrentId] = useState(null);

    const handleSearch = () => {
        if (search) {
            dispatch(getEstateBySearch(search));
            history.push(`/estate?search=${search || 'none'}`);
        } else {
            history.push('/');
        }
    };

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid
                    container
                    justifyContent='space-between'
                    alignItems='stretch'
                    spacing={3}
                >
                    <Grid item xs={12} sm={6} md={3}>
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={9}>
                        <Typography variant='h1'>Real Estate</Typography>

                        <AppBar
                            position='static'
                            color='inherit'
                            className={classes.appBarSearch}
                        >
                            <Select
                                name='type'
                                variant='outlined'
                                fullWidth
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            >
                                <MenuItem value='commercial'>
                                    Commercial
                                </MenuItem>
                                <MenuItem value='living'>Living</MenuItem>
                            </Select>
                            <Button
                                color='primary'
                                variant='contained'
                                className={classes.searchButton}
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        </AppBar>
                        <EstateList
                            estates={estates}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Main;
