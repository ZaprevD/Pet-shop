import React, { useState, useEffect } from "react";
import { getProductsOnAction } from "../adminFunctions";
import ProductWindow from "./ProductWindow";
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';
const Slider = props => {

    const [productsOnAction, setProductsOnAction] = useState([]);
    const [percentageX, setPercentageX] = useState(0);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProductsOnAction();
        data.forEach((element, i) => {
            element.index = i;
        });
        setProductsOnAction(data);
    }

    const handleNext = e => {
        percentageX === -100 * (productsOnAction.length -1 ) ? setPercentageX(0) : setPercentageX(percentageX - 100);
    }

    const handlePrevius = e => {
        percentageX === 0 ? setPercentageX(-100 * (productsOnAction.length -1)) : setPercentageX(percentageX +100);
    }

    return (
        <div className="cards-slider">
            <div>
                <div className="slide-btns" id="right-btn" onClick={handleNext}>
                    <FaAngleRight className="icon-arrow" />
                </div>
                <div className="slide-btns" id="left-btn" onClick={handlePrevius}>
                    <FaAngleLeft className="icon-arrow" />
                </div>
            </div>
            <div className="cards-slider-wrapper" style={{
                transform: `translateX(${percentageX}%)`
            }}>
                {productsOnAction.map(element => <ProductWindow id={element.id} imgPath={element.Image_path}
                    key={element.Id} name={element.Name} />)}
            </div>
        </div>
    )
}
export default Slider;