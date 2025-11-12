"use client";

import { useState, useEffect } from "react";

export type ConnectionStatus =
  | "connected"
  | "connecting"
  | "disconnected"
  | "failed"
  | "unknown";

/**
 * Maps WebSocket readyState to a human-readable connection status
 * WebSocket readyState: CONNECTING=0, OPEN=1, CLOSING=2, CLOSED=3
 */
function getConnectionStatus(readyState: number): ConnectionStatus {
  switch (readyState) {
    case 1: // OPEN
      return "connected";
    case 0: // CONNECTING
      return "connecting";
    case 2: // CLOSING
      return "disconnected";
    case 3: // CLOSED
      return "connecting";
    default:
      return "unknown";
  }
}

/**
 * Custom hook to track the connection status of an agent (PartySocket instance)
 * @param agent - The agent instance returned from useAgent hook
 * @returns The current connection status
 */
export function useAgentConnectionStatus(agent: {
  readyState: number;
  addEventListener: (event: string, handler: () => void) => void;
  removeEventListener: (event: string, handler: () => void) => void;
}): ConnectionStatus {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    () => getConnectionStatus(agent.readyState)
  );

  useEffect(() => {
    // Update status when readyState changes
    const updateStatus = () => {
      setConnectionStatus(getConnectionStatus(agent.readyState));
    };

    // Initial update
    updateStatus();

    // Listen for connection events
    const handleOpen = () => updateStatus();
    const handleClose = () => updateStatus();
    const handleError = () => {
      setConnectionStatus("failed");
    };

    agent.addEventListener("open", handleOpen);
    agent.addEventListener("close", handleClose);
    agent.addEventListener("error", handleError);

    // Also poll readyState in case events don't fire
    const interval = setInterval(updateStatus, 1000);

    return () => {
      agent.removeEventListener("open", handleOpen);
      agent.removeEventListener("close", handleClose);
      agent.removeEventListener("error", handleError);
      clearInterval(interval);
    };
  }, [agent]);

  return connectionStatus;
}
