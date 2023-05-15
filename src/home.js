import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./button.css";
const Home = () => {
  const navigate=useNavigate();
function a(){
  navigate('/home');

}

  return (
    <div className='home'>
    <h1> TERRIBLY TALES</h1>
    <button class='glowing-btn' onClick={a}><span class='glowing-txt'>C<span class='faulty-letter'>L</span>ICK</span></button>
    </div>
  )
}

export default Home;