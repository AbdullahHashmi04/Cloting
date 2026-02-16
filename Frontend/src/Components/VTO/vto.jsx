import React, {useContext, useEffect, useState} from 'react'
import { CartContext } from '../CartContext';
import axios from "axios"
import Tshirt from "../../Images/Tshirt.jpg"

export default function Vto() {

  const[personImage,setpersonImage] = useState(null);
  const{ImageVto} = useContext(CartContext);
  // const [personFile, setPersonFile] = useState(null);
  // const [clothFile, setClothFile] = useState(null);
  const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setpersonImage(imageUrl);
    }
  };


  const handleTryOn = async () => {
    console.log("Try on is clicked")

    try {
      const formData = new FormData();
      formData.append('personImage', personImage);
      formData.append('productId', ImageVto._id || ImageVto.id);
      
      const userId = localStorage.getItem('userId');
      if (userId) {
        formData.append('userId', userId);
      }

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post("http://localhost:3000/api/tryon/create",
        formData,
        { headers }
      );

      if (response.data.success) {
        setResult(response.data.data.resultImageUrl);
      } else {
        throw new Error(response.data.message || 'Try-on failed');
      }
    } catch (err) {
      console.error('Try-on error:', err);
      // setError(
      //   err.response?.data?.message || 
      //   err.response?.data?.error ||
      //   'Virtual try-on failed. Please try again.'
      // );
    }
  };

  useEffect(()=>{
    {console.log('Image URL:', ImageVto[0].img)}
    console.log("Result generated is : ",ImageVto)
  },[])

  useEffect(()=>{
    console.log(ImageVto[0]?.img)
  },[ImageVto])

  return ( <>
<div className="bg-gray-100 min-h-screen flex items-center justify-center gap-15">

   <div className='relative bg-white h-70 w-70 rounded-3xl border-dashed
    flex items-center justify-center overflow-hidden'>

{personImage ? (
  <img src={personImage} alt="No Image Found" className=" max-h-full object-contain"/>
) :

    (<label htmlFor='input-field'>
      <input type="file" accept='image/*' id='input-field' onChange={handleFileChange}  className="bg-gray-500 hidden" />
       <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Click to upload your photo
                  </p>
                  <span className="text-sm text-gray-500 mb-3">
                    PNG, JPG up to 10MB
                  </span>
                  <span className="text-xs text-gray-400 max-w-xs">
                    💡 Use a clear, front-facing photo for best results
                  </span>
                </div>
    </label>)
}
  </div>
  <div className='font-bold text-2xl' >+</div>

  <div className='relative bg-white h-70 w-70 rounded-3xl border-dashed border-black border-2 flex items-center justify-center'>
{/* {ImageVto.length > 0 && (
  <img
    src={ImageVto[0].img}
    alt={ImageVto[0].name}
    className="max-h-full object-contain"
 
  />
)} */}

<img src={Tshirt} alt="No Image Found" className="max-h-full object-contain" />

  </div>
 <button onClick={handleTryOn} className="bg-amber-950 text-white font-bold w-50 h-10 active:text-amber-50 hover:bg-red-600">Try On</button>
  <div className='font-bold text-2xl' >=</div>

  <div className='bg-white h-70 w-70 rounded-3xl border-dashed border-black border-2 flex items-center justify-center'>
    {result && <img src={result} alt="VTO Result" />}
  </div>

</div>
       <div className="max-w-2xl bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-md">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>📌</span> Tips for Best Results:
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Use a clear, well-lit photo</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Stand straight and face the camera</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Wear fitted clothing for accurate results</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Ensure your full upper body is visible</span>
            </li>
          </ul>
        </div>
</>
  )
}