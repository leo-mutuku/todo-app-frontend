import {FaTasks} from 'react-icons/fa'
import Modal from './Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const ListHeader = ({ listName,mode, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null)

    const signout = () =>{
        removeCookie('user_email')
        removeCookie('AuthToken')
    }
  return (
    <div className="list-header">
      <h1><FaTasks size={20}/> &nbsp;{listName}</h1>
      <div className='button-cointainer'>
        <button className='create' onClick={()=>setShowModal(true)}>ADD TODO</button>
        <button className='signout' onClick={signout}>SIGN OUT</button>
      </div>
      { showModal && <Modal  setShowModal ={setShowModal} getData={getData} mode='create' />}
    </div>
  );
};

export default ListHeader;
