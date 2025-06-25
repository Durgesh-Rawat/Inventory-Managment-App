import React, { useState, useEffect } from 'react';
import './AppDashboard.css';
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';

function AppDashboard({ item, setItem }){

   const [name, setName] = useState("");
   const [Quantity, setQuantity] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("");
   const [status,setStatus] = useState("");

   const navigate = useNavigate();




   useEffect(() => {
      fetch("http://localhost:5002/product")
      .then( res => res.json())
      .then(data => setItem(data))
      .catch(err => console.error("failed to fetch product:",err));
   },[]);

   

   function addItem(e){

      e.preventDefault();
     if(!name || !Quantity || !price || !category || !status) return;

     fetch("http://localhost:5002/product",{
       method: "POST",
       headers: { 
         "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
       },
       body: JSON.stringify({name,Quantity,price,category,status}),
     }).then(res => res.json())
     .then(
            newProduct => {setItem((prevItems) => [...prevItems, newProduct]);
        });




    
      navigate('/products');
   }




    return(
   <div className="wrapper">
       <div className="wrapper-content">
        <div className="logout">
          
            <button className='logoutBtn' onClick={() => {
                     localStorage.removeItem('token');
                    window.location.href = '/login'; // Redirect to login
             }}>Logout</button>
        </div>
         <div className="inventory">
             <h1>Inventory Managment App</h1>
              <div className="addProduct">
                 <h2>Add Products</h2>
                 <div className="ProductDetails">
                    <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                    <input type="number" placeholder='Quantity' min="0" onChange={(e) => setQuantity(e.target.value)}/>
                    <input type="number" placeholder='price' min="0" onChange={(e) => setPrice(e.target.value)}/>
                    <input type="text" placeholder='category' onChange={(e) => setCategory(e.target.value)} />
                    <input type="text" placeholder='status'  onChange={(e) => setStatus(e.target.value)}/>
                    <button className='addbtn' onClick={addItem}>Add Item</button>
                 </div>
              </div>
          </div>
        </div>
      </div>  
    );
}

export default AppDashboard