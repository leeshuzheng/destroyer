import { useNetwork, useSwitchNetwork } from "wagmi";

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <div>
      <div>
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && " (unsupported)"}
      </div>

      {switchNetwork && (
        <div>
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button
                key={x.id}
                className="bg-slate-800 hover:bg-slate-500 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center"
                onClick={() => switchNetwork(x.id)}
              >
                {x.name}
                {isLoading && x.id === pendingChainId && " (switching)"}
              </button>
            )
          )}
        </div>
      )}

      <div>{error && error.message}</div>
    </div>
  );
}
