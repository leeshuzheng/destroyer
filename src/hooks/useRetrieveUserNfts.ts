import { useQuery } from "@tanstack/react-query";

type retrieveUserNftsProps = {
  address: string;
};

const Auth = Buffer.from(
  process.env.NEXT_PUBLIC_INFURA_API_KEY +
    ":" +
    process.env.NEXT_PUBLIC_INFURA_SECRET_KEY
).toString("base64");

export const useRetrieveUserNfts = ({ address }: retrieveUserNftsProps) => {
  return useQuery(
    ["userNfts"],
    () =>
      fetch(
        `https://nft.api.infura.io/networks/1/accounts/${address}/assets/nfts`,
        { headers: { Authorization: `Basic ${Auth}` } }
      )
        .then((data) => data.json())
        .then((res) => res),
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );
};
