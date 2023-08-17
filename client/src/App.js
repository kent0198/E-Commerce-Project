import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import path from './ultils/path'
import { Login, Public, 
         Home, DetailProduct, 
         FQA, Blog, Service, 
         Products, FinalRegister, 
         ResetPassword } 
from './pages/public'
import { AdminLayout,CreateProducts,Dashboard,ManageOrder,ManageProducts,ManageUser } from './pages/Admin';
import {Personal,MemberLayout,History,MyCart,WishList } from './pages/member';
import { getCategories } from './store/app/asyncActions';
import { useDispatch,useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Cart, ModalVote} from './components'


function App() {

  const dispatch = useDispatch()
  const {isShowModal, modalChildren,isShowCart}=useSelector(state=>state.app)  
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="min-h-screen font-main  relative">
        {isShowCart &&   <div className='absolute inset-0 bg-overplay z-50 flex justify-end'>
          <Cart/>
        </div>}
        {isShowModal && <ModalVote>{modalChildren}</ModalVote>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blog />} />
          <Route path={path.DETAIL__PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQs} element={<FQA />} />
          <Route path={path.SERVICES} element={<Service />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout/>}>
            <Route path={path.DASHBOARD} element={<Dashboard/>}/>
            <Route path={path.MANAGE_ORDER} element={<ManageOrder/>}/>
            <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts/>}/>
            <Route path={path.MANAGE_USER} element={<ManageUser/>}/>
            <Route path={path.CREATE_PRODUCTS} element={<CreateProducts/>}/>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout/>}>
             <Route path={path.PERSONAL} element={<Personal/>}/>
             <Route path={path.HISTORY} element={<History/>}/>
             <Route path={path.MY_CART} element={<MyCart/>}/>
             <Route path={path.WISHLIST} element={<WishList/>}/>
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
