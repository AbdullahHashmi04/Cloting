import React, {useContext, useEffect, useState} from 'react'
import images from '../../Images/508-icon.png'
import { CartContext } from '../CartContext';

export default function Vto() {

  const[Image,setImage] = useState("");
  const{ImageVto} = useContext(CartContext);

    const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }; 

  useEffect(()=>{
    console.log(ImageVto[0]?.img)
  },[ImageVto])

  return (
<div className="bg-gray-100 min-h-screen flex items-center justify-center gap-15">

   <div className='relative bg-white h-70 w-70 rounded-3xl border-dashed
    border-black border-2 flex items-center justify-center overflow-hidden'>

{Image ? (<div>
  <img src={Image} alt="No Image Found" className='absolute inset-0 w-full h-full object-cover rounded-3xl'/>
</div>) :

    (<label htmlFor='input-field'>
      <input type="file" accept='image/*' id='input-field' onChange={handleFileChange}  className="bg-gray-500 hidden" />
      <div className='flex items-center justify-center'>
      <img src={images} alt="No Image Found"/>
      </div>
      <p>Drag and drop or click here to upload image</p>
      <span>Upload any images from desktop</span>
    </label>)
}
  </div>
  <div className='font-bold text-2xl' >+</div>

  <div className='relative bg-white h-70 w-70 rounded-3xl border-dashed border-black border-2 flex items-center justify-center'>
    {/* {ImageVto ? (<div>
  <img src={ImageVto} alt="No Image Found" className='absolute inset-0 w-full h-full object-cover rounded-3xl'/>
</div>) : ( <div>Image will be inserted here</div> )} */}

{ImageVto.length > 0 && (
  <img
    src={ImageVto[0].img}
    alt={ImageVto[0].name}
    className="absolute inset-0 w-full h-full object-cover"
  />
)}


  </div>

  <div className='font-bold text-2xl' >=</div>

  <div className='bg-white h-70 w-70 rounded-3xl border-dashed border-black border-2 flex items-center justify-center'>
    Ai Image will be uploaded here.
  </div>

</div>
  )
}