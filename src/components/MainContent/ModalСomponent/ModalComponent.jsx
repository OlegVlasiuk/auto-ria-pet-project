import { useEffect, useState } from "react";
import moment from "moment";
import { Card, Carousel, Modal } from "antd";
import Meta from "antd/lib/card/Meta";
import { fetchPhotoOfCar } from "../../../API/API";

import styles from "./ModalComponent.module.scss";

const ModalComponent = ({ car, visible, callback }) => {
  const [carPhotos, setCarPhotos] = useState([]);

  useEffect(() => {
    fetchPhotoOfCar(car.autoData.autoId).then((photos) => {
      createPhotosList(photos.data);
    });
  }, []);

  const createPhotosList = (photos) => {
    console.log(photos);
    const photoList = [];
    for (let index in photos) {
      const obj = photos[index];
      for (const key in obj) {
        const photosArray = obj[key];
        photoList.length < 10 && photoList.push(photosArray.formats[1]);
      }
    }
    setCarPhotos(photoList);
  };
  const handleCancel = () => {
    callback && callback();
  };

  return (
    <>
      <Modal
        title={`${car.markName}  ${car.modelName} - ${car.autoData.year}`}
        visible={visible}
        onCancel={handleCancel}
        width={600}
        height={500}
        style={{ top: 20 }}
        footer={null}
      >
        <Card
          cover={
            <div className={styles.carousel}>
              <Carousel effect="fade" autoplay>
                {carPhotos.length &&
                  carPhotos.map((photo) => {
                    return (
                      <div className={styles.imgWrapper}>
                        <img alt="example" src={photo} />
                      </div>
                    );
                  })}
              </Carousel>
            </div>
          }
        >
          <Meta
            description={
              <div>
                <p className={styles.description}>
                  Оголошення додано:
                  <b>{moment(car.addDate).subtract(10, "days").calendar()}</b>
                </p>
                <div className={styles.infoBlock}>
                  <div className={styles.col}>
                    <p className={styles.description}>
                      Місто: <b>{car.locationCityName}</b>
                    </p>
                    <p className={styles.description}>
                      Коробка передач: <b>{car.autoData.gearboxName}</b>
                    </p>
                    <p className={styles.description}>
                      Привід: <b>{car.autoData.driveName}</b>
                    </p>
                  </div>
                  <div className={styles.col}>
                    <p className={styles.description}>
                      Пробіг: <b>{car.autoData.raceInt} тис. км</b>
                    </p>
                    <p className={styles.description}>
                      Двигун: <b>{car.autoData.fuelName}</b>
                    </p>
                    <p className={styles.description}>
                      Колір: <b>{car.color.name}</b>
                    </p>
                  </div>
                </div>
                <p className={styles.description}>{car.autoData.description}</p>
              </div>
            }
          />
        </Card>
      </Modal>
    </>
  );
};

export default ModalComponent;
