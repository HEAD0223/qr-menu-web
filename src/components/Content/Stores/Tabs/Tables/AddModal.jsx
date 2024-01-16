import { Delete } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AddModal = ({
	isModalOpen,
	handleModalClose,
	tableInputs,
	setTableInputs,
	handleDeleteTableInput,
	handleAddTableInput,
	handleAddTable,
}) => {
	const { t } = useTranslation();

	return (
		<Modal open={isModalOpen} onClose={handleModalClose}>
			<div className="modal-container">
				<Typography variant="h6" align="center">
					{t('addTablesTitle')}
				</Typography>
				{tableInputs.map((input, index) => (
					<div key={index} style={{ display: 'flex' }}>
						<TextField
							label={`${t('tableNameCount')} ${index + 1}`}
							variant="outlined"
							fullWidth
							margin="normal"
							value={input.name}
							onChange={(e) => {
								const updatedInputs = [...tableInputs];
								updatedInputs[index].name = e.target.value;
								setTableInputs(updatedInputs);
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											className="no-hover-background-color"
											onClick={() => handleDeleteTableInput(index)}>
											<Delete />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>
				))}
				<Button variant="text" color="primary" onClick={handleAddTableInput}>
					{t('addTableLink')}
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handleAddTable}
					disabled={tableInputs.filter((input) => input.name.trim() !== '').length === 0}>
					{t('save')}
				</Button>
			</div>
		</Modal>
	);
};
