export const updatedObject = (oldOject, updatedProperties) => {
  return {
    ...oldOject,
    ...updatedProperties,
  };
};
