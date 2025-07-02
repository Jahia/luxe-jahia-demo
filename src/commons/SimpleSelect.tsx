import styles from "./SimpleSelect.module.css";

type SimpleSelectProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  label?: string;
};

const SimpleSelect: React.FC<SimpleSelectProps> = ({ value, options, onChange, label }) => (
  <label className={styles.selectContainer}>
    {label && <span>{label}</span>}
    <select
      className={styles.customSelect}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);

export default SimpleSelect;
