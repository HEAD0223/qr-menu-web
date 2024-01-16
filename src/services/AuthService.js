import axios from '../axios';

export default class AuthService {
	static async registration(firstName, lastName, email, password, accessLevel, storeId) {
		return axios.post('/add-user', {
			firstName,
			lastName,
			email,
			password,
			accessLevel,
			storeId,
		});
	}

	static async login(email, password) {
		return axios.post('/login', { email, password });
	}

	static async logout() {
		return axios.post('/logout');
	}

	static async getUsers(storeId) {
		return axios.get(`/users/${storeId}`);
	}

	static async editUser(user) {
		return axios.post('/edit-user', { user });
	}

	static async deleteUser(userId) {
		return axios.get(`/delete-user/${userId}`);
	}
}
