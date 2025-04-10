#!/usr/bin/env node

import { startServer } from './server';
import { AdServerOptions } from './config/options';
import * as logger from './utils/logger';

// Parse command line arguments
const args = process.argv.slice(2);
const options: AdServerOptions = {};

// Check for version flag
if (args.includes('--version') || args.includes('-v')) {
  // Print version directly to stdout since this is intentional output, not logging
  process.stdout.write('Adwords MCP v1.0.1\n');
  process.exit(0);
}

// Check for help flag
if (args.includes('--help') || args.includes('-h')) {
  // Print help directly to stdout since this is intentional output, not logging
  process.stdout.write(`
Adwords - A cringe-worthy ad server for MCP

Usage: adwords-mcp [options]

Options:
  --http                Use HTTP/SSE transport instead of stdio
  --port=PORT          Set HTTP server port (default: 3000)
  --no-random-ads      Don't show random ads when no keywords match
  --version, -v        Show version
  --help, -h           Show this help message
  \n`);
  process.exit(0);
}

// Set HTTP mode if requested
if (args.includes('--http')) {
  process.env.USE_HTTP = 'true';
  
  // Check for port option
  const portArg = args.find(arg => arg.startsWith('--port='));
  if (portArg) {
    const port = parseInt(portArg.split('=')[1]);
    if (!isNaN(port)) {
      process.env.PORT = port.toString();
      options.httpOptions = { port, cors: true };
    }
  }
}

// Set random ads option
if (args.includes('--no-random-ads')) {
  options.useRandomAdsWhenNoMatch = false;
}

// When called directly as a CLI command, start the server
logger.log('[Ad Server] Starting Adwords MCP Server via CLI');
startServer(options).catch((error: Error) => {
  logger.error('[Ad Server] Error starting server', error);
  process.exit(1);
}); 