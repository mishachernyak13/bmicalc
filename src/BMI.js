import React, { useState, useEffect } from 'react';

function BMI() {
  const [weight, setWeight] = useState(30);
  const [height, setHeight] = useState(100);
  const [bmi, setBMI] = useState('');
  
  const calculateBMI = () => {
    if (weight !== '' && height !== '') {
      const weightValue = parseInt(weight);
      const heightValue = parseInt(height);

      if (!isNaN(weightValue) && !isNaN(heightValue) && heightValue !== 0 ) {
      const bmiValue = Math.floor(weight / ((height / 100) * (height / 100)));
      setBMI(bmiValue);
      }
    }
  };


  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    calculateBMI();
  };
  
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    calculateBMI();
  };
  

  useEffect(() => {
    if (weight && height) {
      calculateBMI();
    }
  }, [weight, height, calculateBMI]);

  return (
    <div>
      <h2>Калькулятор ІМТ</h2>
      <div>
        <label>Вага (кг):</label>
        <input
          type="range"
          value={weight}
          onChange={handleWeightChange}
          min = "30"
          max = "150"
        />
         <span>{weight}</span>
      </div>
      <div>
        <label>Зріст (см):</label>
        <input
          type="range"
          value={height}
          onChange={handleHeightChange}
          min = "100"
          max = "210"
        />
        <span>{height}</span>
      </div>
      {bmi !== '' && (
        <div>
          <h3>Ваш ІМТ: {bmi}</h3>
          <p>
            <strong>Інтерпретація:</strong>
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