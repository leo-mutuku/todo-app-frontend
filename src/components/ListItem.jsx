import { FcApprove, FcDisapprove } from "react-icons/fc";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import { useState } from "react";
const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false)
  const deleteItem = async() =>{
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`,{
        method:'DELETE'
      })
      
      if(response.status===200){
        getData()
        
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <li className="list-item">
      <div className="button-info" >
        <FcApprove size={25} />&nbsp;
        <p>{task.title}</p>&nbsp;&nbsp;
        <ProgressBar progress={task.progress}/>
        {`${task.progress}%`}
      </div>
      <div className="button-container-actions">
        <button className="edit" onClick={()=>setShowModal(true)}>EDIT</button>
        <button className="delete"  onClick={deleteItem}>DELETE</button>
      </div>
      {showModal && <Modal mode='edit' setShowModal={setShowModal} getData={getData} task={task}/>}
    </li>
  );
};

export default ListItem;
