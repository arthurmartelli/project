import * as z from "zod"
import { CompleteReceipt, RelatedReceiptModel } from "./index"

export const ClientModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.number().int(),
  address_line1: z.string(),
  address_line2: z.string().nullish(),
  address_city: z.string(),
  address_state: z.string(),
  address_country: z.string(),
  address_zip: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteClient extends z.infer<typeof ClientModel> {
  receipts: CompleteReceipt[]
}

/**
 * RelatedClientModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedClientModel: z.ZodSchema<CompleteClient> = z.lazy(() => ClientModel.extend({
  receipts: RelatedReceiptModel.array(),
}))
