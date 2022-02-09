import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import {
  Form,
  SubmitButton,
  AutoComplete,
  Select,
  DatePicker,
} from 'formik-antd';
import moment from 'moment';
import { Alert } from 'antd';

import {
  fetchAveragePrice,
  fetchBrands,
  fetchEngines,
  fetchGearBoxes,
  fetchModels,
} from '../../API/API';
import { validate } from './validators';

import styles from './SearchCarForm.module.scss';

const initialValues = {
  brand: '',
  model: '',
  year: '',
  engine: '',
  gearBox: '',
};

const SearchCarForm = ({ checkValue, executeScroll, setSearchValue }) => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [engines, setEngines] = useState([]);
  const [gearBoxes, setGearBoxes] = useState([]);
  const [data, setData] = useState(initialValues);
  const [error, setError] = useState(false);

  const handleSubmit = (values) => {
    const { brand, model, year, engine, gearBox } = values;
    const brandNumber = brands.find((el) => el.label === brand).number;

    fetchAveragePrice(brandNumber, model, year, engine, gearBox).then((res) => {
      if (res?.total) {
        setError(false);
        checkValue(res);
        executeScroll();
      } else {
        setError(true);
      }
    });
  };
  
  useEffect(() => {
    fetchBrands().then((res) => {
      const options = res.map((el) => ({
        label: el.name,
        value: el.name,
        number: el.value,
      }));
      setBrands(options);
    });
    fetchEngines().then((res) => setEngines(res));
    fetchGearBoxes().then((res) => setGearBoxes(res));
  }, []);

  const handleChange = (value) => {
    setData({ data, brand: value });
  };

  useEffect(() => {
    for (let brand of brands) {
      if (data.brand === brand.value) {
        fetchModels(brand.number).then((models) => setModels(models));
      }
    }
  }, [brands, data.brand]);

  const { Option } = Select;

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validate={validate}
        enableReinitialize
        render={({ values }) => (
          <Form className={styles.form}>
            <h2>Знайти авто</h2>
            <AutoComplete
              name="brand"
              value={values.brand}
              placeholder="Бренд"
              onChange={handleChange}
              className={styles.formControl}
              options={brands}
              filterOption={(value, option) =>
                option.value.toUpperCase().indexOf(value.toUpperCase()) !== -1
              }
            />
            <Select
              showSearch
              value={values.model}
              name="model"
              placeholder="Модель"
              className={styles.formControl}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {!!models.length &&
                models.map((model) => (
                  <Option value={model.value} key={model.value}>
                    {model.name}
                  </Option>
                ))}
            </Select>
            <Select
              value={values.engine}
              name="engine"
              placeholder="Тип двигуна"
              className={styles.formControl}
            >
              {!!engines.length &&
                engines.map((engine) => (
                  <Option value={engine.value} key={engine.value}>
                    {engine.name}
                  </Option>
                ))}
            </Select>
            <Select
              value={values.gearBox}
              name="gearBox"
              placeholder="Тип коробки передач"
              className={styles.formControl}
            >
              {!!gearBoxes.length &&
                gearBoxes.map((gearBox) => (
                  <Option value={gearBox.value} key={gearBox.value}>
                    {gearBox.name}
                  </Option>
                ))}
            </Select>
            <DatePicker
              placeholder="Рік випуску"
              name="year"
              picker="year"
              className={styles.formControl}
              disabledDate={(current) =>
                current && current > moment().add(0, 'years')
              }
            />
            <div>
              <SubmitButton type="primary" loading={false}>
                Пошук
              </SubmitButton>
            </div>
          </Form>
        )}
      />
      {error && (
        <Alert
          className={styles.alert}
          message="На жаль, по Вашому запиту оголошень не знайдено."
          type="info"
          showIcon
        />
      )}
    </div>
  );
};

export default SearchCarForm;
