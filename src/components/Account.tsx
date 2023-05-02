import NftCard from "@components/NftCard";
import { useEffect } from "react";
import { useRetrieveUserNfts } from "@hooks/useRetrieveUserNfts";

type accountProps = {
  address: string | undefined;
};

export default function Account({ address }: accountProps) {
  const {
    data: collections,
    isLoading,
    isRefetching,
    refetch,
  } = useRetrieveUserNfts({
    address: address as string,
  });

  useEffect(() => {
    refetch();
  }, [address]);

  return (
    <section>
      <div className="py-10">
        {isLoading || isRefetching ? (
          <div className="flex flex-col justify-center items-center gap-5 font-semibold text-2xl">
            <span className="animate-bounce rounded-full w-10 h-10 bg-black"></span>
            <span>loading NFTs</span>
          </div>
        ) : (
          <>
            {collections?.assets?.length ? (
              <ul className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                {collections?.assets?.map((collection: any, i: number) => (
                  <NftCard key={i} data={collection} />
                ))}
              </ul>
            ) : (
              <h2 className="font-semibold text-5xl">
                connect to your web3 wallet to view your nfts
              </h2>
            )}
          </>
        )}
      </div>
    </section>
  );
}
