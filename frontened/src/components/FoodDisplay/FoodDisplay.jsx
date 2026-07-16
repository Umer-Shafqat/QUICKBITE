import './FoodDisplay.css';
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {

  const { food_list, searchText } = useContext(StoreContext);

  const filteredFoods = food_list.filter((item) => {

    // Category Filter
    const categoryMatch =
      category === "All" || category === item.category;

    // Search Filter
    const searchMatch =
      searchText === "" ||
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="food-display" id="food-display">

      <h2>Top Dishes Near You</h2>

      {filteredFoods.length === 0 ? (
        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
          No food found
        </h3>
      ) : (
        <div className="food-display-list">

          {filteredFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}

        </div>
      )}

    </div>
  );
};

export default FoodDisplay;