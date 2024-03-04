import React from 'react'
import ChooseUs from '../../components/choose_us/ChooseUs'
import HeroSilder from '../../components/hero_slider/HeroSilder'
import MenuPack from '../../components/menu_pack/MenuPack'
//import PopularMenu from '../../components/popular-menu/PopularMenu'
import Testimonials from '../../components/testimonials/Testimonials'
const Home = () => {
       return (
              <div className="home-client">
                     <div className='mt-5'>
                     </div>
                     <div className=''>
                            <HeroSilder />
                     </div>
                     <div className=''>
                            <ChooseUs />
                     </div>
                     <div className=''>
                            <MenuPack />
                     </div>
                     <div className='mt-5'>
                            <Testimonials />
                     </div>
                     {/* <Download/> */}
              </div>
       )
}

export default Home
