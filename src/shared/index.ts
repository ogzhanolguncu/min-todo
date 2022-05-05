import { z } from "zod";

export const sharedAddValidation = z.object({
  content: z.string().min(1).max(100),
  priority: z.enum(["GREEN", "RED", "ORANGE"]),
});
