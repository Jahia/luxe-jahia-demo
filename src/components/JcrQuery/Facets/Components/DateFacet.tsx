//
// import React from 'react';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// import styles from './DateFacet.module.css';
//
// interface DateFacetProps {
//   dateRange: [Date, Date];
//   onChange: (range: [Date, Date]) => void;
// }
//
// const DateFacet: React.FC<DateFacetProps> = ({ dateRange, onChange }) => {
//   const formatDateForInput = (date: Date) => {
//     return date.toISOString().split('T')[0];
//   };
//
//   const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newDate = new Date(e.target.value);
//     onChange([newDate, dateRange[1]]);
//   };
//
//   const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newDate = new Date(e.target.value);
//     onChange([dateRange[0], newDate]);
//   };
//
//   return (
//     <div className={styles.container}>
//       <h3 className={styles.title}>Date Range</h3>
//       <div className={styles.dateInputs}>
//         <div className={styles.inputGroup}>
//           <Label htmlFor="start-date" className={styles.label}>From</Label>
//           <Input
//             id="start-date"
//             type="date"
//             value={formatDateForInput(dateRange[0])}
//             onChange={handleStartDateChange}
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <Label htmlFor="end-date" className={styles.label}>To</Label>
//           <Input
//             id="end-date"
//             type="date"
//             value={formatDateForInput(dateRange[1])}
//             onChange={handleEndDateChange}
//             className={styles.input}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default DateFacet;
