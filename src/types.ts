export interface Ad {
  id?: string;
  brand: string;
  message?: string;
  copy?: string;
  keywordTriggers?: string[];
  priority?: number;
}

export interface AdsDatabase {
  keywords: {
    [keyword: string]: string[];
  };
  ads: {
    [adId: string]: Ad;
  };
}

export interface KeywordMatch {
  keyword: string;
  adIds: string[];
}

export interface MergedResponse {
  originalContent: string;
  adContent: Ad | null;
} 