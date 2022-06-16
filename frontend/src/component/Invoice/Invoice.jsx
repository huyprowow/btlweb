import { Alert, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slide, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import httpBase from '../../utils/http-base';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const Invoice = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [invoice, setInvoice] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const getAllInvoice = async () => {
        setLoading(true);
        httpBase.get('/invoice').then(res => {
            setError(null);
            setInvoice(res.data);

        }).catch(err => {
            setError(err);
        });
        setLoading(false);
    }
    useEffect(() => {
        getAllInvoice();

    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleClick = (e) => {
        console.log(e.target.parentNode.id);
        httpBase.delete('/invoice/delete/' + e.target.parentNode.id).then(res => {
            setError(null);
            getAllInvoice();
        }).catch(err => {
            setError(err);
        });
    }

    const columns = [
        { id: 'id', label: 'ID', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'address', label: 'Address', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'price', label: 'Price', minWidth: 50 },
        { id: 'number', label: 'Number', minWidth: 50 },
        { id: 'total', label: 'Total', minWidth: 50 },
        { id: "delete", label: 'Delete', minWidth: 20 }
    ];
    const rows = invoice.map(item => {
        return {
            id: item._id,
            email: item.email,
            address: item.address,
            name: item.name,
            price: item.price,
            number: item.number,
            total: item.price * item.number,
            delete: <ClearRoundedIcon sx={{
                "&:hover": {
                    cursor: "pointer"
                }
            }} onClick={handleClick} />
        }
    }
    );

    return (<>{
        error &&
        <Snackbar open={true} >
            <Alert severity="error" sx={{ width: '100%' }}>
                {error.message}
            </Alert>
        </Snackbar>
    }
        {/* {loading && <div>Loading...</div>} */}
        {/* <Slide direction="up" in={} mountOnEnter unmountOnExit> */}
        <Typography variant="h4" component="span" id="title" gutterBottom sx={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Quicksand',
        }}>
            All Invoice
        </Typography>
        <Paper sx={{ width: '98%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} id={row.id}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell >
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        {/* </Slide> */}
    </>
    )
}

export default Invoice