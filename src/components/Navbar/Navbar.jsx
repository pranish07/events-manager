import { useNavigate } from "react-router-dom";
import meetup from "../../assets/meetup.svg";
import { useEvent } from "../../context/EventContext";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useEvent();
  return (
    <div>
    <div className="navbar-container">
      <div className="nav-img">
        <img src={meetup} alt="meetup" onClick={() => navigate("/")} />
      </div>
      <div className="nav-search">
      {/* <box-icon name='search' type="regular"  size="sm" className="search-icon"></box-icon> */}
        <input
          type="text"
          placeholder="Search by tags and title..."
          onChange={(event) =>
            dispatch({ type: "SEARCH_BY", payload: event.target.value })
          }
        />
      </div>
      </div>
      <hr />
    </div>
  );
};
