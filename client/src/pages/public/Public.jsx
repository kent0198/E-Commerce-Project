import React ,{useEffect, useState}from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navigation,TopHeader,Footer } from '../../components'
import Loading from '../../components/Loading'

const Public = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {  isLoading ? <Loading /> :
    <div className='w-full flex flex-col justify-center items-center '>
          <TopHeader/>
          <Header/>
          <Navigation/>
      <div className='w-main flex flex-col'>
          <Outlet/>
      </div>
          <Footer/>
    </div>
    }
    </>
  )
}

export default Public