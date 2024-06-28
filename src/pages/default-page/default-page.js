// import {wrapTable} from "../../helpers/Utils";

const DefaultPage = ({page}) => {
    if(!page)
        return false;// can be static info page under construction
    // const wrappedData = wrapTable(page.body);

    return (
        // <div className="standard_text" dangerouslySetInnerHTML={{__html: wrappedData}}/>
        <h1>Default page</h1>
    )
}

export default DefaultPage;