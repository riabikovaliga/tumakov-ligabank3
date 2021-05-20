import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoginButton from "../login-button/login-button";
import CloseButton from "../close-button/close-button";
import "./navigation.scss";

const ESC_KEY = "Escape";
const TABLET_WIDTH = 768;

const Navigation = (props) => {
  const { className } = props;
  const [isMenuHidden, setMenuHidden] = useState(true);

  const handleMenuClick = () => {
    setMenuHidden(!isMenuHidden);
  };

  const handleCloseClick = () => {
    setMenuHidden(true);
  };

  const handleLoginClick = () => {
    setMenuHidden(true);
  };

  const escKeydownHandler = useCallback(
    (evt) => {
      evt.key === ESC_KEY && setMenuHidden(true);
    },
    [setMenuHidden]
  );

  const resizeHandler = () => {
    window.innerWidth >= TABLET_WIDTH && setMenuHidden(true);
  };

  useEffect(() => {
    if (!isMenuHidden) {
      window.addEventListener("keydown", escKeydownHandler);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", escKeydownHandler);
      document.body.style.overflow = "auto";
    }

    return () => window.removeEventListener("keydown", escKeydownHandler);
  }, [isMenuHidden, escKeydownHandler]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className={`navigation ${className}`}>
      <button
        className="navigation__menu"
        type="button"
        aria-label="Меню"
        onClick={handleMenuClick}
      ></button>
      <ul
        className={`navigation__list ${
          isMenuHidden && "navigation__list--hidden"
        }`}
      >
        <li className="navigation__item">
          <Link className="navigation__link" to="#">
            Услуги
          </Link>
        </li>
        <li className="navigation__item">
          <Link className="navigation__link" to="#">
            Рассчитать кредит
          </Link>
        </li>
        <li className="navigation__item">
          <Link className="navigation__link" to="#">
            Конвертер валют
          </Link>
        </li>
        <li className="navigation__item">
          <Link className="navigation__link" to="#">
            Контакты
          </Link>
        </li>
        <li className="navigation__item navigation__item--login">
          <LoginButton
            className="navigation__login"
            clickHandler={handleLoginClick}
          />
        </li>
      </ul>
      {isMenuHidden ? (
        <LoginButton className="navigation__login navigation__login--mobile login-button--mobile" />
      ) : (
        <CloseButton
          className="navigation__close"
          clickHandler={handleCloseClick}
        />
      )}
    </div>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
};

export default Navigation;
