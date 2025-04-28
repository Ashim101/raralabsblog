import { useNavigate } from "react-router-dom"

const Logo = () => {
  const navigate=useNavigate()
  return (
    <div className="text-textblack cursor-pointer" onClick={()=>navigate("/")}>Logo</div>
  )
}

export default Logo