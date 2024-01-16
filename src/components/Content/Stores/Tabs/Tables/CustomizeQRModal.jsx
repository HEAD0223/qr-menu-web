import {
	CloudUpload,
	ColorLens,
	CropSquare,
	DeleteOutline,
	ExpandMore,
	FormatPaint,
	NorthEast,
	NorthWest,
	Preview,
	QrCodeScanner,
	RadioButtonChecked,
	RadioButtonUnchecked,
	SouthWest,
} from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Checkbox,
	IconButton,
	Modal,
	Popover,
	Slider,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addQR } from '../../../../../redux/slices/qr';

const defaultEyeCustomRadius = {
	eyeradius_0_outer_0: 0,
	eyeradius_0_outer_1: 0,
	eyeradius_0_outer_2: 0,
	eyeradius_0_outer_3: 0,
	eyeradius_0_inner_0: 0,
	eyeradius_0_inner_1: 0,
	eyeradius_0_inner_2: 0,
	eyeradius_0_inner_3: 0,
	eyeradius_1_outer_0: 0,
	eyeradius_1_outer_1: 0,
	eyeradius_1_outer_2: 0,
	eyeradius_1_outer_3: 0,
	eyeradius_1_inner_0: 0,
	eyeradius_1_inner_1: 0,
	eyeradius_1_inner_2: 0,
	eyeradius_1_inner_3: 0,
	eyeradius_2_outer_0: 0,
	eyeradius_2_outer_1: 0,
	eyeradius_2_outer_2: 0,
	eyeradius_2_outer_3: 0,
	eyeradius_2_inner_0: 0,
	eyeradius_2_inner_1: 0,
	eyeradius_2_inner_2: 0,
	eyeradius_2_inner_3: 0,
};
const defaultColorValues = {
	selectedPatternColor: '#000000',
	selectedEyeColor: '#000000',
	selectedEyeColor2: '#000000',
	selectedBackgroundColor: '#FFFFFF',
	eyeHasBlack: false,
};

// Patterns
const data_patterns = [
	{ id: 'squares', icon: <CropSquare /> },
	{ id: 'dots', icon: <RadioButtonUnchecked /> },
];
const eye_patterns = [
	{
		id: 'eye1',
		icon: <CropSquare />,
		eyeCustomRadius: {
			eyeradius_0_outer_0: 0,
			eyeradius_0_outer_1: 0,
			eyeradius_0_outer_2: 0,
			eyeradius_0_outer_3: 0,
			eyeradius_0_inner_0: 0,
			eyeradius_0_inner_1: 0,
			eyeradius_0_inner_2: 0,
			eyeradius_0_inner_3: 0,
			eyeradius_1_outer_0: 0,
			eyeradius_1_outer_1: 0,
			eyeradius_1_outer_2: 0,
			eyeradius_1_outer_3: 0,
			eyeradius_1_inner_0: 0,
			eyeradius_1_inner_1: 0,
			eyeradius_1_inner_2: 0,
			eyeradius_1_inner_3: 0,
			eyeradius_2_outer_0: 0,
			eyeradius_2_outer_1: 0,
			eyeradius_2_outer_2: 0,
			eyeradius_2_outer_3: 0,
			eyeradius_2_inner_0: 0,
			eyeradius_2_inner_1: 0,
			eyeradius_2_inner_2: 0,
			eyeradius_2_inner_3: 0,
		},
	},
	{
		id: 'eye2',
		icon: <CropSquare />,
		eyeCustomRadius: {
			eyeradius_0_outer_0: 0,
			eyeradius_0_outer_1: 0,
			eyeradius_0_outer_2: 0,
			eyeradius_0_outer_3: 0,
			eyeradius_0_inner_0: 50,
			eyeradius_0_inner_1: 50,
			eyeradius_0_inner_2: 50,
			eyeradius_0_inner_3: 50,
			eyeradius_1_outer_0: 0,
			eyeradius_1_outer_1: 0,
			eyeradius_1_outer_2: 0,
			eyeradius_1_outer_3: 0,
			eyeradius_1_inner_0: 50,
			eyeradius_1_inner_1: 50,
			eyeradius_1_inner_2: 50,
			eyeradius_1_inner_3: 50,
			eyeradius_2_outer_0: 0,
			eyeradius_2_outer_1: 0,
			eyeradius_2_outer_2: 0,
			eyeradius_2_outer_3: 0,
			eyeradius_2_inner_0: 50,
			eyeradius_2_inner_1: 50,
			eyeradius_2_inner_2: 50,
			eyeradius_2_inner_3: 50,
		},
	},
	{
		id: 'eye3',
		icon: <RadioButtonChecked />,
		eyeCustomRadius: {
			eyeradius_0_outer_0: 5,
			eyeradius_0_outer_1: 5,
			eyeradius_0_outer_2: 5,
			eyeradius_0_outer_3: 5,
			eyeradius_0_inner_0: 50,
			eyeradius_0_inner_1: 50,
			eyeradius_0_inner_2: 50,
			eyeradius_0_inner_3: 50,
			eyeradius_1_outer_0: 5,
			eyeradius_1_outer_1: 5,
			eyeradius_1_outer_2: 5,
			eyeradius_1_outer_3: 5,
			eyeradius_1_inner_0: 50,
			eyeradius_1_inner_1: 50,
			eyeradius_1_inner_2: 50,
			eyeradius_1_inner_3: 50,
			eyeradius_2_outer_0: 5,
			eyeradius_2_outer_1: 5,
			eyeradius_2_outer_2: 5,
			eyeradius_2_outer_3: 5,
			eyeradius_2_inner_0: 50,
			eyeradius_2_inner_1: 50,
			eyeradius_2_inner_2: 50,
			eyeradius_2_inner_3: 50,
		},
	},
	{
		id: 'eye4',
		icon: <RadioButtonChecked />,
		eyeCustomRadius: {
			eyeradius_0_outer_0: 0,
			eyeradius_0_outer_1: 50,
			eyeradius_0_outer_2: 0,
			eyeradius_0_outer_3: 50,
			eyeradius_0_inner_0: 0,
			eyeradius_0_inner_1: 0,
			eyeradius_0_inner_2: 0,
			eyeradius_0_inner_3: 0,
			eyeradius_1_outer_0: 50,
			eyeradius_1_outer_1: 0,
			eyeradius_1_outer_2: 50,
			eyeradius_1_outer_3: 0,
			eyeradius_1_inner_0: 0,
			eyeradius_1_inner_1: 0,
			eyeradius_1_inner_2: 0,
			eyeradius_1_inner_3: 0,
			eyeradius_2_outer_0: 50,
			eyeradius_2_outer_1: 0,
			eyeradius_2_outer_2: 50,
			eyeradius_2_outer_3: 0,
			eyeradius_2_inner_0: 0,
			eyeradius_2_inner_1: 0,
			eyeradius_2_inner_2: 0,
			eyeradius_2_inner_3: 0,
		},
	},
	{
		id: 'eye5',
		icon: <RadioButtonChecked />,
		eyeCustomRadius: {
			eyeradius_0_outer_0: 0,
			eyeradius_0_outer_1: 50,
			eyeradius_0_outer_2: 0,
			eyeradius_0_outer_3: 50,
			eyeradius_0_inner_0: 50,
			eyeradius_0_inner_1: 50,
			eyeradius_0_inner_2: 50,
			eyeradius_0_inner_3: 50,
			eyeradius_1_outer_0: 50,
			eyeradius_1_outer_1: 0,
			eyeradius_1_outer_2: 50,
			eyeradius_1_outer_3: 0,
			eyeradius_1_inner_0: 50,
			eyeradius_1_inner_1: 50,
			eyeradius_1_inner_2: 50,
			eyeradius_1_inner_3: 50,
			eyeradius_2_outer_0: 50,
			eyeradius_2_outer_1: 0,
			eyeradius_2_outer_2: 50,
			eyeradius_2_outer_3: 0,
			eyeradius_2_inner_0: 50,
			eyeradius_2_inner_1: 50,
			eyeradius_2_inner_2: 50,
			eyeradius_2_inner_3: 50,
		},
	},
];

export const CustomizeQRModal = ({
	qr_custom,
	CLIENT_URL,
	selectedStore,
	isCustomizeOpen,
	setIsCustomizeOpen,
	handleCloseCustomizeModal,
}) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [expandedPanel, setExpandedPanel] = useState(null);
	const [colorPatternTab, setColorPatternTab] = useState(0);
	const [selectedDataPattern, setSelectedDataPattern] = useState('squares');
	const [selectedEyePattern, setSelectedEyePattern] = useState('eye1');
	const [uploadedImage, setUploadedImage] = useState('');
	const [uploadedImageWidth, setUploadedImageWidth] = useState(0);
	const [uploadedImageHeight, setUploadedImageHeight] = useState(0);
	const [uploadedImagePadding, setUploadedImagePadding] = useState(0);

	const [colorValues, setColorValues] = useState(defaultColorValues);

	useEffect(() => {
		if (qr_custom.length !== 0) {
			setUploadedImage(qr_custom.uploadedImage || '');
			setUploadedImageWidth(qr_custom.uploadedImageWidth || 0);
			setUploadedImageHeight(qr_custom.uploadedImageHeight || 0);
			setUploadedImagePadding(qr_custom.uploadedImagePadding || 0);
			setSelectedDataPattern(qr_custom.selectedDataPattern || '');
			setSelectedEyePattern(qr_custom.selectedEyePattern || '');
			setEyeCustomRadius(qr_custom.eyeCustomRadius[0] || defaultEyeCustomRadius);
			setColorValues(qr_custom.colorValues[0] || defaultColorValues);
		}
	}, [qr_custom]);

	// Menu
	const handleChangeAccordion = (panel) => (event, isExpanded) => {
		setExpandedPanel(isExpanded ? panel : null);
	};
	const handleColorPatternTabChange = (event, newValue) => {
		setColorPatternTab(newValue);
	};
	const handleUploadedImagePaddingChange = (event, newValue) => {
		setUploadedImagePadding(newValue);
	};
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const base64Image = reader.result;
				const img = new Image();
				img.src = base64Image;
				img.onload = () => {
					const imageWidth = img.width;
					const imageHeight = img.height;
					setUploadedImage(base64Image);
					setUploadedImageWidth(imageWidth);
					setUploadedImageHeight(imageHeight);
				};
			};
			reader.readAsDataURL(file);
		}
	};
	const handleUploadedImageClear = () => {
		setUploadedImage('');
		setUploadedImageWidth(0);
		setUploadedImageHeight(0);
		setUploadedImagePadding(0);
	};

	const handleSaveCustomization = async () => {
		const storeId = selectedStore._id;
		const qr_custom = {
			uploadedImage,
			uploadedImageWidth,
			uploadedImageHeight,
			uploadedImagePadding,
			selectedDataPattern,
			selectedEyePattern,
			eyeCustomRadius,
			colorValues: {
				selectedPatternColor: colorValues.selectedPatternColor,
				selectedEyeColor: colorValues.eyeHasBlack ? '#000000' : colorValues.selectedEyeColor,
				selectedEyeColor2: colorValues.eyeHasBlack ? '#000000' : colorValues.selectedEyeColor2,
				selectedBackgroundColor: colorValues.selectedBackgroundColor,
				eyeHasBlack: colorValues.eyeHasBlack,
			},
		};

		try {
			const qrCreationResponse = await dispatch(addQR({ storeId, qr_custom }));
			if (qrCreationResponse.payload.error) {
				console.error('Error creating qr:', qrCreationResponse.payload.error);
				setIsCustomizeOpen(false);
				toast.error(t('qrCreateError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				setIsCustomizeOpen(false);
				toast.success(t('qrCreateSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			}
		} catch (error) {
			console.error('Error dispatching addQR:', error);
			setIsCustomizeOpen(false);
			toast.error(t('qrCreateError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	// Create Slider
	const [eyeCustomRadius, setEyeCustomRadius] = useState(defaultEyeCustomRadius);
	const handleCustomRadiusChange = (event) => {
		const { name, value } = event.target;
		setEyeCustomRadius((prevState) => ({ ...prevState, [name]: value }));
		setSelectedEyePattern('');
	};
	const buildEyeRadiusInput = (id) => {
		return (
			<Slider
				name={id}
				value={(eyeCustomRadius[id] !== undefined && parseInt(eyeCustomRadius[id])) || 0}
				onChange={handleCustomRadiusChange}
				size="small"
				step={1}
				min={0}
				max={50}
			/>
		);
	};

	// Handle Patterns
	const handleSelectDataPattern = (patternId) => {
		setSelectedDataPattern(patternId);
	};
	const handleSelectEyePattern = (patternId) => {
		setSelectedEyePattern(patternId);
		const selectedPattern = eye_patterns.find((pattern) => pattern.id === patternId);
		if (selectedPattern) {
			setEyeCustomRadius(selectedPattern.eyeCustomRadius);
		}
	};
	const handleEyeHasBlack = (checkKey, checked) => {
		setColorValues((prevColorValues) => ({
			...prevColorValues,
			[checkKey]: checked,
		}));
	};

	// Pattern Color
	const [isPatternColorPopoverOpen, setIsPatternColorPopoverOpen] = useState(false);
	const [patternColorPopoverAnchorEl, setPatternColorPopoverAnchorEl] = useState(null);
	const handlePatternColorPopoverOpen = (event) => {
		setPatternColorPopoverAnchorEl(event.currentTarget);
		setIsPatternColorPopoverOpen(true);
	};
	const handlePatternColorPopoverClose = () => {
		setIsPatternColorPopoverOpen(false);
	};
	const handlePatternColorChange = (colorKey, color) => {
		setColorValues((prevColorValues) => ({
			...prevColorValues,
			[colorKey]: color.hex,
		}));
	};

	// Eye Color 1
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
	const handlePopoverOpen = (event) => {
		setPopoverAnchorEl(event.currentTarget);
		setIsPopoverOpen(true);
	};
	const handlePopoverClose = () => {
		setIsPopoverOpen(false);
	};
	const handleEyeColorChange = (colorKey, color) => {
		setColorValues((prevColorValues) => ({
			...prevColorValues,
			[colorKey]: color.hex,
		}));
	};
	// Eye Color 2
	const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
	const [popoverAnchorEl2, setPopoverAnchorEl2] = useState(null);
	const handlePopoverOpen2 = (event) => {
		setPopoverAnchorEl2(event.currentTarget);
		setIsPopoverOpen2(true);
	};
	const handlePopoverClose2 = () => {
		setIsPopoverOpen2(false);
	};
	const handleEyeColorChange2 = (colorKey, color) => {
		setColorValues((prevColorValues) => ({
			...prevColorValues,
			[colorKey]: color.hex,
		}));
	};

	// Background Color
	const [isBackgroundPopoverOpen, setIsBackgroundPopoverOpen] = useState(false);
	const [backgroundPopoverAnchorEl, setBackgroundPopoverAnchorEl] = useState(null);
	const handleBackgroundPopoverOpen = (event) => {
		setBackgroundPopoverAnchorEl(event.currentTarget);
		setIsBackgroundPopoverOpen(true);
	};
	const handleBackgroundPopoverClose = () => {
		setIsBackgroundPopoverOpen(false);
	};
	const handleBackgroundColorChange = (colorKey, color) => {
		setColorValues((prevColorValues) => ({
			...prevColorValues,
			[colorKey]: color.hex,
		}));
	};

	return (
		<Modal open={isCustomizeOpen} onClose={handleCloseCustomizeModal}>
			<div className="customize-modal-container">
				<div className="customize-modal-left">
					<div className="customize-title">
						<Typography variant="h6">{t('customizeQR')}</Typography>
						<Typography variant="h8">{selectedStore ? selectedStore.name : ''}</Typography>
					</div>
					<div className="customize-upload">
						{uploadedImage && (
							<div className="uploaded-image">
								<img src={uploadedImage} alt="Uploaded Logo" />
							</div>
						)}
						<div className="uploaded-buttons">
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
							{uploadedImage && (
								<IconButton color="error" onClick={handleUploadedImageClear}>
									<DeleteOutline />
								</IconButton>
							)}
						</div>
						{uploadedImage && (
							<div className="uploaded-padding">
								<Slider
									value={uploadedImagePadding}
									onChange={handleUploadedImagePaddingChange}
									aria-labelledby="logo-padding-slider"
									step={0.5}
									min={0}
									max={20}
									valueLabelDisplay="off"
									valueLabelFormat={(value) => `${value}`}
								/>
							</div>
						)}
					</div>
					{/* Data Pattern Accordion */}
					<Accordion
						expanded={expandedPanel === 'dataPattern'}
						onChange={handleChangeAccordion('dataPattern')}>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							aria-controls="data-pattern-content"
							id="data-pattern-header">
							<QrCodeScanner />
							<Typography>{t('dataPattern')}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div className="pattern-options">
								{data_patterns.map((pattern) => (
									<IconButton
										key={pattern.id}
										onClick={() => handleSelectDataPattern(pattern.id)}
										className={`pattern-button ${
											selectedDataPattern === pattern.id ? 'selected' : ''
										}`}
										disableRipple>
										{pattern.icon}
									</IconButton>
								))}
							</div>
						</AccordionDetails>
					</Accordion>
					{/* Eye Pattern Accordion */}
					<Accordion
						expanded={expandedPanel === 'eyePattern'}
						onChange={handleChangeAccordion('eyePattern')}>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							aria-controls="eye-pattern-content"
							id="eye-pattern-header">
							<Preview />
							<Typography>{t('eyePattern')}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div className="pattern-options">
								{eye_patterns.map((pattern) => (
									<IconButton
										key={pattern.id}
										onClick={() => handleSelectEyePattern(pattern.id)}
										className={`pattern-button ${
											selectedEyePattern === pattern.id ? 'selected' : ''
										}`}
										disableRipple>
										{pattern.icon}
									</IconButton>
								))}
								<div className="eye-sliders">
									<div className="slider-container">
										<Typography>
											<NorthWest />
										</Typography>
										<Typography>{t('outerSlider')}</Typography>
										{buildEyeRadiusInput('eyeradius_0_outer_0')}
										{buildEyeRadiusInput('eyeradius_0_outer_1')}
										{buildEyeRadiusInput('eyeradius_0_outer_2')}
										{buildEyeRadiusInput('eyeradius_0_outer_3')}
										<Typography>{t('innerSlider')}</Typography>
										{buildEyeRadiusInput('eyeradius_0_inner_0')}
										{buildEyeRadiusInput('eyeradius_0_inner_1')}
										{buildEyeRadiusInput('eyeradius_0_inner_2')}
										{buildEyeRadiusInput('eyeradius_0_inner_3')}
									</div>
									<div className="slider-container">
										<Typography>
											<NorthEast />
										</Typography>
										<Typography>{t('outerSlider')}</Typography>
										{buildEyeRadiusInput('eyeradius_1_outer_0')}
										{buildEyeRadiusInput('eyeradius_1_outer_1')}
										{buildEyeRadiusInput('eyeradius_1_outer_2')}
										{buildEyeRadiusInput('eyeradius_1_outer_3')}
										<Typography>{t('innerSlider')}</Typography>
										{buildEyeRadiusInput('eyeradius_1_inner_0')}
										{buildEyeRadiusInput('eyeradius_1_inner_1')}
										{buildEyeRadiusInput('eyeradius_1_inner_2')}
										{buildEyeRadiusInput('eyeradius_1_inner_3')}
									</div>
									<div className="slider-container">
										<Typography>
											<SouthWest />
										</Typography>
										<Typography>{t('outerSlider')}</Typography>
										{buildEyeRadiusInput('eyeradius_2_outer_0')}
										{buildEyeRadiusInput('eyeradius_2_outer_1')}
										{buildEyeRadiusInput('eyeradius_2_outer_2')}
										{buildEyeRadiusInput('eyeradius_2_outer_3')}
										<Typography>{t('innerSlider')}</Typography>
										{buildEyeRadiusInput('eyeradius_2_inner_0')}
										{buildEyeRadiusInput('eyeradius_2_inner_1')}
										{buildEyeRadiusInput('eyeradius_2_inner_2')}
										{buildEyeRadiusInput('eyeradius_2_inner_3')}
									</div>
								</div>
							</div>
						</AccordionDetails>
					</Accordion>
					{/* Set Color Accordion */}
					<Accordion
						expanded={expandedPanel === 'colorPattern'}
						onChange={handleChangeAccordion('colorPattern')}>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							aria-controls="color-pattern-content"
							id="color-pattern-header">
							<FormatPaint />
							<Typography>{t('colorPattern')}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div className="color-pattern-tabs">
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-evenly',
									}}>
									<Tabs value={colorPatternTab} onChange={handleColorPatternTabChange}>
										<Tab label={t('patternsTab')} />
										<Tab label={t('eyeTab')} />
										<Tab label={t('backgroundTab')} />
									</Tabs>
								</div>
								{colorPatternTab === 0 && (
									<div className="color-pattern-content">
										<div className="color-pattern-color">
											<div
												className="color-box"
												style={{
													backgroundColor: colorValues.selectedPatternColor,
												}}></div>
											<Typography>{colorValues.selectedPatternColor}</Typography>
											<Popover
												open={isPatternColorPopoverOpen}
												anchorEl={patternColorPopoverAnchorEl}
												onClose={handlePatternColorPopoverClose}
												anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'center',
												}}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'center',
												}}>
												<SketchPicker
													color={colorValues.selectedPatternColor}
													onChange={(color) =>
														handlePatternColorChange('selectedPatternColor', color)
													}
												/>
											</Popover>
											<IconButton
												className="color-picker-button"
												aria-label="color-picker"
												onClick={handlePatternColorPopoverOpen}>
												<ColorLens />
											</IconButton>
										</div>
									</div>
								)}
								{colorPatternTab === 1 && (
									<div className="color-pattern-content">
										<div className="color-pattern-checkbox">
											<Checkbox
												checked={colorValues.eyeHasBlack}
												onChange={(e) =>
													handleEyeHasBlack('eyeHasBlack', e.target.checked)
												}
											/>
											<Typography>{t('useBlackForEye')}</Typography>
										</div>
										<div className="color-pattern-color">
											<div
												className="color-box"
												style={{
													backgroundColor: colorValues.eyeHasBlack
														? '#000000'
														: colorValues.selectedEyeColor,
												}}></div>
											<Typography>
												{colorValues.eyeHasBlack
													? '#000000'
													: colorValues.selectedEyeColor}
											</Typography>
											<Popover
												open={isPopoverOpen}
												anchorEl={popoverAnchorEl}
												onClose={handlePopoverClose}
												anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'center',
												}}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'center',
												}}>
												<SketchPicker
													color={colorValues.selectedEyeColor}
													onChange={(color) =>
														handleEyeColorChange('selectedEyeColor', color)
													}
												/>
											</Popover>
											<IconButton
												className="color-picker-button"
												aria-label="color-picker"
												onClick={handlePopoverOpen}>
												<ColorLens />
											</IconButton>
										</div>
										<div className="color-pattern-color">
											<div
												className="color-box"
												style={{
													backgroundColor: colorValues.eyeHasBlack
														? '#000000'
														: colorValues.selectedEyeColor2,
												}}></div>
											<Typography>
												{colorValues.eyeHasBlack
													? '#000000'
													: colorValues.selectedEyeColor2}
											</Typography>
											<Popover
												open={isPopoverOpen2}
												anchorEl={popoverAnchorEl2}
												onClose={handlePopoverClose2}
												anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'center',
												}}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'center',
												}}>
												<SketchPicker
													color={colorValues.selectedEyeColor2}
													onChange={(color) =>
														handleEyeColorChange2('selectedEyeColor2', color)
													}
												/>
											</Popover>
											<IconButton
												className="color-picker-button"
												aria-label="color-picker"
												onClick={handlePopoverOpen2}>
												<ColorLens />
											</IconButton>
										</div>
									</div>
								)}
								{colorPatternTab === 2 && (
									<div className="color-pattern-content">
										<div className="color-pattern-color">
											<div
												className="color-box"
												style={{
													backgroundColor: colorValues.selectedBackgroundColor,
												}}></div>
											<Typography>{colorValues.selectedBackgroundColor}</Typography>
											<Popover
												open={isBackgroundPopoverOpen}
												anchorEl={backgroundPopoverAnchorEl}
												onClose={handleBackgroundPopoverClose}
												anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'center',
												}}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'center',
												}}>
												<SketchPicker
													color={colorValues.selectedBackgroundColor}
													onChange={(color) =>
														handleBackgroundColorChange(
															'selectedBackgroundColor',
															color,
														)
													}
												/>
											</Popover>
											<IconButton
												className="color-picker-button"
												aria-label="color-picker"
												onClick={handleBackgroundPopoverOpen}>
												<ColorLens />
											</IconButton>
										</div>
									</div>
								)}
							</div>
						</AccordionDetails>
					</Accordion>
				</div>
				<div className="customize-modal-right">
					<Typography variant="body2" textAlign={'center'} gutterBottom>
						{t('customizeQRInfo')}
					</Typography>
					<QRCode
						id="react-qrcode-logo"
						removeQrCodeBehindLogo={false}
						value={CLIENT_URL}
						enableCORS={true}
						ecLevel="H"
						size={250}
						quietZone={15}
						bgColor={colorValues.selectedBackgroundColor}
						fgColor={colorValues.selectedPatternColor}
						logoImage={uploadedImage}
						logoWidth={uploadedImageWidth * 0.125}
						logoHeight={uploadedImageHeight * 0.125}
						logoOpacity={1}
						logoPadding={uploadedImagePadding}
						logoPaddingStyle="square"
						qrStyle={selectedDataPattern}
						eyeRadius={[
							{
								outer: [
									eyeCustomRadius.eyeradius_0_outer_0,
									eyeCustomRadius.eyeradius_0_outer_1,
									eyeCustomRadius.eyeradius_0_outer_2,
									eyeCustomRadius.eyeradius_0_outer_3,
								],
								inner: [
									eyeCustomRadius.eyeradius_0_inner_0,
									eyeCustomRadius.eyeradius_0_inner_1,
									eyeCustomRadius.eyeradius_0_inner_2,
									eyeCustomRadius.eyeradius_0_inner_3,
								],
							},
							{
								outer: [
									eyeCustomRadius.eyeradius_1_outer_0,
									eyeCustomRadius.eyeradius_1_outer_1,
									eyeCustomRadius.eyeradius_1_outer_2,
									eyeCustomRadius.eyeradius_1_outer_3,
								],
								inner: [
									eyeCustomRadius.eyeradius_1_inner_0,
									eyeCustomRadius.eyeradius_1_inner_1,
									eyeCustomRadius.eyeradius_1_inner_2,
									eyeCustomRadius.eyeradius_1_inner_3,
								],
							},
							{
								outer: [
									eyeCustomRadius.eyeradius_2_outer_0,
									eyeCustomRadius.eyeradius_2_outer_1,
									eyeCustomRadius.eyeradius_2_outer_2,
									eyeCustomRadius.eyeradius_2_outer_3,
								],
								inner: [
									eyeCustomRadius.eyeradius_2_inner_0,
									eyeCustomRadius.eyeradius_2_inner_1,
									eyeCustomRadius.eyeradius_2_inner_2,
									eyeCustomRadius.eyeradius_2_inner_3,
								],
							},
						]}
						eyeColor={[
							{
								outer: colorValues.eyeHasBlack ? '#000000' : colorValues.selectedEyeColor,
								inner: colorValues.eyeHasBlack ? '#000000' : colorValues.selectedEyeColor2,
							},
							{
								outer: colorValues.eyeHasBlack ? '#000000' : colorValues.selectedEyeColor,
								inner: colorValues.eyeHasBlack ? '#000000' : colorValues.selectedEyeColor2,
							},
							{
								outer: colorValues.eyeHasBlack ? '#000000' : colorValues.selectedEyeColor,
								inner: colorValues.eyeHasBlack ? '#000000' : colorValues.selectedEyeColor2,
							},
						]}
					/>
					<div className="customize-edit-buttons">
						<Button
							variant="outlined"
							color="secondary"
							size="small"
							onClick={handleCloseCustomizeModal}>
							{t('cancel')}
						</Button>
						<Button
							variant="contained"
							color="primary"
							size="small"
							onClick={handleSaveCustomization}>
							{t('update')}
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};
