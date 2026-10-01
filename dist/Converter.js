"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ==========================================
// MODULE 1: Converter (แปลงหน่วย)
// ==========================================
function toMeter(height) {
    if (height <= 0)
        return 0;
    // ถ้าค่ามากกว่า 3 ถือว่าเป็นเซนติเมตร (เช่น 175 cm) ให้แปลงเป็นเมตร (1.75 m)
    return height > 3 ? Number((height / 100).toFixed(4)) : height;
}
module.exports = {
    toMeter
};
