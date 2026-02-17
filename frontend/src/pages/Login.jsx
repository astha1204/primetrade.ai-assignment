import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
                </form>
                <p className="mt-4 text-center">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;