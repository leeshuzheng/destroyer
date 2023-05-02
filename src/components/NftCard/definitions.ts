export type NftCardProps = {
  data: {
    contract: string;
    tokenId: string;
    supply: string;
    type: string;
    metadata: {
      name: string;
      symbol?: string;
      description: string;
      image: string;
      properties: {
        number: number;
        name: string;
      };
    };
  };
};
