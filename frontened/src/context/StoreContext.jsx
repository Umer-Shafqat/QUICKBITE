import { createContext, use } from "react"
import { useState,useEffect } from "react"
import axios from "axios"
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
const [cartitems, setCartitems] = useState({});
const [searchText, setSearchText] = useState("");

const url = "http://localhost:4000";

const [token,setToken] = useState("");
const [food_list,setFoodList] = useState([]); 

const addToCart = async (itemId) => {
  if(!cartitems[itemId]){
    setCartitems(prev => ({...prev, [itemId]: 1}))
  }else{
    setCartitems(prev => ({...prev, [itemId]: prev[itemId] + 1}))
  }
  if (token) {
    await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
  }
}

const removeFromCart = async (itemId) => {
    setCartitems(prev => ({...prev, [itemId]: prev[itemId] - 1}))
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}}) 
    }
  }

const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartitems){
      if(cartitems[item] > 0){
      let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += cartitems[item] * itemInfo.price;
      }
    }
    return totalAmount;
}

 const fetchFoodList = async () =>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
 }

const loadCartData = async (token) => {
  const response = await axios.post(
    url + "/api/cart/get",
    {},
    {
      headers: { token },
    }
  );

  setCartitems(response.data.cartData);
};

useEffect(() => {
  async function loadData() {
    await fetchFoodList();

    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      await loadCartData(token);
    }
  }

  loadData();
}, []);

    const contextValue = {
      food_list,
      cartitems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken,
       searchText,
  setSearchText,
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;