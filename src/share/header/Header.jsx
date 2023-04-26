import "./Header.scss";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import brandApi from "../../api/brand";
import categoryApi from "../../api/category";
import Logo from "../../assets/images/logo.png";

import ProfileDropdown from "./profile_dropdown/ProfileDropdown";
import CartDropdown from "./cart_dropdown/CartDropdown";
import SearchOption from "./search_option/SearchOption";

import { BiCaretDown } from "react-icons/bi";

const Header = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataBrands, setDataBrands] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const categoryDropdownToggle = () =>
    setCategoryDropdownOpen(!categoryDropdownOpen);
  const brandDropdownToggle = () => setBrandDropdownOpen(!brandDropdownOpen);

  const getAllDataCategory = async () => {
    try {
      const rsData = await categoryApi.getAll(1);
      setDataCategory(rsData);
    } catch (error) {
      return error;
    }
  };

  const getAllDataBrand = async () => {
    try {
      const rsData = await brandApi.getAll(1);
      setDataBrands(rsData);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    getAllDataCategory();
    getAllDataBrand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // call api

  return (
    <div className="header">
      <Navbar style={{ backgroundColor: "#fff" }} expand="lg">
        <NavbarBrand href="#">
          <div className="logo-wrapper" onClick={() => navigate("/home")}>
            <img className="logo" width={70} src={Logo} alt="logo web app" />
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="collapse-nav">
          <Nav
            className="me-auto flex-grow-1 justify-content-evenlys order-2 order-lg-0"
            navbar
          >
            <NavItem>
              <NavLink active>
                <Link to={"/"}>
                  <h4>Home</h4>
                </Link>
              </NavLink>
            </NavItem>

            <Dropdown
              nav
              isOpen={categoryDropdownOpen}
              toggle={categoryDropdownToggle}
            >
              <DropdownToggle nav>
                <h4>
                  Categories <BiCaretDown />
                </h4>
              </DropdownToggle>
              <DropdownMenu>
                {dataCategory.map((category, idx) => (
                  <Link
                    key={idx}
                    to={`/product-listing/${category.categoryId}`}
                  >
                    <DropdownItem>{category.categoryName}</DropdownItem>{" "}
                  </Link>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown
              nav
              isOpen={brandDropdownOpen}
              toggle={brandDropdownToggle}
            >
              <DropdownToggle nav>
                <h4>
                  Brands <BiCaretDown />
                </h4>
              </DropdownToggle>
              <DropdownMenu>
                {dataBrands.map((brand, idx) => (
                  <Link key={idx} to={`/product-listing/${brand.brand_id}`}>
                    <DropdownItem>{brand.brand_name}</DropdownItem>{" "}
                  </Link>
                ))}
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink>
                <Link to={"/post"}>
                  <h4>Posts</h4>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to={"/about"}>
                  <h4>About</h4>
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
          <div className="d-flex flex-grow-1 options">
            <div className="flex-grow-1 order-xs-0 order-lg-1">
              <SearchOption />
            </div>
            <div className="d-flex  nav-options order-xs-1 order-lg-2">
              <CartDropdown />
              <ProfileDropdown />
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
