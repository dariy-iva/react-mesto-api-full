import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {
  const { owner, link, name, likes } = card;

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const buttonDeleteClassName = `post__del-button ${
    isOwn && "post__del-button_visible"
  }`;

  const isLiked = likes.some((i) => i._id === currentUser._id);
  const buttonLikeClassName = `post__like-button ${
    isLiked && "post__like-button_active"
  }`;

  function handleImgClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  return (
    <article className="post">
      <img
        src={link}
        alt={name}
        className="post__photo"
        onClick={handleImgClick}
      />
      <p className="post__caption">{name}</p>
      <div className="post__likes">
        <button type="button" className={buttonLikeClassName} onClick={handleLikeClick}></button>
        <p className="post__likes-number">{likes.length}</p>
      </div>
      <button type="button" className={buttonDeleteClassName} onClick={handleDeleteClick}></button>
    </article>
  );
}
