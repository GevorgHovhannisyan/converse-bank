import './slick-slider.scss';

const getImage = (image) => {
  return image;
};

const MainSlider = ({ slide, key, className }) => {
  return (
    <div className="slide_block" key={key}>
      <picture>
        <source
          media="(max-width: 1024px)"
          srcSet={getImage(slide.mobile_image)}
        />
        <img
          src={getImage(slide.image)}
          alt={slide.title}
          title={slide.title}
          width={1920}
          height={540}
        />
      </picture>
      <div className="slide_info">
        <div className="page_container">
          <div className="slide_title">{slide.title}</div>
          <div className="slide_description">{slide.body}</div>
          {slide.url ? (
            <a href={slide.url} rel="noreferrer" target="_blank" className="primary_btn">
              {slide.button}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
