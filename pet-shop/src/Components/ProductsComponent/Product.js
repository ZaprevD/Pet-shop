import React from "react";

const Product = props => {

    const style = {
        backgroundImage: `url(${require(`../../../public/products-images/` + props.picture)})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    return (
        <div className="product-holder-box">
            <div className="product-cart-header">
                <h4>{props.name}</h4>
            </div>
            <div className="product-info-holder">
                <div className="box-50">
                    <div style={style} className="product-image-holder">

                    </div>
                </div>
                <div className="box-45-hover">
                    <div className="text-holder">
                        <p>{props.desc}</p>
                    </div>
                    <div className="price-holder">
                        <h4>Цена: {props.price} Ден</h4>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Product;