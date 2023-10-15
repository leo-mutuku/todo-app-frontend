import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, task, getData}) => {
  const editMode = mode ==="edit"? true: false
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [data, setData] = useState({
    userEmail:editMode?task.user_email:cookies.user_email,
    title:editMode?task.title:"",
    progress:editMode?task.progress:0,
    date:editMode? task.date: new Date() 
  })
  console.log(task)
  console.log(data)

  const postData = async (e) =>{
    try {
      e.preventDefault()
      const response = await fetch(`http://localhost:8000/todos`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
       })
  
       if(response.status === 200){
        console.log("It worked!")
        
        setShowModal(false)
         getData()
       }
    } catch (err) {
      console.error(err)
    }
  }
  const editData = async(e)=>{

      try {
        e.preventDefault()
       
       const response = await fetch(`http://localhost:8000/todos/${task.id}`,{
          method:'PATCH',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(data)
        })
        console.log(response)
        if(response.status ===200){
          setShowModal(false)
          getData()
        }
        
      } catch (err) {
        console.error(err)
        
      }
  }
  const handlChange = (e) => {
    const {name, value}=e.target
    setData(data=>({
      ...data,
      [name]:value
    }))
   
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode==="edit"?"edit":"create"} your contact</h3>
          <button onClick={()=>{setShowModal(false)}}>X</button>
        </div>
        <form>
          <label htmlFor="title">Conact Name</label>
          <input
            required
            maxLength={30}
            minLength={4}
            placeholder="Your contact name goes here Characters(4 - 30)"
            name={"title"}
            value={data.title}
            
            onChange={handlChange}
          />
          <br />
          <label htmlFor="range">Enter tel no.</label>
          <input
            required
            id="range"
            type="range"
            min={0}
            max={100}
            name="progress"
            value={data.progress}
           
            onChange={handlChange}
          />

          <input className={mode} type="submit" onClick={editMode ? editData:postData} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
