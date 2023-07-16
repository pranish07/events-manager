import { useNavigate } from "react-router-dom";
import meetup from "../../assets/meetup.svg";
import { useEvent } from "../../context/EventContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useEvent();
  return (
    <div>
      <img src={meetup} alt="meetup" onClick={() => navigate("/")} />

      <input
        type="text"
        placeholder="Search by tags and title..."
        onChange={(event) =>
          dispatch({ type: "SEARCH_BY", payload: event.target.value })
        }
      />
      <hr />
    </div>
  );
};
