import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby godard blog plaid fingerstache stumptown kickstarter
            jianbing, everyday carry truffaut tote bag dreamcatcher tilde.
            Knausgaard microdosing neutra health goth, shaman gluten-free
            organic selvage put a bird on it 3 wolf moon leggings. Keffiyeh deep
            v yr, locavore tousled farm-to-table keytar activated charcoal
            coloring book. Echo park 8-bit pabst kickstarter af sartorial. Lo-fi
            leggings VHS, palo santo try-hard normcore tbh sartorial af pop-up.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
