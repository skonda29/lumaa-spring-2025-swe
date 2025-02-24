import TickIcon from './TickIcon'
import Modal from './Modal' 
import ProgressBar from './ProgressBar'
import {useState} from 'react'

const ListItem =({task, getData}) =>{
  const [showModal,setShowModal] = useState(false)
  const deleteItem = async () =>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,{
        method:"DELETE"
      })
      if(response.ok){
        console.log('Task deleted successfully')
        getData()
      }
    }
      catch(err){
        console.log(err)
      } 
    }
    return (
      <li className ="list-item">
        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
          <ProgressBar />
        </div>

        <div className="button-container">
          <button className="edit" onClick={()=>setShowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
          </div>  
          {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
      </li>
    )
  }
  
  export default ListItem
  