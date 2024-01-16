import axios from '../axios';

export default class TablesService {
	static async create(storeId, tables) {
		return axios.post('/tables/add', { storeId, tables });
	}

	static async edit(storeId, table) {
		return axios.post('/tables/edit', { storeId, table });
	}

	static async remove(storeId, tables) {
		return axios.post('/tables/delete', { storeId, tables });
	}

	static async getTables(storeId) {
		return axios.get(`/tables/${storeId}`);
	}
}
