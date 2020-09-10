import axios from 'axios';
import CONFIG from '../config';

export function getAllCharacters() {
	const url = `${CONFIG.API_BASE_URL}/api/characters`;
	return axios.get(url).catch(response => response.response);
}

export function getCharacterDetails(id) {
	const url = `${CONFIG.API_BASE_URL}/api/characters/${id}`;
	return axios.get(url).catch(response => response.response);
}