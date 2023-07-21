import React, { useState, useEffect } from 'react';
import './BMI.css';

function BMI() {
  const [weight, setWeight] = useState(30);
  const [height, setHeight] = useState(100);
  const [bmi, setBMI] = useState('');

  const calculateBMI = () => {
    if (weight !== '' && height !== '') {
      const weightValue = parseFloat(weight);
      const heightValue = parseFloat(height);

      if (!isNaN(weightValue) && !isNaN(heightValue) && heightValue !== 0) {
        const bmiValue = Math.floor(weight / ((height / 100) * (height / 100)));
        setBMI(bmiValue);
      }
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

  return (
    <div className="bmi-container"> {/* Додаємо клас для стилізації */}
      <h2>Калькулятор ІМТ</h2>
      <div>
        <label htmlFor="weightInput">Вага (кг):</label>
        <input
          type="range"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min="30"
          max="150"
          id="weightInput"
          className="w-slider"
        />
        <span>{weight}</span>
      </div>
      <div>
        <label htmlFor="heightInput">Вага (кг):</label>
        <input
          type="range"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          min="100"
          max="210"
          id="heightInput"
          className="h-slider"
        />
        <span>{height}</span>
      </div>
      {bmi !== '' && (
        <div>
          <h3>Ваш ІМТ: {bmi}</h3>
          <p>
            <strong>Інтерпретація: </strong>
            {bmi < 18.5 && 'Недостатня вага'}
            {bmi >= 18.5 && bmi < 24.9 && 'Норма'}
            {bmi >= 24.9 && bmi < 29.9 && 'Надлишкова вага'}
            {bmi >= 29.9 && 'Ожиріння'}
          </p>
        </div>
      )}
    </div>
  );
}

export default BMI;
