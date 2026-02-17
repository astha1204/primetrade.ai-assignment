import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { 
    Trash2, CheckCircle, Circle, Edit2, Plus, 
    Search, Clock, X, LogOut, LayoutDashboard 
} from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form States
    const [newTask, setNewTask] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [filter, setFilter] = useState('');

    // Edit Modal States
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/tasks');
            setTasks(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    // --- Create Task ---
    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        try {
            const res = await axios.post('http://localhost:5000/api/v1/tasks', { 
                title: newTask,
                description: newDescription 
            });
            setTasks([res.data, ...tasks]);
            setNewTask('');
            setNewDescription('');
        } catch (err) {
            console.error(err);
        }
    };

    // --- Delete Task ---
    const deleteTask = async (id) => {
        if(!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // --- Toggle Status ---
    const toggleStatus = async (task) => {
        try {
            const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';
            const res = await axios.put(`http://localhost:5000/api/v1/tasks/${task._id}`, { status: updatedStatus });
            setTasks(tasks.map(t => t._id === task._id ? res.data : t));
        } catch (err) {
            console.error(err);
        }
    };

    // --- Edit Task Functions ---
    const openEditModal = (task) => {
        setCurrentTask({ ...task });
        setIsEditing(true);
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/v1/tasks/${currentTask._id}`, {
                title: currentTask.title,
                description: currentTask.description
            });
            setTasks(tasks.map(t => t._id === currentTask._id ? res.data : t));
            setIsEditing(false);
            setCurrentTask(null);
        } catch (err) {
            console.error(err);
        }
    };

    // --- Helper: Format Date ---
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // --- Filter Logic ---
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(filter.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(filter.toLowerCase()))
    );

    // --- Stats ---
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2 text-indigo-600">
                    <LayoutDashboard size={28} />
                    <h1 className="text-2xl font-bold tracking-tight">TaskFlow</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-sm font-semibold text-gray-700">{user?.username}</span>
                        <span className="text-xs text-indigo-500 uppercase tracking-wider font-bold">{user?.role}</span>
                    </div>
                    <button onClick={logout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto p-6">
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
                        <p className="text-3xl font-bold text-gray-800">{totalTasks}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
                        <p className="text-3xl font-bold text-orange-500">{pendingTasks}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
                        <p className="text-3xl font-bold text-green-500">{completedTasks}</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Add Task Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Plus size={20} className="text-indigo-600" /> Create New Task
                            </h2>
                            <form onSubmit={addTask} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                                    <input 
                                        type="text" 
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        placeholder="What needs to be done?" 
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Description (Optional)</label>
                                    <textarea 
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                        placeholder="Add details..." 
                                        rows="3"
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                    ></textarea>
                                </div>
                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95">
                                    Add Task
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Task List */}
                    <div className="lg:col-span-2">
                        {/* Search Bar */}
                        <div className="relative mb-6 group">
                            <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search tasks by title or description..." 
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>

                        {/* Loading State */}
                        {loading ? (
                            <div className="text-center py-10 text-gray-500">Loading tasks...</div>
                        ) : (
                            <div className="space-y-4">
                                {filteredTasks.map(task => (
                                    <div key={task._id} className={`group bg-white p-5 rounded-xl border transition-all hover:shadow-md ${task.status === 'completed' ? 'border-green-100 bg-green-50/30' : 'border-gray-100'}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <button onClick={() => toggleStatus(task)} className="mt-1 transition-transform active:scale-90">
                                                    {task.status === 'completed' ? 
                                                        <CheckCircle className="text-green-500 fill-green-100" size={24}/> : 
                                                        <Circle className="text-gray-400 hover:text-indigo-500" size={24}/>
                                                    }
                                                </button>
                                                <div>
                                                    <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                                        {task.title}
                                                    </h3>
                                                    {task.description && (
                                                        <p className={`text-sm mt-1 ${task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            {task.description}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                                                        <Clock size={12} />
                                                        <span>{formatDate(task.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEditModal(task)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button onClick={() => deleteTask(task._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {filteredTasks.length === 0 && (
                                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                        <p className="text-gray-500">No tasks found. Start by creating one!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Edit2 size={18} /> Edit Task</h3>
                            <button onClick={() => setIsEditing(false)} className="hover:bg-indigo-700 p-1 rounded-full"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleUpdateTask} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input 
                                    type="text" 
                                    value={currentTask.title}
                                    onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    value={currentTask.description}
                                    onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
                                    rows="4"
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                ></textarea>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition-colors">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;