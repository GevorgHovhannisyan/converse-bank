import SlickSlider from '../controls/slick-slider';
import { BlogItem } from './blogComponents';
import { skHomeBlogLoading, } from '../../redux/slices/blog/blog';
import { useSelector } from 'react-redux';
import CreateSkeleton from '../hoc/skeleton';

const HomeBlogComponent = ({ blogs, targetBlank }) => {
  const blogSliderSettings = {
    slidesToShow: 3,
    className: 'blog_slider',
    touchThreshold: 40,
    infinite: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 667,
        settings: {
          slidesToShow: 1.5,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const skBlogLoading = useSelector(skHomeBlogLoading,);

  return skBlogLoading && !blogs.length ? (
    <CreateSkeleton span={true} number={3} />
  ) : (
    <SlickSlider settings={blogSliderSettings}>
      {blogs.map((blog, index) => {
        return <BlogItem blog={blog} key={index} index={index} targetBlank={targetBlank} />;
      })}
    </SlickSlider>
  );
};

export default HomeBlogComponent;
