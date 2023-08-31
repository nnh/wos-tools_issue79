// unpublishedUtils.js
const path = require("path");
const { convertToCsv, fileUtilsWriteFile } = require("./fileUtils");
const { facilityQueries } = require("./query");

const {
  getNonNHOFacilitiesFullAddress,
  getNonNHOFacilitiesOrganizations,
} = require("./nonNHOUtils");

function extractValuesFromArray(array, propertyName) {
  const extractedValues = [];
  for (const item of array) {
    extractedValues.push(
      ...item[propertyName].flatMap((value) =>
        !Array.isArray(value) ? new RegExp(value.toLowerCase()) : []
      )
    );
  }
  return extractedValues;
}

function getExcludedFacilities(record, excluedTarget, targetName) {
  return record
    .get("addressName")
    .map((address) => {
      // 日本以外の施設は除外
      if (address.get("country") !== "japan") {
        return null;
      }
      const excluded =
        excluedTarget.filter((excluededFacility) =>
          excluededFacility.test(address.get(targetName))
        ).length > 0
          ? null
          : address.get(targetName);

      return excluded;
    })
    .filter((e) => e !== null);
}

function getExcludedFullAddressFacilities(record) {
  return ["AD", "OO"].map((propertyName) => {
    const extractedValues = extractValuesFromArray(
      facilityQueries,
      propertyName
    );
    const nonNhoFacilities =
      propertyName === "AD"
        ? getNonNHOFacilitiesFullAddress()
        : getNonNHOFacilitiesOrganizations();
    const excludedFacilities = [...extractedValues, ...nonNhoFacilities];
    return getExcludedFacilities(record, excludedFacilities, propertyName);
  });
}

function setNHOAuthorFlag(targetData) {
  const body = targetData.map((e) => {
    const [ad, oo] = getExcludedFullAddressFacilities(e);

    const facilities = e
      .get("addressName")
      .map((address) => {
        if (/natl hosp org/.test(address.get("AD"))) {
          return `AD:${address.get("AD")}`;
        }
        if (
          /natl hosp org/.test(address.get("OO")) ||
          /NHO/.test(address.get("OO"))
        ) {
          return `OO:${address.get("OO")}`;
        }
        return null;
      })
      .filter((e) => e !== null);
    const uniqueFacilities = Array.from(new Set(facilities));
    return [
      e.get("UID"),
      e.get("PMID") === 0 ? "" : e.get("PMID"),
      uniqueFacilities.join("|"),
      e.get("DEP"),
      uniqueFacilities.length > 0,
      ad.filter((e) => e !== "").join("|"),
      Array.isArray(oo) ? oo.join("|") : oo,
    ];
  });
  return [
    [
      "WoSID",
      "PubMedID",
      "NHO施設名",
      "DEP",
      "NHO",
      "fullAddress",
      "organizations",
    ],
    ...body,
  ];
}

function processRecordsWithNHOAuthors(records, outputDir) {
  const unpublishedRecords = records.filter((e) => !e.get("hasHTMLWoSIDs"));
  const publishedRecords = records.filter((e) => e.get("hasHTMLWoSIDs"));
  console.log(unpublishedRecords.length);
  console.log(publishedRecords.length);
  processUnpublishedRecords(
    unpublishedRecords,
    path.join(outputDir, "unpublished.csv")
  );
  processPublishedRecords(
    publishedRecords,
    path.join(outputDir, "published.csv")
  );
}

function processUnpublishedRecords(records, outputPath) {
  const unpublishedRecordsWithNHOAuthorFlag = setNHOAuthorFlag(records);
  fileUtilsWriteFile(
    outputPath,
    convertToCsv(unpublishedRecordsWithNHOAuthorFlag)
  );
}
function processPublishedRecords(records, outputPath) {
  const publishedRecordsWithNHOAuthorFlag = setNHOAuthorFlag(records);
  //const dummyData = testFunction();
  fileUtilsWriteFile(
    outputPath,
    convertToCsv(publishedRecordsWithNHOAuthorFlag)
  );
}
module.exports = {
  processRecordsWithNHOAuthors,
};
