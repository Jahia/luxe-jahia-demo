
import React from 'react';
import styles from './PeriodFacet.module.css';

const periods = ['less than 1 month', 'less than 6 months', 'less than 1 year'];

interface PeriodFacetProps {
  selectedPeriods: string[];
  onChange: (periods: string[]) => void;
}

const PeriodFacet: React.FC<PeriodFacetProps> = ({ selectedPeriods, onChange }) => {
  const handlePeriodChange = (period: string) => {
    if (selectedPeriods.includes(period)) {
      onChange(selectedPeriods.filter(p => p !== period));
    } else {
      onChange([...selectedPeriods, period]);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Time Period</h3>
      <div className={styles.options}>
        {periods.map(period => (
          <div key={period} className={styles.option} onClick={() => handlePeriodChange(period)}>
            <div className={`${styles.checkbox} ${selectedPeriods.includes(period) ? styles.checked : ''}`} />
            <label className={styles.label}>
              {period}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeriodFacet;
