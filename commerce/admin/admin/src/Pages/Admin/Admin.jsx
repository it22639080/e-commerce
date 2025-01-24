import AddProduct from '../../Components/AddProduct/AddProduct';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Admin.css'
import React from "react";
import ListProduct from '../../Components/ListProduct/ListProduct';
import {Routes, Route} from 'react-router-dom';
const Admin=()=>{
    return (
        <div className="admin">
          <Sidebar/>
          <Routes>
            <Route  path= '/addproduct' element={<AddProduct/>}/>
            <Route  path= '/listproduct' element={<ListProduct/>}/>
          </Routes>
        </div>
    )
}

export default Admin;