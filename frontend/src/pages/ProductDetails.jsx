import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function ProductDetails(){

  const { id } = useParams()

  const [product,setProduct] = useState(null)

  const fetchProduct = async () => {

    try{

      const res = await API.get(`/products/${id}`)

      setProduct(res.data)

    }catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    fetchProduct()
  },[])

  if(!product) return <h2>Loading...</h2>

  return(

    <div>

      <h1>{product.name}</h1>

      {product.images?.map((img,index)=>(
        <img key={index} src={img} width="200" />
      ))}

      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>

      {product.brand && (
        <p>Brand: {product.brand.name}</p>
      )}

    </div>

  )

}

export default ProductDetails