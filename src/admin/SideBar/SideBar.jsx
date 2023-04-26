import "./SideBar.scss";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import AdminProfileDropdown from "../AdminProfileDropdown/AdminProfileDropdown";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    to: "/admin",
    section: "/admin",
  },
  {
    display: "Products",
    icon: <i className="bx bx-star"></i>,
    to: "/admin/product",
    section: "/admin/product",
  },
  {
    display: "Accounts",
    icon: <i className="bx bx-calendar"></i>,
    to: "/admin/account",
    section: "/admin/account",
  },
  {
    display: "Category",
    icon: <i className="bx bx-user"></i>,
    to: "/admin/category",
    section: "/admin/category",
  },
  {
    display: "Brand",
    icon: <i className="bx bx-user"></i>,
    to: "/admin/brand",
    section: "/admin/brand",
  },
  {
    display: "Slider",
    icon: <i className="bx bx-user"></i>,
    to: "/admin/slider",
    section: "/admin/slider",
  },
  {
    display: "Orders",
    icon: <i className="bx bx-receipt"></i>,
    to: "/admin/order",
    section: "/admin/order",
  },
  {
    display: "Posts",
    icon: <i className="bx bx-user"></i>,
    to: "/admin/posts",
    section: "/admin/posts",
  },
];

const Sidebar = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const indicatorRef = useRef(null);
  const burgerRef = useRef(null);
  const stepHeight = 40;

  const handleMenuItemClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const indicator = indicatorRef.current;
    const firstItem = sidebar.querySelector(".sidebar__menu__item");

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(true);
        firstItem.classList.add("active");
        setActiveIndex(0);
        indicator.style.transform = `translateX(-50%) translateY(${
          activeIndex * stepHeight
        }px)`;
      } else {
        setIsMenuOpen(false);
        firstItem.classList.remove("active");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, stepHeight]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={Logo} width={100} alt="" />
        <AdminProfileDropdown/>
      </div>
      <div
        ref={sidebarRef}
        className={`sidebar__menu ${isMenuOpen ? "open" : ""}`}
      >
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              onClick={() => handleMenuItemClick(index)}
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
      <div
        ref={burgerRef}
        className={`burger ${isMenuOpen ? "open" : ""}`}
        onClick={handleMenuToggle}
      >
        <div className="burger__line"></div>
        <div className="burger__line"></div>
        <div className="burger__line"></div>
      </div>
    </div>
  );
}

export default Sidebar;
