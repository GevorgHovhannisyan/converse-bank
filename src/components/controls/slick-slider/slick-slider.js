import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = ({settings,children}) => {
    return (

            <Slick {...settings}>
                {children}
            </Slick>

    )
}

export default SlickSlider