"use strict";
function hello() {
    console.log("Hello world");
}
function calculateBMI(weight, height) {
    // ถ้าใส่ส่วนสูงเป็นเซนติเมตร (เช่น 170) จะแปลงเป็นเมตร (1.70) ให้อัตโนมัติ
    const h = height > 3 ? height / 100 : height;
    if (h <= 0)
        return 0;
    const bmi = weight / (h * h);
    return Number(bmi.toFixed(2));
}
module.exports = {
    hello,
    calculateBMI
};
