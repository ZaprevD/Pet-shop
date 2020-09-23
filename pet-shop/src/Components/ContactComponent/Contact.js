import React from "react";
import "./contact.css";
const Contact = props => {

    return (
        <div className="contact-view">
            <h1>Контакт</h1>
            <div className="container-90-flex">
                <div className="map-holder">
                    <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1482.9817756202888!2d21.47525341451703!3d41.97959232846036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13543e1e233da809%3A0x32680a8a6b7c1b44!2sVidoe%20Smilevski%20Bato%2014%2C%20Skopje%201000!5e0!3m2!1sen!2smk!4v1600873684191!5m2!1sen!2smk" width="600" height="450" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                </div>
                <div className="contact-info-holder">
                    <h3>Where can I get some?</h3>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                    alteration in some form, by injected humour, or randomised words which don't look even slightly
                    believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there
                    isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators
                    on the Internet tend to repeat predefined chunks as necessary, making this the first true
                    generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful
                    of model sentence structures, to generate Lorem Ipsum which looks reasonable.
                    The generated Lorem Ipsum is therefore always free from repetition, injected humour,
                     or non-characteristic words etc.</p>
                </div>
            </div>
        </div>

    );
};
export default Contact;