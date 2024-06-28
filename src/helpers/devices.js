import {useMediaQuery} from 'react-responsive';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1025 });
    return isDesktop ? children : null
};

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 1024 });
    return isMobile ? children : null
};

export {
    Desktop,
    Mobile,
}