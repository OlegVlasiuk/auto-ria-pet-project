import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { signInWithPopup, signOut, getAuth } from 'firebase/auth';
import classNames from 'classnames';
import { Button } from 'antd';
import {
  LogoutOutlined,
  GoogleOutlined,
  StarOutlined,
} from '@ant-design/icons';

import { provider } from '../../API/firebase';
import { updateUser, resetUser } from '../../store/actions';

import styles from './NavBar.module.scss';

const Navbar = () => {
  const [isDynamic, setIsDynamic] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const auth = getAuth();

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 40;
      if (show) {
        setIsDynamic(true);
      } else {
        setIsDynamic(false);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      updateUser(user.uid);
    }
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        updateUser(user.uid);
        setCurrentUser(user);
        window.localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const logOutFromProfile = () => {
    signOut(auth)
      .then(() => {
        resetUser();
        setCurrentUser({});
        window.localStorage.removeItem('user');
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <div
      className={classNames(styles.header, styles.static, {
        [styles.dynamic]: isDynamic,
      })}
    >
      <div
        className={classNames(styles.space, {
          [styles.dynamic]: isDynamic,
        })}
      >
        <div>
          <NavLink to="/">
            <span>Головна</span>
          </NavLink>
        </div>
        {Object.keys(currentUser).length ? (
          <>
            <div className={styles.userInfo}>
              <NavLink to="/favorites">
                <StarOutlined />
              </NavLink>
              {currentUser.displayName}
              <img src={currentUser.photoURL} alt="" />
              <LogoutOutlined
                className={styles.logout}
                onClick={logOutFromProfile}
              />
            </div>
          </>
        ) : (
          <Button type={'ghost'} onClick={signInWithGoogle}>
            Увійти
            <GoogleOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
