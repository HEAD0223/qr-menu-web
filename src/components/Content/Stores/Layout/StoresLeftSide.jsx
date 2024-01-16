import {
	Block,
	CloudUpload,
	Delete,
	DeleteOutline,
	DragIndicator,
	Edit,
	MoreVert,
} from '@mui/icons-material';
import {
	Button,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Modal,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
	createStore,
	deleteStore,
	editStore,
	fetchStores,
	updateIndexes,
} from '../../../../redux/slices/stores';
import './StoresLayout.css';

export const StoresLeftSide = ({
	title,
	stores,
	selectedStore,
	setSelectedStore,
	onStoreSelect,
}) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [storeName, setStoreName] = useState('');
	const [storeAddress, setStoreAddress] = useState('');
	const [storePhone, setStorePhone] = useState('');
	const [storeEmail, setStoreEmail] = useState('');
	const [storeImage, setStoreImage] = useState('');

	const [storeObj, setStoreObj] = useState(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const [storeList, setStoreList] = useState([]);

	useEffect(() => {
		if (stores.length > 0) {
			setStoreList([...stores].sort((a, b) => (a.index || 0) - (b.index || 0)));
		}
	}, [stores]);

	// Store Menu
	const handleMenuOpen = (event, store) => {
		setAnchorEl(event.currentTarget);
		setStoreObj(store);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// New Store
	const handleModalOpen = () => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
	};
	const handleSave = async () => {
		const existingIndices = stores.map((store) => store.index);
		const maxIndex = Math.max(...existingIndices, -1);
		const storeIndex = maxIndex + 1;

		const newStore = { storeIndex, storeImage, storeName, storeAddress, storePhone, storeEmail };

		try {
			const storeCreationResponse = await dispatch(createStore(newStore));
			if (storeCreationResponse.payload.error) {
				console.error('Error creating store:', storeCreationResponse.payload.error);
				setIsModalOpen(false);
				toast.error(t('storeCreateError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				setIsModalOpen(false);
				toast.success(t('storeCreateSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchStores());
			}
		} catch (error) {
			console.error('Error dispatching createStore:', error);
			setIsModalOpen(false);
			toast.error(t('storeCreateError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	// Store Menu Edit
	const handleEdit = () => {
		setIsEditOpen(true);
		handleMenuClose();
	};
	const handleEditConfirm = async () => {
		if (storeObj) {
			const updateStore = {
				storeId: storeObj._id,
				storeImage: storeObj.image,
				storeName: storeObj.name,
				storeAddress: storeObj.address,
				storePhone: storeObj.phone,
				storeEmail: storeObj.email,
			};

			try {
				const storeEditResponse = await dispatch(editStore(updateStore));
				if (storeEditResponse.payload.error) {
					console.error('Error editing store:', storeEditResponse.payload.error);
					setIsEditOpen(false);
					setStoreObj(null);
					toast.error(t('storeEditError'), {
						position: 'bottom-right',
						autoClose: 5000,
					});
				} else {
					setIsEditOpen(false);
					setStoreObj(null);
					toast.success(t('storeEditSuccess'), {
						position: 'bottom-right',
						autoClose: 5000,
					});
					dispatch(fetchStores());
				}
			} catch (error) {
				console.error('Error dispatching editStore:', error);
				setIsEditOpen(false);
				setStoreObj(null);
				toast.error(t('storeEditError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			}
		}
	};

	// Store Menu Delete
	const handleDelete = () => {
		setIsDeleteOpen(true);
		handleMenuClose();
	};
	const handleDeleteConfirm = async () => {
		if (storeObj) {
			try {
				const storeDeleteResponse = await dispatch(deleteStore(storeObj._id));
				if (storeDeleteResponse.payload.error) {
					console.error('Error deleting store:', storeDeleteResponse.payload.error);
					setIsDeleteOpen(false);
					setStoreObj(null);
					toast.error(t('storeDeleteError'), {
						position: 'bottom-right',
						autoClose: 5000,
					});
				} else {
					setIsDeleteOpen(false);
					setStoreObj(null);
					toast.success(t('storeDeleteSuccess'), {
						position: 'bottom-right',
						autoClose: 5000,
					});
					dispatch(fetchStores());
					setSelectedStore(null);
				}
			} catch (error) {
				console.error('Error dispatching deleteStore:', error);
				setIsDeleteOpen(false);
				setStoreObj(null);
				toast.error(t('storeDeleteError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			}
		}
	};

	const handleStoreSelect = (store) => {
		onStoreSelect(store);
		setAnchorEl(null);
	};

	// Upload Image
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const base64Image = reader.result;
				const img = new Image();
				img.src = base64Image;
				img.onload = () => {
					setStoreImage(base64Image);
				};
			};
			reader.readAsDataURL(file);
		}
	};
	const handleStoreImageClear = () => {
		setStoreImage('');
	};

	const handleOnDragEnd = async (result) => {
		if (!result.destination) {
			return;
		}

		const newStores = [...storeList];
		const [movedStore] = newStores.splice(result.source.index, 1);
		newStores.splice(result.destination.index, 0, movedStore);

		setStoreList(newStores);

		try {
			const storesToUpdate = newStores.map((store, index) => ({
				storeId: store._id,
				index: index,
			}));
			const indexesUpdateResponse = await dispatch(updateIndexes({ stores: storesToUpdate }));

			if (indexesUpdateResponse.payload.error) {
				console.error('Error updating indexes:', indexesUpdateResponse.payload.error);
				setIsModalOpen(false);
				toast.error(t('indexesUpdateError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				setIsModalOpen(false);
				toast.success(t('indexesUpdateSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchStores());
			}
		} catch (error) {
			console.error('Error dispatching updateIndexes:', error);
			setIsModalOpen(false);
			toast.error(t('indexesUpdateError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	return (
		<div className="leftSide">
			<div className="leftSide-title">
				<Typography variant="h5" gutterBottom>
					{title}
				</Typography>
				<Button variant="contained" color="primary" onClick={handleModalOpen}>
					{t('new')}
				</Button>
			</div>
			<Divider className="leftSide-divider" />
			{stores.length > 0 ? (
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="stores">
						{(provided) => (
							<List {...provided.droppableProps} ref={provided.innerRef}>
								{storeList.map((store, index) => (
									<Draggable key={store._id} draggableId={store._id} index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<ListItem
													className={`leftSide-item ${
														selectedStore && selectedStore._id === store._id
															? 'selected'
															: ''
													}`}>
													<DragIndicator />
													<ListItemText
														style={{ cursor: 'pointer', marginLeft: 4 }}
														primary={store.name}
														onClick={() => handleStoreSelect(store)}
													/>
													<Button
														onClick={(event) => handleMenuOpen(event, store)}
														className="store-options-button"
														disableRipple>
														<MoreVert />
													</Button>
													<Menu
														anchorEl={anchorEl}
														open={Boolean(anchorEl)}
														onClose={handleMenuClose}>
														<MenuItem onClick={handleEdit}>
															<Edit />
															{t('edit')}
														</MenuItem>
														<MenuItem onClick={handleDelete} style={{ color: 'red' }}>
															<Delete />
															{t('delete')}
														</MenuItem>
													</Menu>
												</ListItem>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</List>
						)}
					</Droppable>
				</DragDropContext>
			) : (
				<div className="empty-list">
					<Block fontSize="large" color="disabled" />
					<Typography variant="body1" align="center">
						{t('storeEmpty')}
					</Typography>
				</div>
			)}

			{/* Add New Store Modal */}
			<Modal open={isModalOpen} onClose={handleModalClose}>
				<div className="modal-container">
					<Typography variant="h6" marginBottom={'20px'} gutterBottom>
						{t('addStoreTitle')}
					</Typography>
					{storeImage && (
						<div className="uploaded-image">
							<img src={storeImage} alt="Uploaded Logo" />
						</div>
					)}
					<div className="uploaded-buttons-store">
						<input
							accept="image/*"
							style={{ display: 'none' }}
							id="upload-file-button"
							type="file"
							onChange={handleFileUpload}
						/>
						<label htmlFor="upload-file-button">
							<Button
								variant="outlined"
								color="primary"
								component="span"
								startIcon={<CloudUpload />}>
								{t('uploadFile')}
							</Button>
						</label>
						{storeImage && (
							<IconButton color="error" onClick={handleStoreImageClear}>
								<DeleteOutline />
							</IconButton>
						)}
					</div>
					<TextField
						label={t('storeName')}
						variant="outlined"
						fullWidth
						value={storeName}
						onChange={(e) => setStoreName(e.target.value)}
					/>
					<TextField
						label={t('storeAddress')}
						variant="outlined"
						fullWidth
						value={storeAddress}
						onChange={(e) => setStoreAddress(e.target.value)}
					/>
					<TextField
						label={t('storePhone')}
						variant="outlined"
						fullWidth
						value={storePhone}
						onChange={(e) => setStorePhone(e.target.value)}
					/>
					<TextField
						label={t('storeEmail')}
						variant="outlined"
						fullWidth
						value={storeEmail}
						onChange={(e) => setStoreEmail(e.target.value)}
					/>
					<Button variant="contained" color="primary" onClick={handleSave}>
						{t('save')}
					</Button>
				</div>
			</Modal>

			{/* Edit Store Modal */}
			<Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
				<div className="modal-container">
					<Typography variant="h6" gutterBottom>
						{t('editStoreTitle')}
					</Typography>
					{storeObj && (
						<div className="uploaded-image">
							<img src={storeObj ? storeObj.image : ''} alt="Uploaded" />
						</div>
					)}
					<div className="uploaded-buttons-store">
						<input
							accept="image/*"
							style={{ display: 'none' }}
							id="upload-file-button"
							type="file"
							onChange={(e) =>
								setStoreObj({
									...storeObj,
									image: e.target.value,
								})
							}
						/>
						<label htmlFor="upload-file-button">
							<Button
								variant="outlined"
								color="primary"
								component="span"
								startIcon={<CloudUpload />}>
								{t('uploadFile')}
							</Button>
						</label>
						{storeObj && (
							<IconButton color="error" onClick={handleStoreImageClear}>
								<DeleteOutline />
							</IconButton>
						)}
					</div>
					<TextField
						label={t('storeName')}
						variant="outlined"
						fullWidth
						value={storeObj ? storeObj.name : ''}
						onChange={(e) =>
							setStoreObj({
								...storeObj,
								name: e.target.value,
							})
						}
					/>
					<TextField
						label={t('storeAddress')}
						variant="outlined"
						fullWidth
						value={storeObj ? storeObj.address : ''}
						onChange={(e) =>
							setStoreObj({
								...storeObj,
								address: e.target.value,
							})
						}
					/>
					<TextField
						label={t('storePhone')}
						variant="outlined"
						fullWidth
						value={storeObj ? storeObj.phone : ''}
						onChange={(e) =>
							setStoreObj({
								...storeObj,
								phone: e.target.value,
							})
						}
					/>
					<TextField
						label={t('storeEmail')}
						variant="outlined"
						fullWidth
						value={storeObj ? storeObj.email : ''}
						onChange={(e) =>
							setStoreObj({
								...storeObj,
								email: e.target.value,
							})
						}
					/>
					<div className="edit-buttons">
						<Button
							variant="contained"
							color="secondary"
							onClick={() => setIsEditOpen(false)}>
							{t('cancel')}
						</Button>
						<Button variant="contained" color="primary" onClick={handleEditConfirm}>
							{t('update')}
						</Button>
					</div>
				</div>
			</Modal>

			{/* Delete Store Modal */}
			<Modal open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
				<div className="modal-container">
					<Typography variant="h6" gutterBottom>
						{t('deleteStoreTitle')}
					</Typography>
					{storeObj && (
						<Typography variant="body1" gutterBottom>
							{t('deleteStoreMsg')} "{storeObj.name}"?
						</Typography>
					)}
					<div className="delete-buttons">
						<Button
							variant="contained"
							color="secondary"
							onClick={() => setIsDeleteOpen(false)}>
							{t('cancel')}
						</Button>
						<Button variant="contained" color="primary" onClick={handleDeleteConfirm}>
							{t('delete')}
						</Button>
					</div>
				</div>
			</Modal>
			<ToastContainer position="bottom-right" autoClose={5000} />
		</div>
	);
};
