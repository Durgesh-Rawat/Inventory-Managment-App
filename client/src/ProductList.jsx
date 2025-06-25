import React, {useState, useEffect} from 'react';
import './AppDashboard.css';


function ProductList({ item, setItem }) {

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    Quantity: '',
    price: '',
    category: '',
    status: ''
  })

   // Start editing a product
  const startEditing = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      Quantity: product.Quantity,
      price: product.price,
      category: product.category,
      status: product.status
    });
  };

  // Handle input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };


  useEffect(() => {
  fetch("http://localhost:5002/product", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(res => res.json())
  .then(data => setItem(data))
  .catch(err => console.error("failed to fetch product:", err));
}, []);


  // Save updated product
  const saveEdit = () => {
    fetch(`http://localhost:5002/product/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editForm)
    })
      .then(res => res.json())
      .then(updated => {
        setItem(item.map(p => (p._id === editingId ? updated : p)));
        setEditingId(null);
      })
      .catch(err => console.error('Update failed:', err));
  };

  // Delete product
  const deleteProduct = (id) => {
    fetch(`http://localhost:5002/product/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setItem(item.filter(p => p._id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };



  return (
     
        <div className="AllList">
      <h2 className="productList">Product List</h2>
      <div className="grids">
        {item.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          item.map(product => (
            <div key={product._id} className="Products">
              {editingId === product._id ? (
                <>
                  <input name="name" value={editForm.name} onChange={handleEditChange} />
                  <input name="Quantity" value={editForm.Quantity} onChange={handleEditChange} />
                  <input name="price" value={editForm.price} onChange={handleEditChange} />
                  <input name="category" value={editForm.category} onChange={handleEditChange} />
                  <input name="status" value={editForm.status} onChange={handleEditChange} />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>Name: {product.name}</h3>
                  <p>Quantity: {product.Quantity}</p>
                  <p>Price: ₹{product.price}</p>
                  <p>Category: {product.category}</p>
                  <p>Status: {product.status}</p> <br />
                  <hr />
                  <button onClick={() => deleteProduct(product._id)} className='deletebtn'>Delete</button>
                  <button onClick={() => startEditing(product)} className='editbtn'>Edit</button>
                </>
              )}
              
            </div>
          ))
        )}
      </div>
    </div>

  );
}

export default ProductList;
