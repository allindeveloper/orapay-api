import type { NextApiRequest, NextApiResponse } from "next";
import { HymnService } from "../../../../services/hymn/hymn.service";
import { Language } from "../../../../services/hymn/hymn.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const hymnService = new HymnService();
  const query = req.query.searchQuery as string
  const locale =( req.query.locale || Language.English )as Language

  try {
    const foundHymn = await hymnService.getHymn(query, locale);
    res.status(200).json(foundHymn);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
