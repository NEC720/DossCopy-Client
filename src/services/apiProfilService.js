import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Remplacez par votre URL d'API

export const getSupervisors = async () => {
    try {
        const response = await axios.get(`http://localhost:8002/api/supervisors`);
        return response.data; // Assurez-vous que l'API renvoie un tableau de superviseurs
    } catch (error) {
        console.error('Error fetching supervisors:', error);
        throw error;
    }
};

export const getProfile = async (userId) => {
    try {
        // Récupère le token du localStorage
        const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

        // Configure les en-têtes pour inclure le token
        const config = {
            headers: {
                Authorization: `Bearer ${utilisateur.token}`
            }
        };

        const response = await axios.get(`http://localhost:8002/api/users/${userId}`, config);
        return response.data; // Retourne les données du profil de l'utilisateur
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

// Ajout de la fonction updateProfile
export const updateProfile = async (userId, profileData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/profiles/${userId}`, profileData);
        return response.data; // Retourne les données mises à jour du profil de l'utilisateur
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};
