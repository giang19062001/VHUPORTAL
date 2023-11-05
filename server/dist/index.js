"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.get("/", (req, res) => {
    res.send("hellosadda");
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app listening on PORT ${port}`));
