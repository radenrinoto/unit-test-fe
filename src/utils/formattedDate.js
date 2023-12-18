const formattedDate = (dateTime) => {
  const inputDate = new Date(dateTime);

  return inputDate.toDateString();
};

export default formattedDate;
