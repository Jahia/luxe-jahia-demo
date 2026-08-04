const AdmZip = require("adm-zip");
const glob = require("glob");

const unzipArtifact = ({ artifactFilename, filteredPath }) => {
  const files = glob.sync("./artifacts/" + artifactFilename);
  if (files.length === 0) {
    throw new Error(`No files found matching pattern: ${artifactFilename}`);
  }
  const zip = new AdmZip(files[0]);
  if (!zip.getEntry(filteredPath)) {
    throw new Error(`Entry not found in ${files[0]}: ${filteredPath}`);
  }
  // Same layout as the previous decompress-based implementation: the entry is
  // extracted under ./artifacts with its archive path preserved.
  zip.extractEntryTo(filteredPath, "./artifacts", true, true);
  return null;
};

module.exports = {
  unzipArtifact,
};
