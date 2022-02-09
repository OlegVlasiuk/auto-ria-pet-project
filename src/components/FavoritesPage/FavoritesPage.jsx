import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Spin } from 'antd';

import ItemsList from '../ItemsList';
import { fetchCar } from '../../API/API';
import { state } from '../../store/state';
import { getFavoriteList } from '../../API/firebase';

import styles from './FavoritesPage.module.scss';

const FavoritesPage = () => {
  const { userId } = useSnapshot(state);

  const [favList, setFavList] = useState([]);
  const [favoriteCarsIds, setFavoriteCarsIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFavoriteList(userId).then((ids) => {
      setFavoriteCarsIds(ids);
      getCarList(ids);
    });
  }, [userId]);

  const getCarList = (carsIds) => {
    carsIds &&
      !!carsIds.length &&
      Promise.all(carsIds.map((carID) => fetchCar(carID).then((res) => res)))
        .then((carsList) => {
          setFavList(carsList);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setIsLoading(false);
        });
    setIsLoading(false);
  };

  return (
    <div className={styles.favoritePage}>
      <div className={styles.carListWrapper}>
        {isLoading ? (
          <div className={styles.preloader}>
            <Spin size="large" />
          </div>
        ) : (
          <ItemsList items={favList} favListIds={favoriteCarsIds} />
        )}
        {!isLoading && !favList.length && (
          <p className={styles.empty}>
            Ви не додали жодного оголошення до обраних.
          </p>
        )}
      </div>
    </div>
  );
};
export default FavoritesPage;
