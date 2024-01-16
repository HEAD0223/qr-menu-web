import axios from '../axios';

export default class StoresService {
	static async create(storeIndex, storeImage, storeName, storeAddress, storePhone, storeEmail) {
		return axios.post('/stores/add', {
			storeIndex,
			storeImage,
			storeName,
			storeAddress,
			storePhone,
			storeEmail,
		});
	}

	static async edit(storeId, storeImage, storeName, storeAddress, storePhone, storeEmail) {
		return axios.post('/stores/edit', {
			storeId,
			storeImage,
			storeName,
			storeAddress,
			storePhone,
			storeEmail,
		});
	}

	static async remove(storeId) {
		return axios.get(`/stores/delete/${storeId}`);
	}

	static async updateSchedule(storeId, schedule) {
		return axios.post('/stores/schedule', { storeId, schedule });
	}

	static async updateWiFi(storeId, wifi) {
		return axios.post('/stores/wifi', { storeId, wifi });
	}

	static async updateSocials(storeId, socials) {
		return axios.post('/stores/socials', { storeId, socials });
	}

	static async updateOptions(storeId, options) {
		return axios.post('/stores/options', { storeId, options });
	}

	static async updateIndexes(stores) {
		return axios.post('/stores/index', { stores });
	}

	static async getStores() {
		return axios.get('/stores');
	}
}
