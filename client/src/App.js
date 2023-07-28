import React,{useEffect} from 'react';
import {Route,Routes} from 'react-router-dom'
import path from  './ultils/path'
import {Login,Public,Home,DetailProduct,FQA,Blog,Service,Products} from './pages/public'
import { getCategories } from './store/app/asyncActions';
import {useDispatch} from 'react-redux'

function App() {
  
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(getCategories())
  },[])

  return (
    <div className="min-h-screen font-main ">
        <Routes>
          <Route path={path.PUBLIC} element={<Public/>}>
              <Route path={path.HOME} element={<Home/>}/>
              <Route path={path.BLOGS} element={<Blog/>}/>
              <Route path={path.DETAIL_PRODUCT_PID_TITLE} element={<DetailProduct/>}/>
              <Route path={path.FAQs} element={<FQA/>}/>
              <Route path={path.SERVICES} element={<Service/>}/>
              <Route path={path.PRODUCTS} element={<Products/>}/>
          </Route>
              <Route path={path.LOGIN} element={<Login/>}/>
        </Routes>
    </div>    
  );
}

export default App;
