import { useState } from 'react';
import { Card } from 'antd';
import {
  DashboardOutlined,
  ToolOutlined,
  EnvironmentOutlined,
  BranchesOutlined,
  BgColorsOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  MinusOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import ModalComponent from '../ModalСomponent';
import { addTrim } from '../../../helpers';

import styles from './CarCard.module.scss';

const CarCard = ({
  car,
  isFavorite,
  addCarToFavorite,
  removeCarFromFavorite,
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className={styles.card}
        cover={
          <div className={styles.imgWrapper} onClick={() => setIsModalOpen(true)}>
            <img alt="example" src={car.photoData.seoLinkF} />
          </div>
        }
        actions={[
          <a href={`https://auto.ria.com/uk${car.linkToView}`} target="_blank">
            <EyeOutlined />
          </a>,
          <>
            {isFavorite ? (
              <CheckCircleOutlined
                onClick={() => removeCarFromFavorite(car.autoData.autoId)}
              />
            ) : (
              <HeartOutlined
                onClick={() => addCarToFavorite(car.autoData.autoId)}
              />
            )}
          </>,
        ]}
      >
        <Meta
          title={
            <>
              <span>
                {`${car.markName}  ${car.modelName} - ${car.autoData.year}`}
              </span>
            </>
          }
          description={
            <div>
              <h3 className={styles.price}>
                <span className={styles.usdPrice}>{`${addTrim(car.USD)} $`}</span>
                <MinusOutlined />
                <span>{`${addTrim(car.UAH)} грн`}</span>
              </h3>
              <div className={styles.infoBlock}>
                <div className={styles.col}>
                  <p className={styles.description}>
                    <EnvironmentOutlined />
                    {car.locationCityName}
                  </p>
                  <p className={styles.description}>
                    <BranchesOutlined />
                    {car.autoData.gearboxName}
                  </p>

                  <p className={styles.description}>
                    <InfoCircleOutlined />
                    {car.autoData.driveName} привод
                  </p>
                </div>
                <div className={styles.col}>
                  <p className={styles.description}>
                    <DashboardOutlined />
                    {car.autoData.raceInt} тис. км
                  </p>
                  <p className={styles.description}>
                    <ToolOutlined />
                    {car.autoData.fuelName}
                  </p>
                  <p className={styles.description}>
                    <BgColorsOutlined />
                    {car.color.name}
                  </p>
                </div>
              </div>
            </div>
          }
        />
      </Card>
      {isModalOpen && (
        <ModalComponent
          car={car}
          visible={isModalOpen}
          callback={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
export default CarCard;
