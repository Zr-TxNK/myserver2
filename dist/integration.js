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
const express = require("express");
// ==========================================
// INTEGRATION TEST
// ทดสอบระบบจริง: ส่ง Request เข้า Express Web Server -> ดึงค่า Query -> คำนวณ BMI ผ่าน Utils -> ส่ง JSON ตอบกลับ
// ==========================================
const integration_test = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("=== Running Integration Test (BMI API) ===");
    const app = express();
    const TEST_PORT = 3999;
    // Route API คำนวณ BMI ที่เชื่อมการทำงานระหว่าง Express กับ utils.calculateBMI
    app.get("/api/bmi", (req, res) => {
        const weight = parseFloat(req.query.weight);
        const height = parseFloat(req.query.height);
        if (isNaN(weight) || isNaN(height)) {
            return res.status(400).json({ error: "Invalid weight or height parameters" });
        }
        // นำค่าไปคำนวณผ่าน Utils (จุด Integration ระหว่าง Web API กับ Module)
        const bmi = utils.calculateBMI(weight, height);
        res.json({
            weight: weight,
            height: height,
            bmi: bmi
        });
    });
    // เริ่มต้นเปิด Server จำลอง
    const server = app.listen(TEST_PORT);
    try {
        // ยิง HTTP Request จริงไปที่ /api/bmi?weight=70&height=1.75
        const response = yield fetch(`http://localhost:${TEST_PORT}/api/bmi?weight=70&height=1.75`);
        const data = yield response.json();
        // ตรวจสอบว่า Status 200 และได้ค่า BMI คำนวณถูกต้องตามสูตร (22.86)
        if (response.status === 200 && data.bmi === 22.86) {
            console.log("Integration Test passed : API /api/bmi returned Status 200 and BMI = 22.86");
            console.log("Response data :", JSON.stringify(data));
        }
        else {
            console.log("Integration Test failed : Unexpected response", data);
            server.close();
            process.exit(1);
        }
    }
    catch (error) {
        console.log("Integration Test failed with error :", error);
        server.close();
        process.exit(1);
    }
    finally {
        // ปิด Server จำลองเมื่อทดสอบเสร็จ
        server.close();
    }
});
integration_test();
