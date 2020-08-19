import React from 'react';
import './Styles/Landing.css'
import Link from '@material-ui/core/Link';

const Landing = () => (
    <div className="Hero">
        <div className="HeroGroup">
            <div className="HeroSlogan">
                <h1>Yummi it.</h1>
            </div>
            <h1 className="HeroGroupText">Find all the recipes you need with just a click.</h1>
            {/* <p className="HeroGroupText2">All your recipes are within reach</p> */}
            <Link  href="/signup">
                <h2 className="HeroGroupText2">Click to Sign Up</h2>
            </Link>
        </div>
    </div>
)

export default Landing;
