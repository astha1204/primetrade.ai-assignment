import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.username, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError('Error registering user');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" className="w-full p-2 mb-4 border rounded"
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                    <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Register</button>
                </form>
                <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;