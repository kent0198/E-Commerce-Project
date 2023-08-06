import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import path from './ultils/path'
import { Login, Public, Home, DetailProduct, FQA, Blog, Service, Products, FinalRegister, ResetPassword } from './pages/public'
import { getCategories } from './store/app/asyncActions';
import { useDispatch,useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ModalVote} from './components'


function App() {

  const dispatch = useDispatch()
  const {isShowModal, modalChildren}=useSelector(state=>state.app)  
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="min-h-screen font-main  relative">
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
