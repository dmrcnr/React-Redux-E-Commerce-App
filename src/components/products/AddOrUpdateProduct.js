import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { useParams,useNavigate } from 'react-router-dom';

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  ...props //propları genişlet, fonksiyona üstteki propları da ekliyoruz.
}) {
  
  const [product, setProduct] = useState({ ...props.product }); //Destructing, propslardaki product stateini setProduct ile set edebilirim demek.
  const [errors, setErrors] = useState({})
  useEffect(() => {   
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product }); //stateteki product nesnesini set et. 

  }, [props.product]); //prop.product'ı izle bittiğinde, bitir. Sonsuz döngüye girmesini engellemek için.

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct(previousProduct => ({
      ...previousProduct, //önceki product'ın üzerine yaz.
      [name]: name === "categoryId" ? parseInt(value, 10) : value, //name'de categoryId varsa değeri int'e çevir. Yoksa değeri direk bas.
    }));
    validate(name,value);
  }

  function validate(name,value){
    if (name==="productName" && value===""){
      setErrors(previousErrors=>({...previousErrors,productName:"Product name must be provided."}))
    }else{
      setErrors(previousErrors=>({...previousErrors,productName:""}))
    }
    if (name==="categoryId" && value===""){
      setErrors(previousErrors=>({...previousErrors,categoryId:"Category must be provided."}))
    }else{
      setErrors(previousErrors=>({...previousErrors,categoryId:""}))
    }
  }


  let navigate=useNavigate();
  
  function handleSave(event) {
    event.preventDefault();
    saveProduct(product);
    navigate("/");
  }


  return (
    <div>
      <ProductDetail
        product={product}
        categories={categories}
        onChange={handleChange}
        onSave={handleSave}
        errors={errors}
      ></ProductDetail>
    </div>
  );
}

export function getProductById(products, productId) {
  let product = products.find(product => product.id === parseInt(productId)) || null;
  return product;
}

function useMapStateToProps(state) {
  
  const {productId} = useParams()
  
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
   
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct
};

export default connect(useMapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
