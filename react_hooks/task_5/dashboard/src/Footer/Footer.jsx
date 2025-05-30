import { useContext } from "react";
import { StyleSheet, css } from "aphrodite";
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import AppContext from "../Context/context";

export default function Footer() {
  const { user } = useContext(AppContext); // 👈 consomme le contexte

  return (
    <div className={css(styles.footer)}>
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
      {user.isLoggedIn && (
        <p id="logoutSection">
          <a href="#">Contact us</a>
        </p>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    textAlign: "center",
    fontStyle: "italic",
    borderTop: "3px solid #e11d3f",
    padding: "1rem 0",
  },
});
