import React, { useState, useEffect } from "react";
import { getProductsOnAction } from "../adminFunctions";
import ProductWindow from "./ProductWindow";

const Slider = props => {

    const [productsOnAction, setProductsOnAction] = useState([]);
    const [property, setProperty] = useState({});

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProductsOnAction();
        data.forEach((element, i) => {
            element.index = i;
        });
        setProductsOnAction(data);
        setProperty(data[0]);
    }



    const handleNext = () => {
        const newIndex = property.index + 1;
        if (productsOnAction[newIndex] !== undefined) {
            setProperty(productsOnAction[newIndex]);
        } else {
            setProperty(productsOnAction[0]);
        }

    }
    const handlePrevius = () => {
        const newIndex = property.index - 1;
        if (productsOnAction[newIndex] !== undefined) {
            setProperty(productsOnAction[newIndex]);
        } else {
            setProperty(productsOnAction[productsOnAction.length - 1]);
        }
    }

    return (
        <div className="cards-slider">
            <button onClick={handleNext}>Next</button>
            <button onClick={handlePrevius}>Prev</button>
            <div className="cards-slider-wrapper" style={{
                transform: `translateX(-${property.index * (100 / productsOnAction.length + 78.5)}%)`
            }}>
                {productsOnAction.map(element => <ProductWindow id={element.id} imgPath={element.Image_path}
                 key={element.Id} name={element.Name} />)}
            </div>
        </div>
    )

}

export default Slider;