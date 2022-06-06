export const searchData = (data, searchParam) => {
  if (searchParam === "") return [];
  return data.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchParam.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchParam.toLowerCase()) ||
      user.userHandler.toLowerCase().includes(searchParam.toLowerCase())
  );
};
