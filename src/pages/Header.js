import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { searchPersons } from "../redux/features/personSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { staff } = useSelector((state) => ({ ...state.auth }));
  // const username = staff.result.name
  // console.log('staff', staff.result.name)
  const handleLogout = () => {
    dispatch(setLogout());
  };

  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('e', e)
    if (search) {
      dispatch(searchPersons(search));
      navigate(`/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/skw_home");
    }

  }

  return (
    <header className="main-header navbar">
      <div className="col-search">
        <form onSubmit={handleSubmit} className="searchform" >
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search cFname"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-light bg" type="submit">
              <i className="far fa-search"></i>
            </button>
          </div>
          {/* <datalist id="search_terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="Ahmed Hassan" />
          </datalist> */}
        </form>
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="nav-item">
            <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
              <i className="fas fa-moon"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              English
            </Link>
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="/images/user1.png"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              {/* <Link className="dropdown-item" to="/">
                My profile
              </Link>
              <Link className="dropdown-item" to="#">
                Settings
              </Link> */}
              <Link
                onClick={handleLogout}
                className="dropdown-item text-danger"
              >
                Exit
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
