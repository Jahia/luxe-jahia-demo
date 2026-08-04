const AdmZip = require("adm-zip");
const { globSync } = require("glob");
const path = require("path");

// Both values end up in filesystem paths under ./artifacts; reject anything
// that could escape it (zip-slip / path traversal).
const assertSafeRelativePath = (value, name) => {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    path.isAbsolute(value) ||
    value.split(/[\\/]+/).includes("..")
  ) {
    throw new Error(`Unsafe ${name}: ${value}`);
  }
};

const unzipArtifact = ({ artifactFilename, filteredPath }) => {
  assertSafeRelativePath(artifactFilename, "artifactFilename");
  assertSafeRelativePath(filteredPath, "filteredPath");

  const files = globSync("./artifacts/" + artifactFilename);
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
