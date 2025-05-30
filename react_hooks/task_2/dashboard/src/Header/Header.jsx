import { useContext } from "react";
import { StyleSheet, css } from "aphrodite";
import holbertonLogo from "../assets/holberton-logo.jpg";
import AppContext from "../Context/context";

const Header = () => {
  const { user, logOut } = useContext(AppContext);

  return (
    <div className={css(styles.header)}>
      <img
        src={holbertonLogo}
        className={css(styles.logo)}
        alt="holberton logo"
      />
      <h1 className={css(styles.title)}>School dashboard</h1>

      {user.isLoggedIn && (
        <section
          id="logoutSection"
          className={css(styles.logoutSection)}
          data-testid="logoutSection"
        >
          <p>
            Welcome <strong>{user.email}</strong>{" "}
            <a href="#" onClick={logOut}>
              (logout)
            </a>
          </p>
        </section>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "3px solid #e1003c",
    padding: "20px",
  },
  logo: {
    height: "150px",
    marginRight: "20px",
  },
  title: {
    color: "#e1003c",
    fontSize: "2rem",
  },
  logoutSection: {
    fontStyle: "italic",
    fontSize: "1rem",
  },
});

export default Header;
