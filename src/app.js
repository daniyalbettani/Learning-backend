import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
// The Job: This allows your backend to read JSON data sent by the frontend (for example, in a login form: {"email": "...", "password": "..."}).
// Why the limit: "16kb"? This is a security best practice. If a hacker tries to send a massive 10GB file to crash your server, Express will reject it because it's larger than 16 kilobytes.

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// The Job: Similar to JSON, but this allows your server to read data sent from traditional HTML forms (which format data like name=daniyal&age=20 instead of JSON).
// extended: true allows you to receive nested objects in the form data.

app.use(express.static("public"));
// The Job: This serves static files (like images, CSS files, and client-side JavaScript) directly from your "public" folder. If someone requests "/logo.png", this middleware will automatically look in the "public" folder and send it to the user.

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

export { app };
