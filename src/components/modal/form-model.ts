import { z } from "zod";

/**
 * Example phone numbers:
 * "+1-123-456-7890"
 * "0123456789"
 * "+44-123456789"
 * "0049-987654321"
 * "08001234567"
 */
const phoneNumberRegex = /^(?:\+|0)[0-9]{1,3}-?[0-9]{4,14}$/;

export const basicSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  name: z.string().min(1, "Please enter your name."),
});

export type TBasicSchemaType = z.infer<typeof basicSchema>;

export const standardSchema = basicSchema.extend({
  phoneNumber: z
    .string()
    .regex(phoneNumberRegex, "Please enter a valid phone number."),
});

export type TStandardSchemaType = z.infer<typeof standardSchema>;

export const premiumSchema = standardSchema.extend({
  company: z.string().min(1, "Please enter your company name."),
});

export type TPremiumType = z.infer<typeof premiumSchema>;
