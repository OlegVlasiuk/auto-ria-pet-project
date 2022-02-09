import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

import CarCard from '../MainContent/Card/CarCard';
import { addToFavorite, removeFromFavorite } from '../../API/firebase';
import { state } from '../../store/state';

import styles from './ItemsList.module.scss';

const ItemsList = ({ items, favListIds }) => {
  const [favoriteCarsIds, setFavoriteCarsIds] = useState([]);

  const { userId } = useSnapshot(state);

  useEffect(() => {
    favListIds && setFavoriteCarsIds(favListIds);
  }, [favListIds]);

  const addCardToFavorite = (carId) => {
    if (!userId) return;
    const listIds = [...favoriteCarsIds, carId];
    addToFavorite(listIds);
    setFavoriteCarsIds(listIds);
  };

  const removeCarFromFavorite = (carId) => {
    const listIds = favoriteCarsIds.filter((el) => el !== carId);
    removeFromFavorite(listIds);
    setFavoriteCarsIds(listIds);
  };

  return (
    <div className={styles.list}>
      {!!items.length &&
        items.map((car) => (
          <CarCard
            car={car}
            key={car.userId}
            favoritePageView
            removeCarFromFavorite={removeCarFromFavorite}
            addCarToFavorite={addCardToFavorite}
            isFavorite={favoriteCarsIds.includes(car.autoData.autoId)}
          />
        ))}
    </div>
  );
};
export default ItemsList;
