import React, { useState, useEffect } from "react";
import { getProductsOnAction } from "../adminFunctions";
import ProductWindow from "./ProductWindow";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Loader, ErrorWindow } from "../Helper";

const Slider = props => {

    const [productsOnAction, setProductsOnAction] = useState([]);
    const [percentageX, setPercentageX] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const res = await getProductsOnAction();
        if (res.status === 200) {
            res.data.forEach((element, i) => {
                element.index = i;
            });
            setProductsOnAction(res.data);
            setLoading(false);
        } else {
            setError(`Настана серверска грешка ве молам обидетесе подоцна!`);
            setLoading(false);
        }

    }

    const handleNext = e => {
        percentageX === -100 * (productsOnAction.length - 1) ? setPercentageX(0) : setPercentageX(percentageX - 100);
    }

    const handlePrevius = e => {
        percentageX === 0 ? setPercentageX(-100 * (productsOnAction.length - 1)) : setPercentageX(percentageX + 100);
    }

    const hideErr = () => setError("");

    return (
        <React.Fragment>
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideErr} /> : null}
            {loading ? <Loader /> :
                <div className="cards-slider">
                    {productsOnAction.length !== 0 ?
                        <div>
                            <div  className="slide-btns" id="right-btn" onClick={handleNext}>
                                <FaAngleRight className="icon-arrow" />
                            </div>
                            <div className="slide-btns" id="left-btn" onClick={handlePrevius}>
                                <FaAngleLeft className="icon-arrow" />
                            </div>
                        </div>
                        : <div className="home-view-message">
                            <h3>Моментално нема производи на акција</h3>
                        </div>}
                    <div className="cards-slider-wrapper" style={{
                        transform: `translateX(${percentageX}%)`
                    }}>
                        {productsOnAction.map(element => <ProductWindow id={element.id} imgPath={element.Image_path}
                            key={element.Id} name={element.Name} />)}
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
export default Slider;