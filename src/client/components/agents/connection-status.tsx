import type { ConnectionStatus } from "@/client/hooks/useAgentConnectionStatus";

interface ConnectionStatusBadgeProps {
  status: ConnectionStatus;
}

export function ConnectionStatusBadge({ status }: ConnectionStatusBadgeProps) {
  const statusConfig = {
    connected: {
      label: "Live",
      subLabel: "Connected to agent",
      color: "bg-green-500",
      pulseColor: "bg-green-400",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      glowColor: "shadow-green-200"
    },
    connecting: {
      label: "Connecting",
      subLabel: "Connecting to agent...",
      color: "bg-yellow-500",
      pulseColor: "bg-yellow-400",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      glowColor: "shadow-yellow-200"
    },
    disconnected: {
      label: "Disconnected",
      subLabel: "Disconnected from agent",
      color: "bg-gray-400",
      pulseColor: "bg-gray-300",
      textColor: "text-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      glowColor: "shadow-gray-200"
    },
    failed: {
      label: "Connection failed",
      subLabel: "Connection failed to agent",
      color: "bg-red-500",
      pulseColor: "bg-red-400",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      glowColor: "shadow-red-200"
    },
    unknown: {
      label: "Unknown status",
      subLabel: "Unknown status of agent",
      color: "bg-gray-400",
      pulseColor: "bg-gray-300",
      textColor: "text-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      glowColor: "shadow-gray-200"
    }
  };

  const config = statusConfig[status];
  const isConnected = status === "connected";
  const isPulsing = status === "connecting";

  return (
    <div
      className={`inline-flex items-center gap-1 md:gap-3 px-2 md:px-4 py-1 md:py-2.5 rounded-full border shadow-sm ${config.bgColor} ${config.borderColor} ${config.textColor} transition-all duration-300 ${
        isConnected ? `${config.glowColor} shadow-lg` : ""
      }`}
    >
      <div className="relative flex items-center justify-center w-3 h-3">
        {/* Main indicator dot */}
        <div
          className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${config.color} ${
            isConnected ? "animate-pulse" : isPulsing ? "animate-pulse" : ""
          }`}
        />
        {/* Subtle pulsing ring for live connection */}
        {isConnected && (
          <>
            <div
              className={`absolute w-2.5 h-2.5 rounded-full ${config.pulseColor} animate-ping opacity-40`}
            />
            <div
              className={`absolute w-4 h-4 rounded-full ${config.color} animate-ping opacity-20`}
              style={{ animationDelay: "0.3s" }}
            />
          </>
        )}
        {/* Pulsing ring for connecting state */}
        {isPulsing && (
          <>
            <div
              className={`absolute w-2.5 h-2.5 rounded-full ${config.pulseColor} animate-ping opacity-75`}
            />
            <div
              className={`absolute w-2.5 h-2.5 rounded-full ${config.pulseColor} animate-ping opacity-50`}
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-xs md:text-sm font-semibold tracking-tight leading-none">
          {config.label}
        </span>
        {config.subLabel && (
          <span className="text-[10px] md:text-xs font-normal opacity-70 leading-none mt-0.5">
            {config.subLabel}
          </span>
        )}
      </div>
    </div>
  );
}
