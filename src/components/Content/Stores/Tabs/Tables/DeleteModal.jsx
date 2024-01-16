import { Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeleteModal = ({
	isDeleteOpen,
	setIsDeleteOpen,
	selectedTables,
	handleDeleteConfirm,
}) => {
	const { t } = useTranslation();

	return (
		<Modal open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
			<div className="modal-container">
				<Typography variant="h6" gutterBottom>
					{t('deleteTablesTitle')}
				</Typography>
				{selectedTables.length > 0 && (
					<div>
						<Typography variant="body1" gutterBottom>
							{t('deleteTablesMsg')}
						</Typography>
						<ul style={{ listStyleType: 'none', padding: 0 }}>
							{selectedTables.map((table) => (
								<li key={table._id}>{table.name}</li>
							))}
						</ul>
					</div>
				)}
				<div className="delete-buttons">
					<Button variant="contained" color="secondary" onClick={() => setIsDeleteOpen(false)}>
						{t('cancel')}
					</Button>
					<Button variant="contained" color="primary" onClick={handleDeleteConfirm}>
						{t('delete')}
					</Button>
				</div>
			</div>
		</Modal>
	);
};
