import React from "react";
import { mobxContext } from "../../index";
import "./FavoritesPage.css";
import { useContext } from "react";
import { observer } from "mobx-react";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";

export const FavoritesPage = observer(() => {
  const { user } = useContext(mobxContext);
  return (
    <div>
      <h2 className="favoritePageTitle">Избранное</h2>
      {user.favoriteProducts.map((product) => (
        <FavoriteCard product={product} key={product.id} />
      ))}
      {/* {user.favoriteProducts.length > 0 &&
        user.favoriteProducts.map((product) => {
          <FavoriteCard product={product} key={product.id} />;
        })} */}
    </div>
  );
});
