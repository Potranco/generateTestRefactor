import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { generarTest } from "./controlers/testGenerate.js";
import { generarRefactor } from "./controlers/refactorGenerate.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/api/test", generarTest);
app.post("/api/refactor", generarRefactor);

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ API activa en http://localhost:${PORT}`));
