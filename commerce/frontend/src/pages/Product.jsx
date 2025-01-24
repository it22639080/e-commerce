import React , {useContext} from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumps from "../components/Breadcrumps/Breadcrumps";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RealtedProducts/RelatedProducts";

const Product =()=>{
    const {all_product}= useContext(ShopContext);
    const {productId}= useParams();
    const product= all_product.find((e)=> e.id===Number(productId)

    )
    return (
        <div>
          <Breadcrumps product={product}/>
          <ProductDisplay product= {product}/>
          <DescriptionBox/>
          <RelatedProducts/>

        </div>
    )
}

export default Product;