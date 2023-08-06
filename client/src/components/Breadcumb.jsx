import React from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from 'react-router-dom';
import icons from '../../src/ultils/icons'


const {MdKeyboardArrowRight}=icons

const Breadcumb = ({title, category}) => {

    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },
    ];
   
    const breadcrumbs = useBreadcrumbs(routes);
    
  return (
    <div className='text=sm flex items-center '>
        {breadcrumbs?.filter(el=>!el.match.route===false).map(({match,breadcrumb}, index, self)=>(
            <Link key={match.pathname} to={match.pathname} className='flex items-center gap-2 text-center gap-2'>
                <span className='flex items-center gap-2 text-center hover:text-main uppercase  '>
                {breadcrumb}    
                </span>
                {index !==self.length-1 && <MdKeyboardArrowRight size={18}/>}
            </Link>
        ))}
    </div>
  )
}

export default Breadcumb