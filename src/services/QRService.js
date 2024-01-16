import axios from '../axios';

export default class QRService {
	static async create(storeId, qr_custom) {
		return axios.post('/qr/add', { storeId, qr_custom });
	}

	static async getQR(storeId) {
		return axios.get(`/qr/${storeId}`);
	}
}
