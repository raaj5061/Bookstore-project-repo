import { FaStar } from "react-icons/fa";
 import '../styles/Stars.css'
type StarsProps={
  value: number;
  onChange: (newRating: number)=> void;
}
 
function Stars({value, onChange}: StarsProps) {
 
  return (
    <>
    {[...Array(5)].map((_star, index)=>{
        const ratingValue = index+1;
       
        return(
            <label>
                <input type="radio" name="rating" value={ratingValue} onClick={()=>onChange(ratingValue)} style={{display:'none'}}/>
                <FaStar key={index} className="star" color={ratingValue <= value ? "#ffc107" : "#e4e5e9 "} />
            </label>
        );
    })}
    </>
  )
}
 
export default Stars
 