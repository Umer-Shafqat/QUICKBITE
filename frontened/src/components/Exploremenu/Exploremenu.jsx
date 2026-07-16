import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'

const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Discover a wide variety of delicious meals crafted with fresh ingredients.From quick bites to full-course dishes, we’ve got something for every craving.Enjoy flavors that bring comfort, taste, and quality to your table.Order your favorite dishes with ease and satisfaction guaranteed.</p>
    <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
             <div onClick={() => setCategory(prev=>prev===item.menu_name? "All": item.menu_name )} key={index} className='explore-menu-list-item'>
             <img className={category===item.menu_name? "active": ""} src={item.menu_image} alt="" />
             <p>{item.menu_name}</p>
             </div>   
            )
        })}
    </div>
    <hr/>
    </div>
  )
}

export default Exploremenu
