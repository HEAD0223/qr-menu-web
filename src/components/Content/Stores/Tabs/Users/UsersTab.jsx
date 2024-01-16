import { AddCircleOutline, Block, Delete, Edit } from '@mui/icons-material';
import {
	Button,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Users.css';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteUser, editUser, fetchUsers } from '../../../../../redux/slices/auth';
import { AddUserModal } from './AddUserModal';
import { DeleteUserModal } from './DeleteUserModal';
import { EditUserModal } from './EditUserModal';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}
function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export const UsersTab = ({ selectedStore, users }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const totalUsers = users.user.length || 0;
	const [selectedUser, setSelectedUser] = useState(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('firstName');

	const headCells = [
		{
			id: 'firstName',
			label: t('firstName'),
		},
		{
			id: 'lastName',
			label: t('lastName'),
		},
		{
			id: 'email',
			label: t('email'),
		},
		{
			id: 'accessLevel',
			label: t('accessLevel'),
		},
		{
			id: 'actions',
			label: t('actions'),
		},
	];

	// Table Sort
	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	// Add User
	const handleAddModalOpen = () => {
		setIsAddModalOpen(true);
	};
	const handleAddModalClose = () => {
		setIsAddModalOpen(false);
	};

	// Edit User
	const handleEdit = (user) => {
		setSelectedUser(user);
		setIsEditOpen(true);
	};
	const handleEditConfirm = async (user) => {
		try {
			const userEditResponse = await dispatch(editUser(user));
			if (userEditResponse.payload.error) {
				console.error('Error editing user:', userEditResponse.payload.error);
				setIsEditOpen(false);
				toast.error(t('userEditError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				setIsEditOpen(false);
				toast.success(t('userEditSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchUsers(selectedStore._id));
			}
		} catch (error) {
			console.error('Error dispatching editUser:', error);
			setIsEditOpen(false);
			toast.error(t('userEditError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	// Delete User
	const handleDelete = (user) => {
		setSelectedUser(user);
		setIsDeleteOpen(true);
	};
	const handleDeleteConfirm = async (userId) => {
		try {
			const userDeleteResponse = await dispatch(deleteUser(userId));
			if (userDeleteResponse.payload.error) {
				console.error('Error deleting user:', userDeleteResponse.payload.error);
				setIsDeleteOpen(false);
				toast.error(t('userDeletedError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				setIsDeleteOpen(false);
				toast.success(t('userDeletedSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchUsers(selectedStore._id));
			}
		} catch (error) {
			console.error('Error dispatching deleteUser:', error);
			setIsDeleteOpen(false);
			toast.error(t('userDeletedError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					margin: '25px 0',
				}}>
				<Typography variant="h5">{t('users')}</Typography>
				<div>
					<Button
						startIcon={<AddCircleOutline />}
						variant="contained"
						color="primary"
						size="small"
						onClick={handleAddModalOpen}>
						{t('add')}
					</Button>
				</div>
			</div>
			{totalUsers === 0 ? (
				<div className="empty-list">
					<Block fontSize="large" color="disabled" />
					<Typography variant="body1" align="center">
						{t('usersEmpty')}
					</Typography>
				</div>
			) : (
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								{headCells.map((headCell) => (
									<TableCell key={headCell.id} align="left">
										<TableSortLabel
											active={orderBy === headCell.id}
											direction={orderBy === headCell.id ? order : 'asc'}
											onClick={() => handleRequestSort(headCell.id)}>
											{headCell.label}
										</TableSortLabel>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{stableSort(users.user, getComparator(order, orderBy)).map((user) => (
								<TableRow key={user._id} hover tabIndex={-1}>
									<TableCell>{user.firstName}</TableCell>
									<TableCell>{user.lastName}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.accessLevel}</TableCell>
									<TableCell>
										<div style={{ display: 'flex' }}>
											<IconButton onClick={() => handleEdit(user)}>
												<Edit />
											</IconButton>
											<IconButton onClick={() => handleDelete(user)}>
												<Delete />
											</IconButton>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			{/* Add User Modal */}
			<AddUserModal
				selectedStore={selectedStore}
				isAddModalOpen={isAddModalOpen}
				setIsAddModalOpen={setIsAddModalOpen}
				handleAddModalClose={handleAddModalClose}
			/>

			{/* Edit User Modal */}
			<EditUserModal
				isEditOpen={isEditOpen}
				setIsEditOpen={setIsEditOpen}
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
				handleEditConfirm={handleEditConfirm}
			/>

			{/* Delete User Modal */}
			<DeleteUserModal
				isDeleteOpen={isDeleteOpen}
				setIsDeleteOpen={setIsDeleteOpen}
				selectedUser={selectedUser}
				handleDeleteConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};

UsersTab.propTypes = {
	selectedStore: PropTypes.object,
	users: PropTypes.object.isRequired,
};
