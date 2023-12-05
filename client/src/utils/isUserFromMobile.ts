export const isUserFromMobile = () => {
  return /Mobi|Android/i.test(navigator?.userAgent);
};
