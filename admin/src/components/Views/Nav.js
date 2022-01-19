import '../../style/Nav.css'
import { Link } from 'react-router-dom'
import { showForm, showChangePassword } from '../Helper/ShowModels'
import { FaCogs, FaUserPlus, FaClipboard, FaUserEdit, FaSignOutAlt, FaUsers } from 'react-icons/fa'
const Nav = ({ name, role }) => {
  const NavMenu = [
    { name: 'All User', icon: <FaUsers className="iconImage" />, link: 'users', allow: true },
    {
      name: 'Complaints',
      icon: <FaClipboard className="iconImage" />,
      link: 'complaints',
      allow: true
    },
    { name: 'Services', icon: <FaCogs className="iconImage" />, link: 'services', allow: true },

    
    { name: 'Edit Profile', icon: <FaUserEdit className="iconImage" />, link: '', allow: true },
    { name: 'Logout', icon: <FaSignOutAlt className="iconImage" />, link: 'logout', allow: true },
    {
      name: 'Add Ranger',
      icon: <FaUserPlus className="iconImage" />,
      link: '',
      allow: role.includes('Create') ? true : false
    },
        { name: 'All Rangers', icon: <FaUsers className="iconImage" />, link: 'rangers', allow: role.includes('Create') ? true : false },
  ]

  return (
    <main className="site-wrapper">
      <div className="pt-table desktop-768 mainDev">
        <div className="pt-tablecell page-home relative styleBack">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                <div className="page-title  home text-center">
                  <h2 className="heading-page"> Welcome Back {name} </h2>
                </div>
                <div className="hexagon-menu clear">
                  {NavMenu.map(
                    (item) =>
                        <div className={item.allow ? "hexagon-item" : "hexagon-item disabledNav" } key={item.name} >
                          <div className="hex-item">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                          <div className="hex-item">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                          <Link
                            to={item.link}
                            className="hex-content"
                            onClick={
                              item.name === 'Edit Profile'
                                ? showChangePassword
                                : item.name === 'Add Ranger'
                                ? showForm
                                : null
                            }
                          >
                            <span className="hex-content-inner">
                              <span className="icon">{item.icon}</span>
                              <span className="title">{item.name}</span>
                            </span>
                            <svg
                              viewBox="0 0 173.20508075688772 200"
                              height="200"
                              width="174"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                                fill="#1e2530"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Nav
