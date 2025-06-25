import React, { useState } from 'react';
import AppLogin from './AppLogin';
import AppSignIn from './AppSignIn';
import AppDashboard from './AppDashboard';
import ProductList from './ProductList';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {
    
  const [item, setItem] = useState([]);


 

  return (
      <Router>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/inventory' element={<ProtectedRoute><AppDashboard item={item} setItem={setItem} /> </ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductList item={item} setItem={setItem} /> </ProtectedRoute>} />
            <Route path='/login' element={<AppLogin />}/>
            <Route path='/signup' element={<AppSignIn />}/>
         </Routes>
      </Router>
  );
}

export default App
