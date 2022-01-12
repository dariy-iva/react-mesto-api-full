import React from "react";
import successRegistImg from "../images/successRegist.svg";
import errorRegistImg from "../images/errorRegist.svg";

export default function InfoTooltipPopup(props) {
  const { isOpen, onClose, statusRegist } = props;
  const textInfo = statusRegist
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img
          src={statusRegist ? successRegistImg : errorRegistImg}
          alt={statusRegist ? "Успешная регистрация" : "Ошибка регистрации"}
          className="popup__img-status-regist"
        />
        <p className="popup__caption-status-regist">{textInfo}</p>
        <button type="button" className="popup__reset-button" onClick={onClose} />
      </div>
    </div>
  );
}
