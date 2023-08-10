module.exports = () => {
  revision = require("child_process")
    .execSync("git rev-parse HEAD")
    .toString()
    .trim()
    .slice(0, 7);

  return {
    hash: revision,
  };
};
