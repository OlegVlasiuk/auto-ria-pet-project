import React from "react";
import { Button } from "antd";

import styles from "./Header.module.scss";

const Header = () => {
  const handleScroll = () =>
    window.scroll({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Пошук авто за допомогою API AUTO.RIA </h1>
        <Button
          ghost
          className={styles.btn}
          size="large"
          onClick={handleScroll}
        >
          Розпочати
        </Button>
      </div>
    </div>
  );
};
export default Header;
