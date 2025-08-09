import './NavBar.css'

const NavBar = () =>{

    return (
  <div className="navbar-container">
    <div className="top-section">
      <div className="start-items">
        <i className="fa-solid fa-message"></i>
        <i className="fa-solid fa-circle-dot"></i>
        <i className="fa-regular fa-comment-dots"></i>
        <i className="fa-solid fa-people-group"></i>
      </div>
      <div className="middle-items">
        <i className="fa-regular fa-circle fa-rotate-180" style={{color: "#5152b8"}}></i>
      </div>
    </div>

    <div className="end-items">
      <i className="fa-solid fa-gear"></i>
      <i className="fa-regular fa-user"></i>
    </div>
  </div>
)

}

export const MobileFooter = () => (
  <div className="mobile-footer">
    <i className="fa-solid fa-message"></i>
    <i className="fa-solid fa-circle-dot"></i>
    <i className="fa-regular fa-comment-dots"></i>
    <i className="fa-solid fa-people-group"></i>
  </div>
);


export default NavBar