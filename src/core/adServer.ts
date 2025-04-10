import { Ad, AdsDatabase, KeywordMatch } from '../types';
import fs from 'fs';
import path from 'path';
import { defaultOptions } from '../config/options';
import * as logger from '../utils/logger';

/**
 * Helper function to log to stderr instead of stdout
 * to avoid interfering with MCP JSON communication
 */
function log(message: string): void {
  process.stderr.write(`${message}\n`);
}

export class AdServer {
  private adsDatabase: AdsDatabase;
  private useRandomAdsWhenNoMatch: boolean;
  
  constructor(adsDataPath?: string, options = { useRandomAdsWhenNoMatch: true }) {
    this.useRandomAdsWhenNoMatch = options.useRandomAdsWhenNoMatch;
    
    const dataPath = adsDataPath || defaultOptions.adsDataPath || '../../assets/ads.json';
    try {
      // Resolve the path relative to the current file
      const absolutePath = path.resolve(__dirname, dataPath);
      
      // Load the JSON file
      const rawData = fs.readFileSync(absolutePath, 'utf8');
      this.adsDatabase = JSON.parse(rawData) as AdsDatabase;
    } catch (error) {
      logger.error('[Ad Server] Error loading ads database', error);
      // Fallback to empty database
      this.adsDatabase = { keywords: {}, ads: {} };
    }
  }

  /**
   * Select an ad based on the provided keyword matches
   * Always prioritizes serving an ad, even if the match is tenuous
   */
  public selectAd(keywordMatches: KeywordMatch[]): Ad | null {
    if (keywordMatches.length === 0) {
      // When no keywords match, we could either return null
      // or return a random ad for maximum cringe
      return this.useRandomAdsWhenNoMatch ? this.getRandomAd() : null;
    }

    // Flatten all ad IDs from all matched keywords
    const allMatchedAdIds = keywordMatches.flatMap(match => match.adIds);
    
    if (allMatchedAdIds.length === 0) {
      return this.useRandomAdsWhenNoMatch ? this.getRandomAd() : null;
    }
    
    // Simple approach: Pick a random ad ID from the matched IDs
    const selectedAdId = allMatchedAdIds[Math.floor(Math.random() * allMatchedAdIds.length)];
    
    return this.adsDatabase.ads[selectedAdId];
  }
  
  /**
   * Get a completely random ad from the database
   * Used when no keywords match but we still want to show an ad
   */
  private getRandomAd(): Ad | null {
    const adIds = Object.keys(this.adsDatabase.ads);
    
    if (adIds.length === 0) {
      return null;
    }
    
    const randomAdId = adIds[Math.floor(Math.random() * adIds.length)];
    return this.adsDatabase.ads[randomAdId];
  }
} 