//footer about menu
const FooterMenuItem = ({item}) => {
    return (
        <li>
            <a rel="noreferrer" target={item.target === '_blank'?'_blank':null} href={item.url}>{item.title}</a>
        </li>
    );
};
//footer about menu

//Socials block
const SocialsMenuItem = ({item}) => {
    return (
        <li>
            <a rel="noreferrer" target={'_blank'?'_blank':null} href={item.url} className={item.class}>{item.title}</a>
        </li>
    );
};
//Socials block

//footer all menu
const FooterMenuItemList = ({item}) => {
    return (
        <li>
            <a rel="noreferrer" target={item.target === '_blank'?'_blank':null} href={item.url}>{item.title}</a>
        </li>
    );
};
//footer all menu


//footer all menu
const PartnersItemList = ({item}) => {
    return (
        <a href={item.url} rel="noreferrer" target="_blank">
            <img src={item.image}  alt=" " width="38" height="49" title=" " />
        </a>
    );
};
//footer all menu



export {FooterMenuItem, SocialsMenuItem,FooterMenuItemList,PartnersItemList};