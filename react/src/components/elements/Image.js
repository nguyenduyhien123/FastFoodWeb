import React from "react";

export default function Image({ src, alt, className,interactive, ...rest }) {
    return <>
    {interactive ? <><div>
        <img className={ className } src={ src } alt={ alt } />
        <div className="list-action">
        <i className={ "material-icons" }>edit</i>
        <i className={ "material-icons" }>delete</i>
        </div>
        </div></> : <img className={ className } src={ src } alt={ alt } />}
    </>
}