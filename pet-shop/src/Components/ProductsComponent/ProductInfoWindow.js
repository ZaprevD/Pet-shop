import React  from "react";
import { useLocation, withRouter } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
const ProductInfoWindow = props => {

    let location = useLocation();

    const style = {
        display: "none"
    };

    let style1 = null;

    if (location.state !== undefined && location.state !== null) {
        style1 = {
            backgroundImage: `url(${require(`../../../public/products-images/` + location.state.Image_path)})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
        };
    };

    const goBack = () => props.history.goBack();

    return (
        <div style={isNaN(parseInt(location.pathname.charAt(location.pathname.length - 1))) ? style : null} className="product-info-window-holder">
            <div className="product-info-window-header">
                <h2> {location.state ? location.state.Name : ""} </h2>
                <div onClick={goBack} className="close-box-holder">
                    <FaRegWindowClose className="close-icon" />
                </div>
            </div>
            <div className="box-100-flex">
                <div className="box-50">
                    <div className="image-box-window">
                        <div className="img-img" style={style1}></div>
                    </div>
                </div>
                <div className="box-50">
                    <div className="description-box">
                        <p>{location.state ? location.state.Description : null}</p>
                    </div>
                    <div className="price-box">
                        <h3>Цена:  {location.state ? location.state.Price + ' Ден' : null}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default withRouter(ProductInfoWindow);