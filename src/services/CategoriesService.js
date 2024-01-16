import axios from '../axios';

export default class CategoriesService {
	static async create(
		categoryIndex,
		categoryName,
		categoryDescription,
		categoryVisibility,
		categoryStores,
		categoryModifiers,
	) {
		return axios.post('/categories/add', {
			categoryIndex,
			categoryName,
			categoryDescription,
			categoryVisibility,
			categoryStores,
			categoryModifiers,
		});
	}

	static async edit(
		categoryId,
		categoryName,
		categoryDescription,
		categoryStores,
		categoryModifiers,
	) {
		return axios.post('/categories/edit', {
			categoryId,
			categoryName,
			categoryDescription,
			categoryStores,
			categoryModifiers,
		});
	}

	static async remove(categoryId) {
		return axios.get(`/categories/delete/${categoryId}`);
	}

	static async updateIndexes(categories) {
		return axios.post('/categories/index', { categories });
	}

	static async updateVisibility(categoryId, visibility) {
		return axios.post('/categories/visibility', { categoryId, visibility });
	}

	static async getCategories() {
		return axios.get('/categories');
	}
}
