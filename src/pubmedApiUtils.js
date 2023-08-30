const fetch = require("node-fetch");
const path = require("path");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getPubMedMetadata = async (pmidList, outputPath, filename) => {
  const MAX_BATCH_SIZE = 100; // 1回のリクエストで処理できる最大数

  const batches = splitIntoBatches(pmidList, MAX_BATCH_SIZE);
  const results = await fetchAndProcessBatches(batches);
  const combinedXmlData = results.join("");
  return combinedXmlData;
};
const splitIntoBatches = (pmidList, batchSize) => {
  const batches = [];
  for (let i = 0; i < pmidList.length; i += batchSize) {
    const batch = pmidList.slice(i, i + batchSize);
    batches.push(batch);
  }
  return batches;
};

const fetchAndProcessBatches = async (batches) => {
  const results = [];
  for (let i = 0; i < batches.length; i++) {
    console.log(`Fetching batch ${i + 1} of ${batches.length}`);
    const batch = batches[i];
    const pmid = batch.join(",");
    const apiUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&retmode=xml`;
    const response = await fetch(apiUrl);
    const xmlData = await response.text();
    const replaceTargetString =
      /<\?xml version="1.0" \?>\n<!DOCTYPE PubmedArticleSet PUBLIC\s+"-\/\/NLM\/\/DTD PubMedArticle, 1st January 2023\/\/EN"\s+"https:\/\/dtd.nlm.nih.gov\/ncbi\/pubmed\/out\/pubmed_230101.dtd">/;

    const processedXmlData =
      i > 0 ? xmlData.replace(replaceTargetString, "") : xmlData;
    results.push(processedXmlData);
    await sleep(3000);
  }
  return results;
};

function parsePubMedData(xmlData) {
  // XMLをパースする
  const options = {
    ignoreAttributes: false,
  };
  const xp = new XMLParser();
  const parsedMetadata = xp.parse(xmlData);
  const pubmedArticleList = parsedMetadata.PubmedArticleSet.flatMap(
    (e) => e.PubmedArticle
  );
  const pmidAndDep = pubmedArticleList.map((pubmedArticle, idx) => {
    const medlineCitation = pubmedArticle.MedlineCitation;
    const pmid = medlineCitation.PMID;
    const article = medlineCitation.Article;
    const articleDate = article.ArticleDate;
    const year = articleDate
      ? articleDate.Year
        ? articleDate.Year
        : null
      : null;
    const month = articleDate
      ? articleDate.Month
        ? articleDate.Month.toString().padStart(2, "0")
        : null
      : null;
    const day = articleDate
      ? articleDate.Day
        ? articleDate.Day.toString().padStart(2, "0")
        : "01"
      : null;
    const articleDateStr =
      year !== null && month !== null ? `${year}${month}${day}` : null;
    return [pmid, articleDateStr];
  });
  return pmidAndDep;
}

module.exports = {
  getPubMedMetadata,
  parsePubMedData,
};
