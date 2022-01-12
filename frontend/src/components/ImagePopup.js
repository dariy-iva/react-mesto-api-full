import React from "react";

export default function ImagePopup(props) {
  const { isOpen, card, onClose } = props;
  return (
    <div
      className={`popup popup_content_photo ${isOpen && "popup_opened"}`}
      id="popup-open-photo"
    >
      <div className="popup__photo-box">
        <img
          src={card ? card.link : "#"}
          alt={card ? card.name : ""}
          className="popup__photo"
        />
        <p className="popup__caption-photo">{card ? card.name : ""}</p>
        <button
          type="button"
          className="popup__reset-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
