import React from 'react';
import Slider from 'react-slick';



// import './style.css';

const ImageSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'theClass',
    arrows: false
  };

  return (

    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main class="flex-grow">
    <section>
      <div
        id="slider-container"
        className="max-w-lg mx-auto 
    mt-12"
      >
        <Slider {...settings}>
          <article
            style={{ display: 'grid !important' }}
            className="shadow-2xl drop-shadow-xl w-80  p-6 rounded-lg  gap-2"
          >
            <h2 class="text-2xl font-bold">Extremely talented Individuals</h2>
            <p class="text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eligendi sunt voluptatum exercitationem nesciunt? Dolore, porro
              ipsum sit aut explicabo beatae eos voluptas commodi esse vel
              reprehenderit voluptate distinctio quae pariatur.
            </p>
            <span className="text-lg text-gray-700 font-semibold">John Doe</span>
          </article>
          <article
            style={{ display: 'grid !important' }}
            className="shadow-2xl drop-shadow-xl w-80  p-5 rounded-lg  gap-2"
          >
            <h2 className="text-2xl font-bold">
              Such Professionalism are encouraged
            </h2>
            <p className="text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Tempore, quis perspiciatis. Voluptatum accusamus quasi tenetur
              dolore sequi repellat iusto ea, repellendus doloremque rem modi
              magnam sunt quo, pariatur perferendis delectus dolor reiciendis
              eligendi odit. Inventore delectus deseru
            </p>
            <span className="text-lg text-gray-700 font-semibold">Jane Doe</span>
          </article>
        </Slider>
      </div>
    </section>
    </main>
  </div>
  );
}

export default ImageSlider
