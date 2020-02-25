export const marketsList = (state) => state.markets.folders;
export const marketsCount = (state) => state.markets.count;
export const marketsStatus = (state) => state.markets.status;
export const marketsError = (state) => state.markets.error;
export const activeMarkets = (state) => marketsList(state).filter(market => market.isActive);
