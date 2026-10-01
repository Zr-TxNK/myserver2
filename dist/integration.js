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
// INTEGRATION TEST (Pure Math Logic)
// ทดสอบการเชื่อมต่อการทำงานร่วมกันระหว่าง 2 โมดูล:
// 1. Converter Module (แปลงหน่วยส่วนสูง cm -> m)
// 2. Utils Module (คำนวณสูตร BMI)
// ==========================================
// Pipeline ที่เชื่อมการทำงานระหว่าง Converter กับ Utils
function calculateBMIPipeline(weight, rawHeight) {
    // ขั้นตอนที่ 1: ส่งค่าไปแปลงหน่วยผ่าน Converter Module
    const heightInMeters = converter.toMeter(rawHeight);
    // ขั้นตอนที่ 2: นำผลลัพธ์จาก Converter Module ส่งต่อให้ Utils Module คำนวณสูตร
    const bmiResult = utils.calculateBMI(weight, heightInMeters);
    return bmiResult;
}
const integration_test = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("=== Running Integration Test (Pure Math Logic) ===");
    console.log("Testing data flow: Input -> Converter Module -> Utils Module -> Output\n");
    // Test Case 1: Input ส่วนสูงเป็นเซนติเมตร (175 cm, 70 kg)
    // Flow: 175 cm -> (Converter) -> 1.75 m -> (Utils) -> 70 / (1.75^2) = 22.86
    const test1Result = calculateBMIPipeline(50, 160);
    if (test1Result === 19.53) {
        console.log("Integration Test 1 passed : Pipeline(50 kg, 160 cm) === 19.53");
    }
    else {
        console.log(`Integration Test 1 failed : Expected 19.53 but got ${test1Result}`);
        process.exit(1);
    }
    // Test Case 2: Input ส่วนสูงเป็นเซนติเมตร (160 cm, 50 kg)
    // Flow: 160 cm -> (Converter) -> 1.60 m -> (Utils) -> 50 / (1.6^2) = 19.53
    const test2Result = calculateBMIPipeline(70, 230);
    if (test2Result === 13.23) {
        console.log("Integration Test 2 passed : Pipeline(50 kg, 160 cm) === 13.23");
    }
    else {
        console.log(`Integration Test 2 failed : Expected 13.23 but got ${test2Result}`);
        process.exit(1);
    }
    // Test Case 3: Input ส่วนสูงเป็นเมตรอยู่แล้ว (1.75 m, 70 kg)
    // Flow: 1.75 m -> (Converter) -> 1.75 m -> (Utils) -> 70 / (1.75^2) = 22.86
    const test3Result = calculateBMIPipeline(70, 1.75);
    if (test3Result === 22.86) {
        console.log("Integration Test 3 passed : Pipeline(70 kg, 1.75 m) === 22.86");
    }
    else {
        console.log(`Integration Test 3 failed : Expected 22.86 but got ${test3Result}`);
        process.exit(1);
    }
    const test4Result = calculateBMIPipeline(70, 2.35);
    if (test4Result === 12.68) {
        console.log("Integration Test 4 passed : Pipeline(70 kg, 235 cm) === 12.68");
    }
    else {
        console.log(`Integration Test 4 failed : Expected 12.68 but got ${test4Result}`);
        process.exit(1);
    }
    console.log("\nAll Integration Tests passed successfully!");
});
integration_test();
