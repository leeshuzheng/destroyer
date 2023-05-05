export const useHandleIpfsImageUrl = (url: string) => {
  if (!url) {
    return undefined;
  }

  return url.replace("ipfs://", "https://ipfs.io/ipfs/");
};
