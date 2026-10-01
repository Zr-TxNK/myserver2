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
const converter = require("./Converter");
const utils = require("./Utils");
// ==========================================
// UNIT TEST
// ทดสอบแต่ละโมดูลแยกชิ้นกันอย่างอิสระ (Isolated Testing)
// ==========================================
const unit_test = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("=== Running Unit Test ===");
    // 1. Unit Test สำหรับ Converter Module (ทดสอบเฉพาะการแปลงหน่วย)
    const meterResult = converter.toMeter(160);
    if (meterResult === 1.6) {
        console.log("Unit Test 1 passed : converter.toMeter(160 cm) === 1.6 m");
    }
    else {
        console.log(`Unit Test 1 failed : Expected 1.6 but got ${meterResult}`);
        process.exit(1);
    }
    // 2. Unit Test สำหรับ Utils Module (ทดสอบเฉพาะสูตรคณิตศาสตร์ BMI โดยส่งเมตรเข้าไปตรงๆ)
    const bmiResult = utils.calculateBMI(70, 1.75);
    if (bmiResult === 22.86) {
        console.log("Unit Test 2 passed : utils.calculateBMI(70 kg, 1.75 m) === 22.86");
    }
    else {
        console.log(`Unit Test 2 failed : Expected 22.86 but got ${bmiResult}`);
        process.exit(1);
    }
    const bmiResult2 = utils.calculateBMI(50, 1.6);
    if (bmiResult2 === 19.53) {
        console.log("Unit Test 3 passed : utils.calculateBMI(50 kg, 1.6 m) === 19.53");
    }
    else {
        console.log(`Unit Test 3 failed : Expected 19.53 but got ${bmiResult2}`);
        process.exit(1);
    }
    console.log("\nAll Unit Tests passed successfully!");
});
unit_test();
