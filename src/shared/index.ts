import { z } from "zod";

export const sharedAddValidation = z.object({
  content: z.string().min(1, "Type something!"),
  priority: z.enum(["GREEN", "RED", "ORANGE"]),
});
