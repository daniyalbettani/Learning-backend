import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
); // MIDDLEware : 1 => Configure access handlers, like who is going to access the backend.

app.use(cookieParser()); // MIDDLEWARE:2 => Parses Cookies into req.cookies, or converting raw string,text into clean javascript object.

// --- ROUTE HANDLER (Final Destination) ---
app.get("/dashboard", (req, res) => {
  // By the time the request gets here, the cookies are already parsed!
  const token = req.cookies.sessionToken;
  res.json({ message: "Welcome to your dashboard!" });
});

export { express };
