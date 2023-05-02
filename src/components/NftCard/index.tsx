import { NftCardProps } from "./definitions";
import Image from "next/image";
import { useHandleIpfsImageUrl } from "@hooks/useHandleIpfsImageUrl";

const NftCard = ({ data }: NftCardProps) => {
  const image = useHandleIpfsImageUrl(data.metadata?.image);

  if (!data.metadata) {
    return null;
  }

  return (
    <li className="flex flex-col">
      <div className="flex flex-col border border-slate-100 rounded-lg h-full overflow-hidden">
        <div className="aspect-square w-full relative">
          <Image src={image as string} fill alt={data?.metadata?.name} />
        </div>
        <div className="p-4 flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{data.metadata?.name}</h2>
          <span className="truncate text-sm">
            {data.metadata?.description.replace(/(<([^>]+)>)/gi, "")}
          </span>
        </div>
      </div>
    </li>
  );
};

export default NftCard;
