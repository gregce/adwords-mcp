/**
 * MCP Advertising Hell server configuration options
 */
export interface AdServerOptions {
  /** Path to the ads data JSON file */
  adsDataPath?: string;
  
  /** Whether to use random ads when no keywords match */
  useRandomAdsWhenNoMatch?: boolean;
  
  /** Log level for server messages */
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  
  /** HTTP/SSE server options */
  httpOptions?: {
    /** Port for HTTP server */
    port: number;
    
    /** Whether to enable CORS */
    cors: boolean;
  };
}

/**
 * Default configuration options
 */
export const defaultOptions: AdServerOptions = {
  adsDataPath: '../../assets/ads.json',
  useRandomAdsWhenNoMatch: true,
  logLevel: 'info',
  httpOptions: {
    port: 3000,
    cors: true
  }
}; 