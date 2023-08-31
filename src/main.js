// 必要なモジュールのインポート
const fetch = require("node-fetch");
const path = require("path");
const {
  readRawJson,
  readPubMedXml,
  extractWoSIDsFromHtmlFiles,
  fileUtilsWriteFile,
} = require("./fileUtils");
const { parsePubMedData } = require("./pubmedApiUtils");
const { extractRecordsFromRawJson } = require("./jsonDataProcessor");
const { processRecordsWithNHOAuthors } = require("./publishedUtils");
// JSON結合データとメタデータの結合関数
function mergeData(jsonData, metadata) {
  const pubmedData = new Map(metadata);
  // PMIDをキーにして結合する処理（必要に応じて実装）
  // ...
  const mergedData = jsonData.map((e) => {
    const pmid = Number(e.get("PMID"));
    const dep = pubmedData.has(pmid) ? pubmedData.get(pmid) : "";
    return new Map([
      ["UID", e.get("UID")],
      ["addressName", e.get("addressName")],
      ["PMID", pmid],
      ["DEP", dep],
    ]);
  });
  return mergedData; // 結合したデータを返す
}

// DEPが20220101以上または空白のデータの抽出関数
function filterDataByDep(data) {
  const filteredData = data.filter(
    (e) => Number(e.get("DEP")) >= 20220101 || e.get("DEP") === ""
  );
  return filteredData; // 抽出したデータを返す
}
/**
 * HTMLファイルに出力されているWoSIDの存在をチェックする関数
 * @param {Map[]} jsonData - 処理対象のJSONデータ配列
 * @param {Set} uids - HTMLファイルに出力されたWoSIDのセット
 * @returns {Map[]} - HTMLファイルに出力されたWoSIDの存在を追加したJSONデータ配列
 */
function checkForHTMLWoSIDsExistence(jsonData, uids) {
  // jsonDataをマップしてHTMLファイルに出力されたWoSIDの存在をチェックし、フラグを設定する
  const htmlWoSIDsExist = jsonData.map((e) => {
    const hasHTMLWoSIDs = uids.has(e.get("UID"));
    e.set("hasHTMLWoSIDs", hasHTMLWoSIDs);
    return e;
  });
  return htmlWoSIDsExist;
}
async function mergeJsonWithPubMedData(rawJson, outputDir) {
  // UID, PMID, addressNameのみを抽出したMapの配列を作成する
  const parsedJson = extractRecordsFromRawJson(rawJson);
  // JSONファイル内のPMIDを重複なしで抽出する
  const pmidArray = Array.from(
    new Set(
      parsedJson
        .map((e) => e.get("PMID"))
        .filter((e) => e !== "")
        .map((x) => Number(x))
    )
  );
  // PubMedデータを取得する
  const pubmedData = await readPubMedXml(pmidArray, outputDir);
  const parsedMetadata = parsePubMedData(pubmedData);
  // JSONデータとPubMedデータを結合する
  const mergedData = mergeData(parsedJson, parsedMetadata);
  return mergedData;
}
async function compareUIDsAndMergeStatus(inputDir, filteredMergedData) {
  // publication_YYYY_MM.htmlを読み込んでUIDを抽出する
  const htmlWoSIDs = await extractWoSIDsFromHtmlFiles(inputDir);
  // 抽出したUIDとJSON結合データのUIDを比較し、一致するものにtrueを付与する
  const htmlWoSIDsExist = checkForHTMLWoSIDsExistence(
    filteredMergedData,
    htmlWoSIDs
  );
  return htmlWoSIDsExist;
}
// メインの処理
async function main() {
  //try {
  const inputDir = path.join(__dirname, "..", "data");
  const outputDir = path.join(__dirname, "..", "output");
  // raw.jsonのデータを読み込む
  const rawJson = readRawJson(inputDir);
  // JSONデータとPubMedデータを結合する
  const mergedData = await mergeJsonWithPubMedData(rawJson, outputDir);
  // DEPが20220101以上または空白のデータのみを抽出する
  const filteredMergedData = filterDataByDep(mergedData);
  // publication_YYYY_MM.htmlを読み込んでUIDを抽出する
  // 抽出したUIDとJSON結合データのUIDを比較し、一致するものにtrueを付与する
  const htmlWoSIDsExist = await compareUIDsAndMergeStatus(
    inputDir,
    filteredMergedData
  );
  console.log(
    "抽出したUIDとJSON結合データのUIDを比較し、一致するものにtrueを付与する"
  );
  console.log(htmlWoSIDsExist[0]);
  // HTMLファイルに出力されていないWoSIDかつNHO著者の可能性のあるレコードを抽出する
  processRecordsWithNHOAuthors(htmlWoSIDsExist, outputDir);
  // 結果を出力する

  //  console.log("処理が完了しました。");
  //} catch (error) {
  //  console.error("エラーが発生しました:", error);
  //}
}

// メインの処理を実行
main();
