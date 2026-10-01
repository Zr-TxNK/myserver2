"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("./Utils");
// ==========================================
// UNIT TEST
// ทดสอบเฉพาะตัวฟังก์ชัน calculateBMI และ add โดดๆ
// ==========================================
const unit_test = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("=== Running Unit Test ===");
    // Test BMI: น้ำหนัก 70 kg, ส่วนสูง 1.75 m -> BMI = 70 / (1.75 * 1.75) = 22.86
    const bmiResult = utils.calculateBMI(70, 1.75);
    if (bmiResult === 22.86) {
        console.log("Unit Test 2 passed : utils.calculateBMI(70, 1.75) === 22.86");
    }
    else {
        console.log(`Unit Test 2 failed : Expected 22.86 but got ${bmiResult}`);
        process.exit(1);
    }
    // Test BMI ส่วนสูงเป็นเซนติเมตร: 50 kg, 160 cm -> BMI = 50 / (1.6 * 1.6) = 19.53
    const bmiCmResult = utils.calculateBMI(50, 160);
    if (bmiCmResult === 19.53) {
        console.log("Unit Test 3 passed : utils.calculateBMI(50, 160) === 19.53");
    }
    else {
        console.log(`Unit Test 3 failed : Expected 19.53 but got ${bmiCmResult}`);
        process.exit(1);
    }
    console.log("\nAll Unit Tests passed successfully!");
});
unit_test();
