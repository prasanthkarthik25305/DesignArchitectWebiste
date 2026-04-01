import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ error: "Validation failed", details: parsed.error.message });
    return;
  }

  const { name, phone, service, message } = parsed.data;

  try {
    await db.insert(contactsTable).values({ name, phone, service, message });
    const response = SubmitContactResponse.parse({
      success: true,
      message: "Thank you for contacting us! We will get back to you within 24 hours.",
    });
    res.json(response);
  } catch (err) {
    req.log.error({ err }, "Failed to save contact");
    res.status(500).json({ error: "Failed to save your inquiry. Please try again." });
  }
});

export default router;
