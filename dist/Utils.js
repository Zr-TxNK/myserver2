"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ==========================================
// MODULE 2: Utils (คำนวณสูตร BMI Pure Math)
// ==========================================
function hello() {
    console.log("Hello world");
}
// คำนวณ BMI ตามสูตรคณิตศาสตร์เพียวๆ: น้ำหนัก (kg) / (ส่วนสูง (m) ^ 2)
function calculateBMI(weight, heightInMeters) {
    if (heightInMeters <= 0 || weight <= 0)
        return 0;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Number(bmi.toFixed(2));
}
module.exports = {
    hello,
    calculateBMI
};
