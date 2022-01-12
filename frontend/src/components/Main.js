import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPost,
  onCardClick,
  onCardLike,
  onCardDeleteClick,
  posts,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          src={currentUser.avatar || ""}
          alt="аватар"
          className="profile__avatar"
        />
        <div className="profile__edit-avatar" onClick={onEditAvatar} />
        <div className="profile__info">
          <h1 className="profile__name">
            {currentUser.name || "Пользователь не найден"}
          </h1>
          <p className="profile__about-me">
            {currentUser.about || "Пользователь не найден"}
          </p>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          />
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPost}
        />
      </section>
      <section className="posts">
        {posts.map((post) => (
          <Card
            card={post}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeleteClick={onCardDeleteClick}
            key={post._id}
          />
        ))}
      </section>
    </main>
  );
}
