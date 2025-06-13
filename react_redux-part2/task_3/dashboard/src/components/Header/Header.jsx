import { StyleSheet, css } from "aphrodite";
import logo from "../../assets/holberton-logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const styles = StyleSheet.create({
  header: {
    //display: "inline-flex",
    //alignItems: "center",
    //fontSize: "20px",
    //fontFamily: "sans-serif",
  },
  title: {
    //color: "#e1003c",
    //fontFamily: "'Roboto', sans-serif",
    //fontWeight: "bold",
    //fontSize: "2.5rem",
    //margin: 0,
  },
  logo: {
    //height: "30vmin",
    //pointerEvents: "none",
  },
  logoutSection: {
    //marginLeft: "auto",
    //fontSize: "1rem",
  },
});

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={css(styles.header)}>
      {/* ✅ Correction ici : alt EXACT attendu par le test */}
      <img src={logo} className={css(styles.logo)} alt="Holberton Logo" />
      <h1 className={css(styles.title)}>School Dashboard</h1>
      {isLoggedIn && (
        <div className={css(styles.logoutSection)} id="logoutSection">
          Welcome <b>{user?.email}</b>{" "}
          <a href="#" onClick={handleLogout}>
            (logout)
          </a>
        </div>
      )}
    </div>
  );
}
