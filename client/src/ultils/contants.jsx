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
        value:'PRODUCTS',
        path:`/${path.PRODUCTS}`
    },
    {
        id:3,
        value:'BLOGS',
        path:`/${path.BLOGS}`
    },
    {
        id:4,
        value:'OUR SERVICES',
        path:`/${path.SERVICES}`
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

export const blockStatus=[
    {
        code:true, 
        value:'Blocked'
    },
    {
        code:false, 
        value:'Active'
    }
]

export const memberSideBar=[
    {
        id:1,
        type:'single',
        text:'Personal',
        path:`/${path.MEMBER}/${path.PERSONAL}`,
        icon:<AiOutlineDashboard size={20}/>
    },
    {
        id:2,
        type:'single',
        text:'My Cart',
        path:`/${path.MEMBER}/${path.MY_CART}`,
        icon:<GrGroup color='white' size={20}/>
    },
    {
        id:3,
        type:'single',
        text:'Wishlist',
        path:`/${path.MEMBER}/${path.WISHLIST}`,
        icon:<RiProductHuntLine size={20}/>,
    },
    {
        id:4,
        type:'single',
        text:'Buy histories',
        path:`/${path.MEMBER}/${path.HISTORY}`,
        icon:<RiBillLine size={20}/>
    },
]


export const services=[
    {
        id:1,
        img:'https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711',
        title:'Customizable Page',
        desc:'Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora'
    },
    {
        id:2,
        img:'https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656',
        title:'Revolution Slider',
        desc:'Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora'
    },
    {
        id:3,
        img:'https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677',
        title:'Drag & Drop Page',
        desc:'Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora'
    },
    {
        id:4,
        img:'https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656',
        title:'Revolution Slider',
        desc:'Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora'
    },
    {
        id:5,
        img:'https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677',
        title:'Drag & Drop Page',
        desc:'Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora'
    },
    {
        id:6,
        img:'https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711',
        title:'Customizable Page',
        desc:'Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora'
    },
]
