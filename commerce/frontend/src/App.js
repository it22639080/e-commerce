import './App.css';
import Navbar from './components/navbar/navbar.jsx';  // Use `Navbar` instead of `navbar`
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './pages/shop.jsx';
import ShopCategory from './pages/ShopCategory.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
//import login from './pages/loginsignup.jsx';
import LoginSignup from './pages/loginsignup.jsx';
import Footer from './components/Footer/Footer.jsx';
import men_banner from './components/assets/banner_mens.png';
import women_banner from './components/assets/banner_women.png';
import kid_banner from './components/assets/banner_kids.png';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />  
<Routes>
  <Route path='/' element={<Shop/>}/>
  <Route path='/mens' element={<ShopCategory  banner={men_banner} category="mens"/>}/>
  <Route path='/womens' element={<ShopCategory banner={women_banner} category="womens"/>}/>
  <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kids"/>}/>
  <Route path= "/product" element ={<Product/>}>
  <Route path=":productId" element={<Product/>}/>
  
  </Route>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/login' element={<LoginSignup/>}/>
</Routes>
<Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;

//-----------------------------------------------App.js-------------------------------------------------