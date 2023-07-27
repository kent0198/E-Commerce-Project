import icons from "./icons"
const {AiOutlineStar,AiFillStar}=icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split(' ').join('-')
export const formatMoney =number=>Number(number?.toFixed(1)).toLocaleString()    


export const renderStarFromNumber=(number,size)=>{
    //4=>[1,1,1,1,0]
    const starts=[]
    if(!Number(number)) return 
    for (let i = 0 ; i <+number;i++) starts.push(<AiFillStar className="text-amber-400" size={size||16}/>)
    for (let i = 5 ; i >+number;i--) starts.push(<AiOutlineStar className="text-amber-400" size={size||16}/>)

    return starts
}