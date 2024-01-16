import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/slices/categories';
import { MenuLeftSide } from './Layout/MenuLeftSide';
import { MenuRightSide } from './Layout/MenuRightSide';

export const Menu = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories.categories);
	// const food = useSelector((state) => state.food);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		// dispatch(fetchFood(category._id));
	};

	// const categories = [
	// 	{
	// 		_id: '1111',
	// 		index: 0,
	// 		name: 'Drinks',
	// 		description: '',
	// 		visibility: true,
	// 		stores: [],
	// 		modifiers: [{}, {}],
	// 	},
	// 	{
	// 		_id: '2222',
	// 		index: 1,
	// 		name: 'Salads',
	// 		description: '',
	// 		visibility: true,
	// 		stores: [],
	// 		modifiers: [],
	// 	},
	// 	{
	// 		_id: '3333',
	// 		index: 2,
	// 		name: 'Desserts',
	// 		description: '',
	// 		visibility: true,
	// 		stores: [],
	// 		modifiers: [],
	// 	},
	// ];

	return (
		<div style={{ display: 'flex', height: '100%' }}>
			<MenuLeftSide
				title={t('menuLeftSide')}
				categories={categories}
				setSelectedCategory={setSelectedCategory}
				onCategorySelect={handleCategorySelect}
			/>
			<MenuRightSide
				title={t('menuRightSide')}
				selectedCategory={selectedCategory}
				// food={food}
			/>
		</div>
	);
};
