import './Navigation.scss';
const navLinks = [
    {
           display: 'Home',
           url: '#'
    },
    {
           display: 'About',
           url: '/about'
    },
    {
           display: 'Menu',
           url: '#'
    },
    {
           display: 'Recipes',
           url: '#'
    },
    {
           display: 'Contact',
           url: '#'
    },
]
export const Navigation = () => {
    return <div className="navigation-container">
                                          <div className="nav_list_wrapper d-flex align-items-center gap-5">
                                                 <ul className="nav_list">

                                                        {
                                                               navLinks.map((item, index) => (
                                                                      <li className="nav_item" key={index}><a href={item.url} >{item.display}</a></li>
                                                               ))
                                                        }

                                                 </ul>
                                          </div>
    </div>
}