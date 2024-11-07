import Fuse from "fuse.js";
import { hymnsData } from "./hymns.english";
import { hymnsIgbo } from "./hymns.igbo";

import { HymnBook, HymnData, Language, Verse } from "./hymn.types";
import { AppResponse, ResponseService } from "../response/response.service";
export class HymnService {
  private readonly responseService = new ResponseService();

  private formatNumber(verseNumber: number) {
    let formattedVerseNumber = verseNumber.toString();

    while (formattedVerseNumber.length < 3) {
      formattedVerseNumber = "0" + formattedVerseNumber;
    }

    return formattedVerseNumber;
  }
  private formatRows = (rows: HymnData[]): HymnBook[] => {
    return rows.map((row) => {
      const verses: Verse[] = [];

      Object.keys(row).forEach((key) => {
        const match = key.toString().match(/verse(\d+)/);

        if (row[key] !== null && match) {
          const verseNumber = match[1];

          verses.push({
            verseName: `Verse ${verseNumber}`,
            text: row[key] as string,
            isRefrain: false,
            verseNumber,
          });

          row.refrain &&
            verses.push({
              verseName: "Refrain",
              text: row.refrain,
              isRefrain: true,
            });
        }
      });

      if (row.refrain2) {
        verses.pop();
        verses.push({
          verseName: "Refrain",
          text: row.refrain2,
          isRefrain: true,
        });
      }

      return {
        hymnNumber: this.formatNumber(row.number),
        number: row.number,
        hymnTitle: row.title,
        verses: verses,
      };
    });
  };

  private searchHymns(hymns: HymnData[], query: string): HymnData[] {
    const keysToSearch = ["title", "number", "verse1", "verse2", "refrain"];
    if (!query) {
      return hymns;
    }
    const fuse = new Fuse(hymns, {
      keys: keysToSearch,
      includeScore: true,
      threshold: 0.3,
    });

    const result = fuse.search(query);

    const matchedHymns = result.map((item) => item.item);

    return matchedHymns;
  }

  hymnDictionary(locale: Language) {
    const hymnMap: Record<Language, HymnData[]> = {
      [Language.English]: hymnsData,
      [Language.Igbo]: hymnsIgbo
    };
    return hymnMap[locale] || Language.English
  }

  getHymn(query: string, locale: Language ): Promise<AppResponse<HymnBook[]>> {
    return new Promise((resolve) => {
      const localizedHymn = this.hymnDictionary(locale);
      const matchedHymns = this.searchHymns(localizedHymn, query);

      const response = this.formatRows(matchedHymns);
      const hymnResponse = this.responseService.formatDataResponse(response);
      resolve(hymnResponse);
    });
  }
}
