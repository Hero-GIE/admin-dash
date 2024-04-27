import React, { useState, useEffect } from 'react';
import './datatable.scss'
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, deleteDoc, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { userColumns } from '../../datatablesource';
import ConfirmationDialog from '../confirmationDialog/confirmDialog';
import UserProfileDialog from '../userProfileDialog/userProfileDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Datatable = () => {
    const [data, setData] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userProfileOpen, setUserProfileOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'users'), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
        }, (error) => {
            console.log(error);
        });
        return () => {
            unsub();
        };
    }, []);

    const handleDelete = (id) => {
        setDeleteItemId(id);
        setConfirmOpen(true);

    };

    const handleView = async (id) => {
        try {
            setSelectedUserId(id);
            const user = data.find((user) => user.id === id);
            // Fetch the user data including the img URL
            const userDocRef = doc(db, 'users', id);
            const userDocSnap = await getDoc(userDocRef); // Ensure getDoc function is imported
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                // Update selectedUser with the fetched data
                setSelectedUser({ ...user, ...userData });
                setUserProfileOpen(true);
            } else {
                console.log('Document does not exist');
            }
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    const onConfirmDelete = async () => {
        try {
            await deleteDoc(doc(db, 'users', deleteItemId));
            setData(data.filter((item) => item.id !== deleteItemId));
            setConfirmOpen(false);
            setSnackbarOpen(true)
        } catch (err) {
            console.log(err);
        }
    };

    const onCloseConfirmation = () => {
        setConfirmOpen(false);
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: 5 }}
                        onClick={() => handleView(params.row.id)}
                    >
                        <VisibilityIcon />
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="datatable">
            <div className="datatableTitle">Users</div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            <ConfirmationDialog
                open={confirmOpen}
                onClose={onCloseConfirmation}
                onConfirm={onConfirmDelete}
            />
            <UserProfileDialog // Render the user profile dialog
                open={userProfileOpen}
                onClose={() => setUserProfileOpen(false)}
                user={selectedUser}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Adjust anchorOrigin prop
            >
                <MuiAlert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: '100%', backgroundColor: 'black',color:'white' }}
                >
                    Data deleted successfully!
                </MuiAlert>
            </Snackbar>

        </div>
    );
};

export default Datatable;
