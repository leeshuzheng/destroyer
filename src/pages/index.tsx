import { useAccount } from "wagmi";
import Account from "@components/Account";
import Header from "@components/Header";

function Page() {
  const { address } = useAccount();

  return (
    <div className="h-full dark:bg-black">
      <div className="md:max-w-6xl mx-auto px-4">
        <Header />
        <Account address={address} />
      </div>
    </div>
  );
}

export default Page;
