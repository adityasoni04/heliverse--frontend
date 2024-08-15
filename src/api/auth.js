import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password });
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        return { token, role };
    } catch (error) {
        throw new Error('Login failed');
    }
};

// Logout function
export const logout = () => {
    localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('http://localhost:5000/api/v1/auth/user', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to get user details');
    }
};
