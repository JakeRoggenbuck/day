import React, { useState, useEffect } from 'react';

const DayTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    
    // Update current date every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };
  
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  
  // Format day of week
  const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  
  // Format day number
  const dayNumber = currentDate.getDate();
  
  // Format month
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
  
  return (
		    <div className="w-screen h-screen overflow-hidden bg-gray-900 text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Day display */}
          <div className="bg-gray-800 rounded-lg p-6 md:w-1/3">
            <div className="text-amber-500 text-8xl font-bold mb-2">{dayNumber}</div>
            <div className="text-3xl font-semibold mb-1">{dayOfWeek}</div>
            <div className="text-xl text-gray-300">{month}</div>
          </div>
          
          {/* Task list */}
          <div className="bg-gray-800 rounded-lg p-6 md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Important Tasks</h2>
            
            {/* Add task form */}
            <div className="flex mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task..."
                className="flex-grow px-4 py-2 bg-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button 
                onClick={addTask}
                className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-r-lg text-gray-900 font-medium transition-colors"
              >
                Add
              </button>
            </div>
            
            {/* Task list */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tasks.length === 0 ? (
                <p className="text-gray-400 italic">No tasks yet. Add some tasks to get started!</p>
              ) : (
                tasks.map(task => (
                  <div 
                    key={task.id} 
                    className="flex items-center bg-gray-700 rounded-lg p-3 group"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-5 w-5 rounded text-amber-500 focus:ring-amber-500 mr-3"
                    />
                    <span className={`flex-grow ${task.completed ? 'line-through text-gray-400' : ''}`}>
                      {task.text}
                    </span>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
            
            {/* Special message section */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <h3 className="text-lg font-medium text-amber-500 mb-2">Special message</h3>
              <p className="text-gray-300">
                Make today count! Focus on what matters most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayTracker;
