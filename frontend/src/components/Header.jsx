import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link lassName="logo" to="/">
          <h4>GoalSetter</h4>
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn btn-reverse" onClick={onLogout}>
              <FaSignOutAlt />
              <h5>Logout</h5>
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> <h5>Login</h5>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> <h5>Register</h5>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
