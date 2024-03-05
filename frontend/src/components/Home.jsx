import React from 'react'
import { MetaData } from './layout/MetaData'
import { useGetProductsQuery } from '../redux/api/productsApi.js'
import ProductItem from './product/ProductItem.jsx'

export const Home = () => {
  const { data, isLoading } = useGetProductsQuery();

  console.log(data, isLoading);
  
  return (
      <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">Latest Products</h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product={product} />
              ))}
              
              
            </div>
          </section>
        </div>
      </div>
      </>
   
  )
}

export default Home
