// frontend/src/lib/schemas.ts
import { z } from "zod";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILE_TYPES = ["text/csv", "application/json"];

export const UploadSchema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, "Please upload a file.")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 50MB.")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only CSV or JSON files are supported."
    ),
});

export const AIF360ResponseSchema = z.object({
  disparateImpact: z.number(),
  statisticalParityDifference: z.number(),
  equalOpportunityDifference: z.number(),
});
