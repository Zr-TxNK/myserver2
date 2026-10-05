"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const Utils_1 = require("./Utils");
// Unit test using standard assertions (NO if-else, NO manual process.exit)
const unit_test = () => {
    console.log("Running Unit Tests with node:assert (No if-else assertions)...");
    // test1 & test2: add
    node_assert_1.default.strictEqual(Utils_1.Utils.add(1, 2), 3, "add(1, 2) should be 3");
    node_assert_1.default.strictEqual(Utils_1.Utils.add(-1, 1), 0, "add(-1, 1) should be 0");
    // test3: helloworld
    node_assert_1.default.strictEqual(Utils_1.Utils.helloworld(), "hello world", 'helloworld() should be "hello world"');
    // test4: emailCases
    const emailCases = [
        ["a@camt.info", true],
        ["john.doe+tag@example.co.th", true],
        ["", false],
        ["no-at-sign.com", false],
        ["missing@domain", false],
        ["@camt.info", false],
        ["two@@camt.info", false],
        ["has space@camt.info", false],
    ];
    for (const [input, expected] of emailCases) {
        node_assert_1.default.strictEqual(Utils_1.Utils.isValidEmail(input), expected, `isValidEmail("${input}") should be ${expected}`);
    }
    // test5: ageCases
    const ageCases = [
        [7, true],
        [1, true],
        [120, true],
        [0, false],
        [-5, false],
        [121, false],
        [7.5, false],
        [NaN, false],
    ];
    for (const [input, expected] of ageCases) {
        node_assert_1.default.strictEqual(Utils_1.Utils.isValidAge(input), expected, `isValidAge(${input}) should be ${expected}`);
    }
    console.log("✅ Test1 passed (All assertions succeeded without any if-else)");
};
unit_test();
