import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");


  const fetchTasks = async ()=>{
    try{
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3001/tasks", {
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

      await axios.post("http://localhost:3001/tasks", 
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

      await axios.delete(`http://localhost:3001/tasks/${id}`, 
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

      await axios.put(`http://localhost:3001/tasks/${id}`, 
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3001/profile", {
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
    <div>
      <h2>Dashboard</h2>
      {user && <p>Welcome {user.name}</p>}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            <button onClick={() => updateTask(task._id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;