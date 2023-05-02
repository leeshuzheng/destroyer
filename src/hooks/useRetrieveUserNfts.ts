import { useQuery } from "@tanstack/react-query";

type retrieveUserNftsProps = {
  address: string;
};

const Auth = Buffer.from(
  "82fb339c24924bf790a853a93ad207fc" + ":" + "57f9ec55fb6942da89d30c61f7dbac97"
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
