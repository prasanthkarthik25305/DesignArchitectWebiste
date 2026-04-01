import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { db } from "@workspace/db";

const router: IRouter = Router();

router.get("/healthz", async (_req, res) => {
  try {
    // Test database connection with simple query
    await db.execute("SELECT 1");
    const data = HealthCheckResponse.parse({ status: "ok", database: "connected" });
    res.json(data);
  } catch (err: any) {
    console.error("Database connection error:", err);
    res.status(500).json({ status: "error", database: "failed", error: err.message });
  }
});

export default router;
