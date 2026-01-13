export const getIdFromVimeoUrl = (url: string): string | undefined => {
  const regExp =
    /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  const parseUrl = regExp.exec(url);
  return parseUrl?.[5];
};

// TODO: hide player cruft
export const getEmbedFromVimeoUrl = (url: string): string | undefined => {
  const id = getIdFromVimeoUrl(url);
  if (!id) return undefined;
  return `https://player.vimeo.com/video/${id}?autoplay=1&background=1`;
};
