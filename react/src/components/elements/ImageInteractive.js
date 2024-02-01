import React, { memo } from "react";
import Button from "./Button";

function ImageInteractive({ src, alt, className,handleDeleteImage, handleEditImage, ...rest }) {
    return  <>
        <img className={ className } src={ src } alt={ alt } />
        <div className="list-action d-flex justify-content-around mt-3">
            <div className="mc-table-action">
            {handleEditImage && <Button title="Edit" className="material-icons edit" onClick={handleEditImage}>edit</Button>}
            {handleDeleteImage && <Button title="Delete" className="material-icons delete" onClick={handleDeleteImage}>delete</Button>}
            </div>
        </div></> 
}
export default memo(ImageInteractive);