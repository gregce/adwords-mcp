/**
 * MCP Advertising Hell - A cringe-worthy MCP server that serves ads to developers
 */

// Main server exports
export { createServer, startServer } from './server';

// Context management
export { getContext, initializeContext } from './context';

// Core components
export { KeywordExtractor } from './core/keywordExtractor';
export { AdServer } from './core/adServer';
export { ResponseFormatter } from './core/responseFormatter';

// Configuration
export { defaultOptions } from './config/options';
export type { AdServerOptions } from './config/options';

// Type exports
export type { Ad, AdsDatabase, KeywordMatch, MergedResponse } from './types'; 