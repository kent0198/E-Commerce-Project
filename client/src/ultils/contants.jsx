import path from "./path";
import icons from './icons'

const { AiOutlineDashboard,GrGroup,RiProductHuntLine,RiBillLine} =icons

export const navigation=[
    {
        id:1,
        value:'HOME',
        path:`/${path.HOME}`
    },
    {
        id:2,
        value:'Products',
        path:`/${path.PRODUCTS}`
    },
    {
        id:3,
        value:'Blog',
        path:`/${path.BLOGS}`
    },
    {
        id:4,
        value:'Our Services',
        path:`/${path.SERVICES}`
    },
     {
        id:5,
        value:'FAQs',
        path:`/${path.FAQs}`
    }
]

export const colors=[
    'black',
    'white',
    'gray',
    'pink',
    'yellow',
    'green',
    'blue',
]

export const adminSidebar=[
    {
        id:1,
        type:'single',
        text:'Dashboard',
        path:`/${path.ADMIN}/${path.DASHBOARD}`,
        icon:<AiOutlineDashboard size={20}/>
    },
    {
        id:2,
        type:'single',
        text:'Manage users',
        path:`/${path.ADMIN}/${path.MANAGE_USER}`,
        icon:<GrGroup color='white' size={20}/>
    },
    {
        id:3,
        type:'parent',
        text:'Manage products',
        icon:<RiProductHuntLine size={20}/>,
        submenu:[
            {
                text:'Create product',
                path:`/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
            },
            {
                text:'Manage products',
                path:`/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
            }
        ]
    },
    {
        id:4,
        type:'single',
        text:'Manage orders',
        path:`/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon:<RiBillLine size={20}/>
    },
]

export const roles=[
    {
        code:1945,
        value:'Admin'
    },
    {
        code:1979,
        value:'User'
    },
]
