"use strict";

const blockNoEmpty = require("../rules/block-no-empty");
const configBlockNoEmpty = require("./fixtures/config-block-no-empty");
const standalone = require("../standalone");

jest.mock("../rules/block-no-empty");

blockNoEmpty.mockImplementation(() => {
  return (root, result) => {
    result.warn("Some deprecation", {
      stylelintType: "deprecation"
    });
  };
});

describe("standalone with deprecations", () => {
  it("works", () => {
    standalone({
      code: "a {}",
      config: configBlockNoEmpty
    }).then(data => {
      expect(data.output.indexOf("Some deprecation")).not.toBe(-1);
      expect(data.results.length).toBe(1);
      expect(data.results[0].deprecations.length).toBe(1);
      expect(data.results[0].deprecations[0].text).toBe("Some deprecation");
    });
  });
});
