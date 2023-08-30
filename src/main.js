// 必要なモジュールのインポート
const fetch = require("node-fetch");
const path = require("path");
const {
  readRawJson,
  readPubMedXml,
  extractWoSIDsFromHtmlFiles,
} = require("./fileUtils");
const { parsePubMedData } = require("./pubmedApiUtils");
const { extractRecordsFromRawJson } = require("./jsonDataProcessor");
//const { processRecordsWithNHOAuthors } = require("./publishedUtils");
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

// メインの処理
async function main() {
  //try {
  // raw.jsonのデータを読み込む
  const rawJson = readRawJson(path.join(__dirname, "..", "data"));
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
  const metadata = await readPubMedXml(pmidArray);
  return;
  const parsedMetadata = parsePubMedData(metadata);
  // JSONデータとPubMedデータを結合する
  const mergedData = mergeData(parsedJson, parsedMetadata);
  console.log(mergedData.length);
  // DEPが20220101以上または空白のデータのみを抽出する
  const filteredMergedData = filterDataByDep(mergedData);
  console.log(filteredMergedData.length);
  // publication_YYYY_MM.htmlを読み込んでUIDを抽出する
  const htmlWoSIDs = await extractWoSIDsFromHtmlFiles();
  // 抽出したUIDとJSON結合データのUIDを比較し、一致するものにtrueを付与する
  const htmlWoSIDsExist = checkForHTMLWoSIDsExistence(
    filteredMergedData,
    htmlWoSIDs
  );
  // HTMLファイルに出力されていないWoSIDかつNHO著者の可能性のあるレコードを抽出する
  processRecordsWithNHOAuthors(htmlWoSIDsExist);
  // 結果を出力する

  //  console.log("処理が完了しました。");
  //} catch (error) {
  //  console.error("エラーが発生しました:", error);
  //}
}

// メインの処理を実行
main();
