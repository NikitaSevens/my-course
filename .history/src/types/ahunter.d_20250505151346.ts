// src/types/ahunter.d.ts
export {};

declare global {
  interface AhunterSuggestion {
    value: string;
    id?: string;
    code?: string;
  }

  interface AhunterSuggestAPI {
    FMS: {
      Solid: (options: {
        id: string;
        ahunter_url?: string;
        empty_msg?: string;
        limit?: number;
        suggest_on_focus?: boolean;
        on_choose?: (suggestion: AhunterSuggestion) => void;
      }) => void;
    };
  }

  interface Window {
    AhunterSuggest?: AhunterSuggestAPI;
  }
}
