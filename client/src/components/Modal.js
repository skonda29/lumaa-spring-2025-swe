import { useState } from 'react';

const Modal = ({ mode, setShowModal, getData, task }) => {
  const editMode = mode === 'edit';
  
  const [data, setData] = useState({
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date().toISOString().split('T')[0],
  });

  const postData = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setData((prev) => ({
      ...prev,
      [name]: name === 'progress' ? Number(value) : value,
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} a task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        
        <form onSubmit={editMode ? editData : postData}>
          <input
            required
            maxLength={30}
            placeholder="Your task here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            required
          />
          <input className={mode} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
