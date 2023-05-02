import { useAccount, useBalance, useDisconnect, useConnect } from "wagmi";
import { truncateWalletAddress } from "../../utils";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function Header() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { isConnected, address, connector } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const { disconnect } = useDisconnect();

  const [show, setShow] = useState<boolean>(false);

  const disconnectWallet = () => {
    disconnect();
    setShow(false);
  };

  return (
    <header className="py-5 flex justify-between">
      <h1 className="text-3xl font-semibold">
        <Link href="/">destroyer</Link>
      </h1>
      <aside className="relative">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white outline-none bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={() => setShow((show) => !show)}
        >
          {isConnected && address ? truncateWalletAddress(address) : "connect"}
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          className={clsx(
            "p-3 z-10 absolute mt-1 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-80",
            {
              hidden: !show,
            }
          )}
        >
          {isConnected && show ? (
            <div className="p-4 flex flex-col gap-2">
              <p className="font-semibold text-lg">
                {balance?.formatted.slice(0, 6)} {balance?.symbol}
              </p>
              <button
                onClick={disconnectWallet}
                className="bg-slate-800 hover:bg-slate-500 text-white font-semibold h-10 px-6 rounded-lg flex items-center justify-center"
              >
                disconnect from {connector?.name}
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                {connectors
                  .filter((x) => x.ready && x.id !== connector?.id)
                  .map((x) => (
                    <button
                      className="bg-slate-800 hover:bg-slate-500 text-white font-semibold h-10 px-6 rounded-lg flex items-center justify-center"
                      key={x.id}
                      onClick={() => {
                        connect({ connector: x });
                        setShow(false);
                      }}
                    >
                      {x.name}
                      {isLoading &&
                        x.id === pendingConnector?.id &&
                        " (connecting)"}
                    </button>
                  ))}
              </div>

              {error && <div>{error.message}</div>}
            </>
          )}
        </div>
      </aside>
    </header>
  );
}
