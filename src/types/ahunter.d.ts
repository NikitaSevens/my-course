// src/types/global.d.ts
import { JQueryStatic } from 'jquery';

declare global {
  interface Window {
    jQuery: JQueryStatic;
    $: JQueryStatic;
    AhunterSuggest?: AhunterSuggestAPI;
  }

  interface AhunterSuggestion {
    value: string;
    id?: string;
    code?: string;
    canon_name: string;
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
}