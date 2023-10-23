export const getIdFromVimeoUrl = (url) => {
  const regExp =
    /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  const parseUrl = regExp.exec(url);
  return parseUrl[5];
};

export const getEmbedFromVimeoUrl = (url) => {
  const id = getIdFromVimeoUrl(url);
  return `https://player.vimeo.com/video/${id}`;
};

