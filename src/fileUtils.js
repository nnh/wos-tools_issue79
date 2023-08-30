// fileUtils.js

const fs = require("fs");
const path = require("path");
const { parseISO } = require("date-fns");
const { getPubMedMetadata } = require("./pubmedApiUtils");

async function fileUtilsWriteFile(outputPath, content) {
  try {
    const directoryPath = path.dirname(outputPath);
    await fs.promises.mkdir(directoryPath, { recursive: true });
    await fs.promises.writeFile(outputPath, content, "utf8");
    console.log("File saved:", outputPath);
  } catch (error) {
    console.error("Error saving file:", error);
  }
}

function getLatestDateFolder(
  dataFolderPath = path.join(__dirname, "data"),
  testRegExp = /^\d{4}-\d{2}-\d{2}$/
) {
  const folders = fs.readdirSync(dataFolderPath);
  const dateFolders = folders.filter((folder) => {
    const folderPath = path.join(dataFolderPath, folder);
    return fs.lstatSync(folderPath).isDirectory() && testRegExp.test(folder);
  });
  const sortedFolders = dateFolders.sort((a, b) => parseISO(b) - parseISO(a));
  if (sortedFolders.length === 0) {
    throw new Error("No date folders found in the data directory.");
  }
  return path.join(dataFolderPath, sortedFolders[0]);
}
/**
 * PubMedのXMLデータを読み込みます。
 * ローカルのファイルが存在する場合はそれを読み込み、存在しない場合はgetPubMedMetadata関数を呼び出してデータを取得します。
 * @param {Array} pmidArray PubMedのPMID配列
 * @returns {string} PubMedのXMLデータ
 */
async function readPubMedXml(pmidArray) {
  const outputPath = path.join(__dirname, "..", "output");
  const filename = "pubmed.xml";
  const pubmedDataPath = path.join(outputPath, filename);

  const pubmedData = fs.existsSync(pubmedDataPath)
    ? fs.readFileSync(pubmedDataPath, "utf8")
    : await getPubMedMetadata(pmidArray, outputPath, filename);
  if (!fs.existsSync(pubmedDataPath)) {
    fileUtilsWriteFile(pubmedDataPath, pubmedData);
  }
  return pubmedData;
}

function readRawJson(inputDir) {
  const inputDirectory = getLatestDateFolder(inputDir);
  const rawJsonPath = path.join(inputDirectory, "raw.json");
  const rawJsonData = fs.readFileSync(rawJsonPath, "utf8");
  const rawJson = JSON.parse(rawJsonData);
  return rawJson;
}

async function extractWoSIDsFromHtmlFiles() {
  const inputDirectory = getLatestDateFolder(
    getLatestDateFolder(),
    /(?<=result_)\d{14}/
  );
  const files = await fs.promises.readdir(inputDirectory);

  const htmlFiles = files.filter(
    (file) => file.startsWith("publication") && file.endsWith(".html")
  );

  const allMatches = htmlFiles.map(async (htmlFile) => {
    const filePath = path.join(inputDirectory, htmlFile);
    const htmlContent = await fs.promises.readFile(filePath, "utf8");
    const regex = /WOS:\d{15}/g;
    const matches = htmlContent.match(regex);
    return matches;
  });

  const results = await Promise.all(allMatches);
  const mergedMatches = results.flat();
  const uniqueWoSIDs = new Set(mergedMatches);

  return uniqueWoSIDs;
}

function convertToCsv(data, header = false) {
  // ヘッダー行の生成
  const headers = header ? Object.keys(data[0]) : data[0];
  const body = header ? data : data.slice(1);
  const sortData = sortDataByDepAndNho(headers, body);
  // データ行の生成
  const csvRows = sortData.map((row) => {
    const values = Object.values(row);
    const escapedValues = values.map((value) => escapeCsvValue(value));
    return escapedValues.join(",");
  });

  // ヘッダー行とデータ行を結合してCSV形式の文字列を生成

  return csvRows.join("\n");
}

// CSV形式でエスケープする関数
function escapeCsvValue(value) {
  if (typeof value === "string" && value.includes(",")) {
    // 文字列内にカンマが含まれる場合、ダブルクォーテーションで囲む
    return `"${value}"`;
  } else {
    return value;
  }
}

function sortDataByDepAndNho(header, body) {
  const targetColumnNames = ["DEP", "NHO"];
  const keyIndexMap = new Map(
    targetColumnNames.map((columnName) => [
      columnName,
      header.findIndex((e) => e === columnName),
    ])
  );
  // 見出し行を除外してソート
  const sortedData = body.sort((a, b) => {
    const key1A = a[keyIndexMap.get(targetColumnNames[0])];
    const key1B = b[keyIndexMap.get(targetColumnNames[0])];
    const key2A = a[keyIndexMap.get(targetColumnNames[1])];
    const key2B = b[keyIndexMap.get(targetColumnNames[1])];

    // NHOで降順ソート
    if (key2A && !key2B) {
      return -1;
    } else if (!key2A && key2B) {
      return 1;
    }

    // NHOが同じ場合はDEPで昇順ソート
    if (key1A !== "" && key1B !== "") {
      if (key1A < key1B) {
        return -1;
      } else if (key1A > key1B) {
        return 1;
      }
    } else if (key1A !== "") {
      return -1;
    } else if (key1B !== "") {
      return 1;
    }

    return 0;
  });

  return [header, ...sortedData];
}

module.exports = {
  readRawJson,
  readPubMedXml,
  extractWoSIDsFromHtmlFiles,
  convertToCsv,
};
