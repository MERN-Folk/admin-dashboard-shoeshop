import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";

const Sidebar = () => {
  const [staffName, setStaffName] = useState("");
  const dispatch = useDispatch();
  const { staff } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if (staff) {
      const name = staff?.result?.name;
      setStaffName(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff]);

  // console.log(staffData);
  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/admin.png"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          {staffName}
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          {staffName === "Admin" && (
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/admin_home"
                // exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/manage_staff"
              >
                <i className="icon fas fa-users"></i>
                <span className="text">Manage Staff</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/addCpro"
              >
                <i className="icon fas fa-user"></i>
                <span className="text"> Add Cpro</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/addGroup"
              >
                <i className="icon fas fa-user-friends"></i>
                <span className="text"> Add Group</span>
              </NavLink>
            </li>
            
            <li className="menu-item">
              <NavLink
                onClick={handleLogout}
                // activeClassName="active"
                className="menu-link"
                to="/a"
              >
                <i className="icon fas fa-shoe-prints"></i>
                <span className="text">{staffName} Logout</span>
              </NavLink>
            </li>
          </ul>
          )}
          {(staffName === "Skw" || staffName === "Skw301") && (
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/skw_home"
                // exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">กลุ่ม อรัญประเทศ</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/aaa"
              >
                <i className="icon fas fa-users"></i>
                <span className="text">กลุ่ม อรัญประเทศ</span>
              </NavLink>
            </li> */}
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/skw301_home"
              >
                <i className="icon fas fa-users"></i>
                <span className="text">ซิ่นเต๋อ</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/addproduct"
              >
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Add product</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/category"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Categories</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Orders</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Users</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link disabled"
                to="/sellers"
              >
                <i className="icon fas fa-store-alt"></i>
                <span className="text">Sellers</span>
              </NavLink>
            </li> */}

            <li className="menu-item">
              <NavLink
                onClick={handleLogout}
                // activeClassName="active"
                className="menu-link"
                to="/a"
              >
                <i className="icon fas fa-shoe-prints"></i>
                <span className="text">{staffName} Logout</span>
              </NavLink>
            </li>
          </ul>
          )}
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
