import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [aiInput, setAiInput] = useState("");

  const fetchTasks = async ()=>{
    try{
      const token = localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(res.data)

    }
    catch(e){
      console.log("Error while fetching tasks : ",e)
    }
  }

  const addTask = async ()=>{
    try{
      const token = localStorage.getItem("token");

      await API.post("/tasks", 
        {title},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");
      fetchTasks();
    }
    catch(e){
      console.log("Error while adding task : ",e)
    }
  }

  const deleteTask = async (id)=>{
    try{
      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();
    }
    catch(e){
      console.log("Error while deleting task : ",e)
    }
  }

  const updateTask = async (id)=>{
    try{
      const token = localStorage.getItem("token");

      await API.put(`/tasks/${id}`, 
        {title},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");
      fetchTasks();
    }
    catch(e){
      console.log("Error while deleting task : ",e)
    }
  }

  const generateTasks = async ()=>{
    const token = localStorage.getItem("token");

    await API.post('/ai-task', { prompt: aiInput },
    { headers: { Authorization: token } })

    setAiInput("");
    fetchTasks();
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
    fetchProfile();
  }, []);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col h-10 p-4 b-2 space-y-4 space-x-4">
        <h2>Dashboard</h2>
        {user && <p>Welcome {user.name}</p>}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
        />
        <button className="bg-green-800 p-2 text-white font-bold rounded-sm" onClick={addTask}>Add</button>


        <input
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          placeholder="e.g. Plan gym routine"
        />

        <button onClick={generateTasks}>
          Generate Tasks with AI
        </button>

        <ul className="flex flex-col h-10 p-4 b-2 space-y-4 space-x-4">
          {tasks.map((task) => (
            <li key={task._id} className="flex p-2 space-x-4">
              <div className="pr-2">{task.title}</div>
              
              <button className="bg-red-600 p-2 text-white font-bold rounded-sm" onClick={() => deleteTask(task._id)}>Delete</button>
              <button className="bg-purple-500 p-2 text-white font-bold rounded-sm" onClick={() => updateTask(task._id)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;