import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(null);
  const AuthToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch(err) {
      console.error(err);
    }
  }; 

  useEffect(() => {
    if (AuthToken) {
      getData();
    }
  }, [AuthToken]);

  const sortedTasks = [...(tasks || [])].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  return (
    <div className="app">
      {!AuthToken && <Auth />}
      {AuthToken && (
        <>
          <ListHeader listName={'Task Management'} getData={getData}/>
          {sortedTasks.map((task) => (
            <ListItem key={task.id} task={task} getData={getData}/>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
