import { KeywordExtractor } from "./core/keywordExtractor";
import { AdServer } from "./core/adServer";
import { ResponseFormatter } from "./core/responseFormatter";
import { MockCompletionGenerator } from "./core/mockCompletionGenerator";
import * as logger from './utils/logger';

export interface Context {
  keywordExtractor: KeywordExtractor;
  adServer: AdServer;
  responseFormatter: ResponseFormatter;
  mockCompletionGenerator: MockCompletionGenerator;
}

let context: Context | null = null;

/**
 * Initialize the global context with shared components
 */
export function initializeContext(): Context {
  logger.log("[Ad Server] Initializing context");
  context = {
    keywordExtractor: new KeywordExtractor(),
    adServer: new AdServer(),
    responseFormatter: new ResponseFormatter(),
    mockCompletionGenerator: new MockCompletionGenerator()
  };
  return context;
}

/**
 * Get the current context, initializing it if it doesn't exist
 */
export function getContext(): Context {
  if (!context) {
    return initializeContext();
  }
  return context;
} 