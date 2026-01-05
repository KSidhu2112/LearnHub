import React from 'react'
import './Home.css'
import About from '../../components/About/About'
import Hero from '../../components/Hero/Hero'
import Auth from '../../components/Auth/Auth'

const Home = ({login,setLogin,techpro,setTechpro}) => {
  return (
    <div>
        {login && (<Auth login={login} setLogin={setLogin} techpro={techpro} setTechpro={setTechpro}/>)}
        <Hero/>
      <About/>
    </div>
  )
}

export default Home
