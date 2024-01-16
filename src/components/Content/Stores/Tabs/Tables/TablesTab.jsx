import {
	AddCircleOutline,
	Block,
	Delete,
	MoreVert,
	QrCode,
	QrCode2,
	SaveAlt,
} from '@mui/icons-material';
import { Button, Checkbox, IconButton, Menu, MenuItem, Popover, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchQR } from '../../../../../redux/slices/qr';
import {
	addTables,
	deleteTables,
	editTables,
	fetchTables,
} from '../../../../../redux/slices/tables';
import { AddModal } from './AddModal';
import { CustomizeQRModal } from './CustomizeQRModal';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';
import './Tables.css';

export const CLIENT_URL = 'http://localhost:3000';

export const TablesTab = ({ selectedStore, tables }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const qr_custom = useSelector((state) => state.qr_custom.qr_custom);
	const totalTables = tables.tables.length || 0;
	const [anchorEl, setAnchorEl] = useState(null);
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const [selectedTableIndex, setSelectedTableIndex] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tableInputs, setTableInputs] = useState([]);

	const [tableObj, setTableObj] = useState(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

	const [selectedTables, setSelectedTables] = useState([]);
	const [showDownloadButton, setShowDownloadButton] = useState(false);
	const [showDeleteButton, setShowDeleteButton] = useState(false);

	useEffect(() => {
		if (selectedStore) {
			dispatch(fetchQR(selectedStore._id));
		}
	}, [dispatch, selectedStore]);

	// Select Tables
	const handleSelectAll = () => {
		setSelectedTables((prevSelected) => {
			if (prevSelected.length === totalTables) {
				setShowDownloadButton(false);
				setShowDeleteButton(false);
				return [];
			} else {
				setShowDownloadButton(true);
				setShowDeleteButton(true);
				return tables.tables;
			}
		});
	};
	const handleTableSelect = (table) => {
		setSelectedTables((prevSelected) => {
			if (prevSelected.some((selectedTable) => selectedTable._id === table._id)) {
				const updatedSelected = prevSelected.filter(
					(selectedTable) => selectedTable._id !== table._id,
				);
				setShowDownloadButton(updatedSelected.length >= 1);
				setShowDeleteButton(updatedSelected.length >= 1);
				return updatedSelected;
			} else {
				const updatedSelected = [...prevSelected, table];
				setShowDownloadButton(updatedSelected.length >= 1);
				setShowDeleteButton(updatedSelected.length >= 1);
				return updatedSelected;
			}
		});
	};

	// Table Menu
	const handleMenuOpen = (event, table) => {
		setAnchorEl(event.currentTarget);
		setTableObj(table);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// Add New Tables
	const handleModalOpen = () => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
		setTableInputs([]);
	};
	const handleAddTableInput = () => {
		setTableInputs([...tableInputs, { name: '' }]);
	};
	const handleDeleteTableInput = (index) => {
		const updatedInputs = tableInputs.filter((_, i) => i !== index);
		setTableInputs(updatedInputs);
	};
	const handleAddTable = async () => {
		const newTableInputs = tableInputs.filter((input) => input.name.trim() !== '');
		const storeId = selectedStore._id;
		const tables = newTableInputs.map((input) => {
			return {
				name: input.name,
			};
		});

		try {
			const tableCreationResponse = await dispatch(addTables({ storeId, tables }));
			if (tableCreationResponse.payload.error) {
				console.error('Error adding tables:', tableCreationResponse.payload.error);
				handleModalClose();
				toast.error(t('tablesAddedError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				handleModalClose();
				toast.success(t('tablesAddedSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchTables(storeId));
			}
		} catch (error) {
			console.error('Error dispatching addTables:', error);
			handleModalClose();
			toast.error(t('tablesAddedError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	// Edit Tables
	const handleEdit = () => {
		setIsEditOpen(true);
		handleMenuClose();
	};
	const handleEditConfirm = async () => {
		if (tableObj) {
			const storeId = selectedStore._id;
			const table = tableObj;

			try {
				const tableEditResponse = await dispatch(editTables({ storeId, table }));
				if (tableEditResponse.payload.error) {
					console.error('Error editing tables:', tableEditResponse.payload.error);
					setIsEditOpen(false);
					setTableObj(null);
					toast.error(t('tableEditError'), {
						position: 'bottom-right',
						autoClose: 5000,
					});
				} else {
					setIsEditOpen(false);
					setTableObj(null);
					toast.success(t('tableEditSuccess'), {
						position: 'bottom-right',
						autoClose: 5000,
					});
					dispatch(fetchTables(storeId));
				}
			} catch (error) {
				console.error('Error dispatching editTables:', error);
				setIsEditOpen(false);
				setTableObj(null);
				toast.error(t('tableEditError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			}
		}
	};

	// Delete Tables
	const handleDelete = () => {
		setIsDeleteOpen(true);
		handleMenuClose();
	};
	const handleDeleteConfirm = async () => {
		const storeId = selectedStore._id;
		const tables = selectedTables;

		try {
			const tableDeleteResponse = await dispatch(deleteTables({ storeId, tables }));
			if (tableDeleteResponse.payload.error) {
				console.error('Error deleting tables:', tableDeleteResponse.payload.error);
				setIsDeleteOpen(false);
				toast.error(t('tablesDeletedError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				setIsDeleteOpen(false);
				setSelectedTables([]);
				setShowDownloadButton(false);
				setShowDeleteButton(false);
				toast.success(t('tablesDeletedSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchTables(storeId));
			}
		} catch (error) {
			console.error('Error dispatching deleteTables:', error);
			setIsDeleteOpen(false);
			toast.error(t('tablesDeletedError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	//Customize QR
	const handleCustomizeQR = () => {
		setIsCustomizeOpen(true);
	};
	const handleCloseCustomizeModal = () => {
		setIsCustomizeOpen(false);
	};

	// Show QR
	const openPopover = (event, index) => {
		setPopoverAnchor(event.currentTarget);
		setSelectedTableIndex(index);
	};
	const closePopover = () => {
		setPopoverAnchor(null);
		setSelectedTableIndex(null);
	};
	const generateQRCodeComponent = (tableId, qr_custom) => (
		<QRCode
			id={`react-qrcode-logo-${tableId}`}
			removeQrCodeBehindLogo={false}
			value={`${CLIENT_URL}?tableId=${tableId}`}
			enableCORS={true}
			ecLevel="H"
			size={250}
			quietZone={15}
			bgColor={qr_custom.colorValues[0].selectedBackgroundColor}
			fgColor={qr_custom.colorValues[0].selectedPatternColor}
			logoImage={qr_custom.uploadedImage}
			logoWidth={qr_custom.uploadedImageWidth * 0.125}
			logoHeight={qr_custom.uploadedImageHeight * 0.125}
			logoOpacity={1}
			logoPadding={qr_custom.uploadedImagePadding}
			logoPaddingStyle="square"
			qrStyle={qr_custom.selectedDataPattern}
			eyeRadius={[
				{
					outer: [
						qr_custom.eyeCustomRadius[0].eyeradius_0_outer_0,
						qr_custom.eyeCustomRadius[0].eyeradius_0_outer_1,
						qr_custom.eyeCustomRadius[0].eyeradius_0_outer_2,
						qr_custom.eyeCustomRadius[0].eyeradius_0_outer_3,
					],
					inner: [
						qr_custom.eyeCustomRadius[0].eyeradius_0_inner_0,
						qr_custom.eyeCustomRadius[0].eyeradius_0_inner_1,
						qr_custom.eyeCustomRadius[0].eyeradius_0_inner_2,
						qr_custom.eyeCustomRadius[0].eyeradius_0_inner_3,
					],
				},
				{
					outer: [
						qr_custom.eyeCustomRadius[0].eyeradius_1_outer_0,
						qr_custom.eyeCustomRadius[0].eyeradius_1_outer_1,
						qr_custom.eyeCustomRadius[0].eyeradius_1_outer_2,
						qr_custom.eyeCustomRadius[0].eyeradius_1_outer_3,
					],
					inner: [
						qr_custom.eyeCustomRadius[0].eyeradius_1_inner_0,
						qr_custom.eyeCustomRadius[0].eyeradius_1_inner_1,
						qr_custom.eyeCustomRadius[0].eyeradius_1_inner_2,
						qr_custom.eyeCustomRadius[0].eyeradius_1_inner_3,
					],
				},
				{
					outer: [
						qr_custom.eyeCustomRadius[0].eyeradius_2_outer_0,
						qr_custom.eyeCustomRadius[0].eyeradius_2_outer_1,
						qr_custom.eyeCustomRadius[0].eyeradius_2_outer_2,
						qr_custom.eyeCustomRadius[0].eyeradius_2_outer_3,
					],
					inner: [
						qr_custom.eyeCustomRadius[0].eyeradius_2_inner_0,
						qr_custom.eyeCustomRadius[0].eyeradius_2_inner_1,
						qr_custom.eyeCustomRadius[0].eyeradius_2_inner_2,
						qr_custom.eyeCustomRadius[0].eyeradius_2_inner_3,
					],
				},
			]}
			eyeColor={[
				{
					outer: qr_custom.colorValues[0].eyeHasBlack
						? '#000000'
						: qr_custom.colorValues[0].selectedEyeColor,
					inner: qr_custom.colorValues[0].eyeHasBlack
						? '#000000'
						: qr_custom.colorValues[0].selectedEyeColor2,
				},
				{
					outer: qr_custom.colorValues[0].eyeHasBlack
						? '#000000'
						: qr_custom.colorValues[0].selectedEyeColor,
					inner: qr_custom.colorValues[0].eyeHasBlack
						? '#000000'
						: qr_custom.colorValues[0].selectedEyeColor2,
				},
				{
					outer: qr_custom.colorValues[0].eyeHasBlack
						? '#000000'
						: qr_custom.colorValues[0].selectedEyeColor,
					inner: qr_custom.colorValues[0].eyeHasBlack
						? '#000000'
						: qr_custom.colorValues[0].selectedEyeColor2,
				},
			]}
		/>
	);

	// Download QR
	const handleSaveAllQR = () => {
		selectedTables.forEach((table) => {
			handleDownload(table._id, table.name);
		});
	};
	const handleDownload = (tableId, tableName) => {
		const canvas = document.querySelector(`#react-qrcode-logo-${tableId}`);
		const link = document.createElement('a');
		link.download = `${tableName}_${tableId}.png`;
		canvas.toBlob(function (blob) {
			link.href = URL.createObjectURL(blob);
			link.click();
		});
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
				<div className="tablesTab-count">
					<Checkbox
						color="primary"
						checked={selectedTables.length === totalTables}
						onChange={handleSelectAll}
						disabled={!selectedStore}
					/>
					<div
						style={{
							marginRight: '16px',
							backgroundColor: '#f5f5f5',
							padding: '8px 12px',
							borderRadius: '8px',
							boxShadow: ' inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
						}}>
						<Typography variant="h5">
							{selectedTables.length} / {totalTables}
						</Typography>
					</div>
				</div>
				<div>
					{showDownloadButton && (
						<Button
							startIcon={<SaveAlt />}
							variant="contained"
							size="small"
							onClick={handleSaveAllQR}>
							{t('downloadQR')}
						</Button>
					)}
					{showDeleteButton && (
						<Button
							startIcon={<Delete />}
							variant="outlined"
							size="small"
							color="error"
							onClick={handleDelete}
							style={{ marginLeft: '8px' }}>
							{t('delete')}
						</Button>
					)}
					{!showDownloadButton && !showDeleteButton && (
						<Button
							startIcon={<QrCode />}
							variant="contained"
							size="small"
							disabled={!selectedStore}
							onClick={handleCustomizeQR}>
							{t('customizeQR')}
						</Button>
					)}
					{!showDownloadButton && !showDeleteButton && (
						<Button
							startIcon={<AddCircleOutline />}
							variant="outlined"
							size="small"
							color="primary"
							style={{ marginLeft: '8px' }}
							onClick={handleModalOpen}
							disabled={!selectedStore || qr_custom.length === 0}>
							{t('addTable')}
						</Button>
					)}
				</div>
			</div>
			<div>
				{totalTables === 0 ? (
					<div className="empty-list">
						<Block fontSize="large" color="disabled" />
						<Typography variant="body1" align="center">
							{t('tableEmpty')}
						</Typography>
					</div>
				) : (
					tables.tables.map((table, index) => (
						<div
							key={index}
							style={{
								marginBottom: '8px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}>
							<div className="tablesTab-checkbox">
								<Checkbox
									color="primary"
									checked={selectedTables.some(
										(selectedTable) => selectedTable._id === table._id,
									)}
									onChange={() => handleTableSelect(table)}
								/>
								<Typography variant="subtitle1" style={{ marginRight: '8px' }}>
									{table.name}
								</Typography>
							</div>
							<div>
								<IconButton
									onClick={(event) => openPopover(event, index)}
									color={selectedTableIndex === index ? 'primary' : 'default'}
									style={{
										boxShadow:
											selectedTableIndex === index
												? '0 0 5px rgba(0, 0, 0, 0.3)'
												: 'none',
									}}>
									<QrCode2 />
								</IconButton>
								{qr_custom.length !== 0 && (
									<Popover
										anchorOrigin={{
											vertical: 'center',
											horizontal: 'left',
										}}
										transformOrigin={{
											vertical: 'center',
											horizontal: 'right',
										}}
										PaperProps={{
											style: {
												boxShadow: 'none',
											},
										}}
										open={Boolean(popoverAnchor && selectedTableIndex === index)}
										anchorEl={popoverAnchor}
										onClose={closePopover}>
										{generateQRCodeComponent(table._id, qr_custom)}
									</Popover>
								)}
								<IconButton onClick={() => handleDownload(table._id, table.name)}>
									<SaveAlt />
								</IconButton>
								{qr_custom.length !== 0 && (
									<div style={{ display: 'none' }}>
										{generateQRCodeComponent(table._id, qr_custom)}
									</div>
								)}
								<IconButton onClick={(event) => handleMenuOpen(event, table)}>
									<MoreVert />
								</IconButton>
								<Menu
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={handleMenuClose}>
									<MenuItem onClick={handleEdit}>{t('edit')}</MenuItem>
								</Menu>
							</div>
						</div>
					))
				)}
			</div>

			{/* Add Tables Modal */}
			<AddModal
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				tableInputs={tableInputs}
				setTableInputs={setTableInputs}
				handleDeleteTableInput={handleDeleteTableInput}
				handleAddTableInput={handleAddTableInput}
				handleAddTable={handleAddTable}
			/>
			{/* Edit Table Modal */}
			<EditModal
				isEditOpen={isEditOpen}
				setIsEditOpen={setIsEditOpen}
				tableObj={tableObj}
				setTableObj={setTableObj}
				handleEditConfirm={handleEditConfirm}
			/>
			{/* Delete Table Modal */}
			<DeleteModal
				isDeleteOpen={isDeleteOpen}
				setIsDeleteOpen={setIsDeleteOpen}
				selectedTables={selectedTables}
				handleDeleteConfirm={handleDeleteConfirm}
			/>
			{/* Customize QR Modal */}
			<CustomizeQRModal
				qr_custom={qr_custom}
				CLIENT_URL={CLIENT_URL}
				selectedStore={selectedStore}
				isCustomizeOpen={isCustomizeOpen}
				setIsCustomizeOpen={setIsCustomizeOpen}
				handleCloseCustomizeModal={handleCloseCustomizeModal}
			/>
		</div>
	);
};
