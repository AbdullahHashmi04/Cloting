import React from 'react'
import images from '../../Images/508-icon.png'

const vto = () => {
  return (
<div className="bg-gray-100 min-h-screen flex items-center justify-center ">

  <div className='bg-white h-100 w-100 rounded-3xl border-dashed border-black border-2 flex items-center justify-center '>
    <label htmlFor='input-field'>
      <input type="file" accept='image/*' id='input-field' className="bg-gray-500 hidden" />
      <img src={images} alt="No Image Found" className="mx-auto self-center max-w-full max-h-full" />
      <p>Drag and drop or click here to upload image</p>
      <span>Upload any images from dekh</span>
    </label>
  </div>
</div>
  )
}

export default vto
