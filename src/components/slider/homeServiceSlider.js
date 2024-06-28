import './slick-slider.scss';

const getImage = (image) => {
  return image;
};

const HomeServiceSlider = ({ slider }) => {
  return (
    <div className="slide_block">
      <a href={slider.url} rel='noreferrer' target="_blank" className="inner_slider">
        <span className="slide_img">
          {slider.image && (
            <img
              src={getImage(slider.image)}
              alt={slider.title}
              width={184}
              height={117}
            />
          )}
        </span>
        <span className="slide_info">
          <span className="slide_title icon_services">{slider.title}</span>
          <span className="slide_summary">{slider.summary}</span>
        </span>
      </a>
    </div>
  );
};

export default HomeServiceSlider;
