export const normalizeMenuItems = (list = []) => {

  return list.reduce((acc, item, idx) => {
    acc[item.id] = item;
    return acc;
  }, {});
};

export const getDefaultID = (list) => {
  if (list && list.length) {
    return list[0].id;
  }

  return 0;
};
