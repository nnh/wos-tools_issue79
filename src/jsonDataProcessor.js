function extractRecordsFromRawJson(rawJson) {
  const recList = rawJson.map((e) => e["Data"]["Records"]["records"]["REC"]);

  const uidList = recList.flatMap((e) => e.map((e) => e["UID"]));
  const rec = recList.flat();
  // PMIDを取得しやすいキーにして添付する
  const recAndPmid = rec.map((e) => {
    const medlineData = e["dynamic_data"]["cluster_related"]["identifiers"][
      "identifier"
    ].filter((x) => x.type === "pmid");
    const pmid =
      medlineData.length > 0
        ? medlineData[0].value.replace("MEDLINE:", "")
        : "";
    e["PMID"] = pmid;
    return e;
  });
  // UID, PMID, addressNameのみを抽出したMapの配列を生成
  const addressNames = rec.map((e, idx) => {
    const addressName =
      e["static_data"]["fullrecord_metadata"]["addresses"]["address_name"];
    const addressNameList = !Array.isArray(addressName)
      ? [addressName]
      : addressName;
    const authorDataList = convertData(addressNameList);
    return new Map([
      ["UID", e["UID"]],
      ["PMID", e["PMID"]],
      ["addressName", authorDataList],
    ]);
  });
  return addressNames;
}

function mergeNamesAndAddress(data) {
  const names = data.names;
  const addressSpec = data.address_spec;
  const addressMap = new Map();
  const addrNo = addressSpec.addr_no;
  const addressData = new Map();
  addressData.set("country", addressSpec.country.toLowerCase());
  addressData.set("AD", addressSpec.full_address.toLowerCase());
  addressData.set("OO", mergeOrganizations(addressSpec));
  addressMap.set(addrNo, addressData);
  if (names === undefined) {
    return addressMap.get(addrNo);
  }
  const nameList = !Array.isArray(names.name) ? [names.name] : names.name;
  const nameAndAddressMap = new Map();
  nameList.forEach((name) => {
    const addresses = addressMap.get(name.addr_no);
    nameAndAddressMap.set("name", name.wos_standard);
    addresses.forEach((value, key) => nameAndAddressMap.set(key, value));
  });
  return nameAndAddressMap;
}

function mergeOrganizations(addressSpec) {
  if (addressSpec.organizations === undefined) {
    return "";
  }
  const organization = addressSpec.organizations.organization
    .filter((org) => org.pref === null)
    .map((org) => org.content.toLowerCase())
    .join("|");
  return organization;
}

function convertData(data) {
  return data.map((e) => mergeNamesAndAddress(e));
}
module.exports = {
  extractRecordsFromRawJson,
};
