import React from 'react';

import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
} from '@material-ui/core';

import { useDispatch } from 'react-redux';

import { Delete, Edit } from '@material-ui/icons';
import { deleteEstate } from '../../actions/estate';

const EstateList = ({ estates, setCurrentId }) => {
    const dispatch = useDispatch();

    const handleEditClick = (e, id) => {
        e.preventDefault();
        setCurrentId(id);
    };

    const handleDeleteClick = (e, id) => {
        e.preventDefault();
        dispatch(deleteEstate(id));
    };

    return (
        <TableContainer component={Paper} elevation={6} size='small'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align='right'>Description</TableCell>
                        <TableCell align='right'>Price</TableCell>
                        <TableCell align='right'>Type</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {estates?.length
                        ? estates.map((estate) => (
                              <TableRow key={estate._id}>
                                  <TableCell component='th' scope='row'>
                                      {estate.title}
                                  </TableCell>
                                  <TableCell align='right'>
                                      {estate.description}
                                  </TableCell>
                                  <TableCell align='right'>
                                      {estate.price}
                                  </TableCell>
                                  <TableCell align='right'>
                                      {estate.type}
                                  </TableCell>
                                  <TableCell align='right'>
                                      <IconButton
                                          color='primary'
                                          onClick={(e) =>
                                              handleEditClick(e, estate._id)
                                          }
                                      >
                                          <Edit />
                                      </IconButton>
                                      <IconButton
                                          color='secondary'
                                          onClick={(e) =>
                                              handleDeleteClick(e, estate._id)
                                          }
                                      >
                                          <Delete />
                                      </IconButton>
                                  </TableCell>
                              </TableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EstateList;
