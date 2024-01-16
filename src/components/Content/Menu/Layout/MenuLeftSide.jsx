import {
	Block,
	Delete,
	DragIndicator,
	Edit,
	MoreVert,
	Visibility,
	VisibilityOff,
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
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import './MenuLayout.css';

export const MenuLeftSide = ({ title, categories, setSelectedCategory, onCategorySelect }) => {
	const { t } = useTranslation();
	// const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [categoryStores, setCategoryStores] = useState([]);
	const [categoryName, setCategoryName] = useState('');
	const [categoryDescription, setCategoryDescription] = useState('');
	const [categoryModifiers, setCategoryModifiers] = useState([]);
	const [categoryVisibility, setCategoryVisibility] = useState(true);

	// const [categoriesObj, setCategoriesObj] = useState(null);
	// const [isEditOpen, setIsEditOpen] = useState(false);
	// const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const [categoriesList, setCategoriesList] = useState(categories);

	useEffect(() => {
		if (categories.length > 0) {
			setCategoriesList([...categories].sort((a, b) => (a.index || 0) - (b.index || 0)));
		}
	}, [categories]);

	// Store Menu
	const handleMenuOpen = (event, categories) => {
		setAnchorEl(event.currentTarget);
		// setCategoriesObj(categories);
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
		const existingIndices = categories.map((category) => category.index);
		const maxIndex = Math.max(...existingIndices, -1);
		const categoryIndex = maxIndex + 1;

		const newCategory = {
			categoryIndex,
			categoryName,
			categoryDescription,
			categoryVisibility,
			categoryStores,
			categoryModifiers,
		};

		// try {
		// 	const categoryCreationResponse = await dispatch(createCategory(newCategory));
		// 	if (categoryCreationResponse.payload.error) {
		// 		console.error('Error creating category:', categoryCreationResponse.payload.error);
		// 		setIsModalOpen(false);
		// 		toast.error(t('categoryCreateError'), {
		// 			position: 'bottom-right',
		// 			autoClose: 5000,
		// 		});
		// 	} else {
		// 		setIsModalOpen(false);
		// 		toast.success(t('categoryCreateSuccess'), {
		// 			position: 'bottom-right',
		// 			autoClose: 5000,
		// 		});
		// 		dispatch(fetchCategories());
		// 	}
		// } catch (error) {
		// 	console.error('Error dispatching createCategory:', error);
		// 	setIsModalOpen(false);
		// 	toast.error(t('categoryCreateError'), {
		// 		position: 'bottom-right',
		// 		autoClose: 5000,
		// 	});
		// }
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;

		const items = Array.from(categoriesList);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setCategoriesList(items);
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
			{categories.length > 0 ? (
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="categories">
						{(provided) => (
							<List ref={provided.innerRef} {...provided.droppableProps}>
								{categoriesList.map((category, index) => (
									<Draggable key={category._id} draggableId={category._id} index={index}>
										{(provided) => (
											<ListItem
												className="leftSide-item"
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<DragIndicator />
												<ListItemText
													style={{ cursor: 'pointer', marginLeft: 4 }}
													primary={category.name}
												/>
												<IconButton color="primary">
													<Visibility />
												</IconButton>
												<IconButton color="primary">
													<VisibilityOff />
												</IconButton>
												<Button
													onClick={(event) => handleMenuOpen(event, category)}
													className="category-options-button"
													disableRipple>
													<MoreVert />
												</Button>
												<Menu
													anchorEl={anchorEl}
													open={Boolean(anchorEl)}
													onClose={handleMenuClose}>
													<MenuItem>
														<Edit />
														{t('edit')}
													</MenuItem>
													<MenuItem style={{ color: 'red' }}>
														<Delete />
														{t('delete')}
													</MenuItem>
												</Menu>
											</ListItem>
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

			{/* Add New Category Modal */}
			<Modal open={isModalOpen} onClose={handleModalClose}>
				<div className="modal-container">
					<Typography variant="h6" marginBottom={'20px'} gutterBottom>
						{t('addStoreTitle')}
					</Typography>
					{/* {storeImage && (
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
								startIcon={<CloudUploadIcon />}>
								{t('uploadFile')}
							</Button>
						</label>
						{storeImage && (
							<IconButton color="error" onClick={handleStoreImageClear}>
								<DeleteOutlineIcon />
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
					/> */}
					<Button variant="contained" color="primary" onClick={handleSave}>
						{t('save')}
					</Button>
				</div>
			</Modal>
			<ToastContainer position="bottom-right" autoClose={5000} />
		</div>
	);
};
