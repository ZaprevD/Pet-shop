import React from "react";

const ProductWindow = props => {

    const style = {
        backgroundImage: `url(${require(`../../../public/products-images/` + props.imgPath)})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    return (
        <div className="product-image-holder-slide">
            <div style={style} className="image-example"></div>
        </div>
    )

}

export default ProductWindow;