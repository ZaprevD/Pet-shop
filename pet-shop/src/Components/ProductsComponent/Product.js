import React from "react";

const Product = props => {

    return (
        <div className="product-holder">
            <div className="box-45">
                <div className="image-holder">

                </div>
            </div>
            <div className="box-45">
                <div className="text-holder">
                    <h3>{props.desc}</h3>
                </div>
                <div className="price-holder">
                    <h4>{props.price}</h4>
                </div>
            </div>
        </div>
    )

}

export default Product;