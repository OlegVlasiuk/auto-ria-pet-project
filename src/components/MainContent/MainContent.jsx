import { useState, useRef, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { Statistic, Spin } from 'antd';

import ItemsList from '../ItemsList';
import SearchCarForm from '../SearchCarForm';
import Header from '../Header';

import { fetchCar } from '../../API/API';
import { getFavoriteList } from '../../API/firebase';
import { state } from '../../store/state';

import styles from './MainContent.module.scss';
import { addTrim } from '../../helpers';

const MainContent = () => {
  const [carsList, setCarsList] = useState([]);
  const [favoriteCarsIds, setFavoriteCarsIds] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const checkValue = (value) => {
    setSearchValue(value);
  };

  const { userId } = useSnapshot(state);

  useEffect(() => {
    getFavoriteList(userId).then((ids) => {
      setFavoriteCarsIds(ids);
    });
  }, []);

  const getCarList = () => {
    searchValue?.classifieds?.length &&
      Promise.all(
        searchValue.classifieds.map((carID) =>
          fetchCar(carID).then((res) => res)
        )
      ).then((carsList) => {
        setCarsList(carsList);
      });
  };

  useEffect(() => {
    getCarList();
  }, [searchValue]);

  const scrollToRef = (ref) =>
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.carsBlock}>
          <div className={styles.formWrapper}>
            <SearchCarForm
              checkValue={checkValue}
              executeScroll={executeScroll}
              setSearchValue={setSearchValue}
            />
          </div>
          <div className={styles.imageWrapperLeft}>
            <img src="/images/01.jpg" alt="car-left" />
          </div>
          <div className={styles.imageWrapperRight}>
            <img src="/images/02.jpg" alt="car-right" />
          </div>
        </div>
        <div ref={myRef} className={styles.carList}>
          {!!searchValue?.total && (
            <div className={styles.carListWrapper}>
              <div className={styles.infoBlock}>
                <div className={styles.content}>
                  <Statistic
                    title="Всього оголошень:"
                    value={searchValue.total}
                  />
                  <Statistic
                    title="Найнижча ціна:"
                    value={`${addTrim(searchValue?.prices.sort((a, b) => a - b)[0])} $`}
                  />
                  <Statistic
                    title="Найвища ціна:"
                    value={`${
                      addTrim(searchValue?.prices.sort((a, b) => a - b)[
                        searchValue.prices.length - 1
                      ])
                    } $`}
                  />
                  <Statistic
                    title="Середня ціна:"
                    value={`${addTrim(Math.round(searchValue.arithmeticMean))} $`}
                  />
                  <Statistic
                    title="Середнє арифметичне між 1 та 4 кварталами:"
                    value={`${addTrim(Math.round(searchValue.interQuartileMean))} $`}
                  />
                  <Statistic
                    title="Середній пробіг:"
                    value={`${addTrim((
                      Math.ceil(
                        carsList.reduce((acc, car) => {
                          return acc + +(car.autoData.raceInt + '000');
                        }, 0)
                      ) / carsList.length
                    ).toFixed(0))} км`}
                  />
                </div>
              </div>
              {!!carsList.length ? (
                <ItemsList items={carsList} favListIds={favoriteCarsIds} />
              ) : (
                <div className={styles.preloader}>
                  <Spin size="large" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainContent;
