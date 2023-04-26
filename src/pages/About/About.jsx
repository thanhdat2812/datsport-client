import React from "react";
import LogoSquare from "../../assets/images/logoSquare.jpg";
const About = () => {
  return (
    <React.Fragment>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <div className="row mb-4">
            <div className="col-md-6"><img src={LogoSquare} width='80%' alt="logo" /></div>
            <div className="col-md-6">
              <h1 class="display-3">About Us</h1>
              <p class="lead">
                Everything we do is rooted in sport. Sport plays an increasingly
                important role in more and more people’s lives, on and off the
                field of play. It is central to every culture and society and is
                core to our health and happiness. Key to our success are our
                people and our culture. They bring our identity to life, defined
                by our purpose, mission, and attitude.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 class="display-3">Our Story</h1>
              <p class="lead">
                Our purpose, ‘through sport, we have the power to change lives’,
                guides the way we run our company, how we work with our
                partners, how we create our products, and how we engage with our
                consumers. We will always strive to expand the limits of human
                possibilities, to include and unite people in sport, and to
                create a more sustainable world. To experience how our employees
                and partners are driving change through purpose – and how you
                can find purpose,
              </p>
            </div>
            <div className="col-md-6 d-none d-md-block"><img src={LogoSquare} width='80%' alt="logo" /></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
