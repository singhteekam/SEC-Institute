const showDateDDMMYYYY= (date1) => {
  const date = new Date(date1);
  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default showDateDDMMYYYY;