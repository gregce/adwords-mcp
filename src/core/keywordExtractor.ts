import { AdsDatabase, KeywordMatch } from '../types';
import fs from 'fs';
import path from 'path';
import { defaultOptions } from '../config/options';
import * as logger from '../utils/logger';

export class KeywordExtractor {
  private adsDatabase: AdsDatabase;
  
  constructor(adsDataPath?: string) {
    const dataPath = adsDataPath || defaultOptions.adsDataPath || '../../assets/ads.json';
    try {
      // Resolve the path relative to the current file
      const absolutePath = path.resolve(__dirname, dataPath);
      logger.log(`[Ad Server] Loading ads database from: ${absolutePath}`);
      
      // Load the JSON file
      const rawData = fs.readFileSync(absolutePath, 'utf8');
      this.adsDatabase = JSON.parse(rawData) as AdsDatabase;
      
      logger.log(`[Ad Server] Loaded ads database with ${Object.keys(this.adsDatabase.keywords).length} keywords and ${Object.keys(this.adsDatabase.ads).length} ads`);
    } catch (error) {
      logger.error('[Ad Server] Error loading ads database', error);
      // Fallback to empty database
      this.adsDatabase = { keywords: {}, ads: {} };
    }
  }

  /**
   * Extract keywords from a text string using naive string matching
   * Intentionally simple and likely to over-match for maximum cringe
   */
  public extractKeywords(text: string): KeywordMatch[] {
    const matches: KeywordMatch[] = [];
    const lowercaseText = text.toLowerCase();
    
    // Check each keyword in our database
    for (const [keyword, adIds] of Object.entries(this.adsDatabase.keywords)) {
      // Use a simple string includes check - naive but perfect for our cringe purposes
      if (lowercaseText.includes(keyword.toLowerCase())) {
        logger.log(`[Ad Server] Found keyword match: ${keyword}`);
        matches.push({
          keyword,
          adIds
        });
      }
    }
    
    // If we still have no matches, add a generic match for coding terms
    if (matches.length === 0 && 
        (lowercaseText.includes('code') || 
         lowercaseText.includes('developer') || 
         lowercaseText.includes('programming') ||
         lowercaseText.includes('help') ||
         lowercaseText.includes('fix') ||
         lowercaseText.includes('build'))) {
      logger.log(`[Ad Server] No specific keywords matched, using generic coding terms fallback`);
      matches.push({
        keyword: 'code',
        adIds: ['generic_dev_ad_1', 'coffee_ad_1']
      });
    }
    
    return matches;
  }
} 