const OrgContract = artifacts.require("HashStorage");
contract("OrgContract", (accounts) => {
  let integrityContract;

  before(async () => {
    integrityContract = await OrgContract.new();
  });

  const orgHash = "0x456def";

  it("should add asset and create OrgContract", async () => {
    const transaction = await integrityContract.storeHash(orgHash);
    console.log("sandeep", transaction);
    // orgContractAddress = await integrityContract.Orgaddress(assetId);
    // const orgContractInstance = await OrgContract.at(orgContractAddress);
    const retrievedOrgHash = await integrityContract.getAllHashes();
    // const retrievedOrgName = await integrityContract.orgName();
    // const set = await integrityContract.allassets(0);
    // console.log(transaction);
    // assert.equal(retrievedOrgHash, orgHash, "Organization hash does not match");
    // assert.equal(retrievedOrgName, orgName, "Organization name does not match");
    console.log("sandeep", retrievedOrgHash);
  });
});
