import React from "react";
import { Link } from "react-router-dom";

export default function Anchor({ onClick, className, target, href, icon, iconClass, text, badge, arrow, children, ...rest }) {
    return (
        <Link to={ href || "#" } target={ target } onClick={ onClick } className={ className } {...rest}>
            { icon || iconClass ? <i className={ iconClass || "material-icons" }>{ icon }</i> : <></> }
            { text && <span>{ text }</span> }
            { badge && <sup className={ badge.variant }>{ badge.text }</sup> }
            { arrow && <small className="material-icons">{ arrow }</small>}
            { children }
        </Link>
    )
}