import * as z from "zod"
import { CompleteClient, RelatedClientModel, CompleteItems, RelatedItemsModel } from "./index"

export const ReceiptModel = z.object({
  id: z.number().int(),
  clientId: z.string(),
  clientEmail: z.string(),
  notes: z.string().nullish(),
  discount: z.number(),
  discount_type: z.string(),
  taxes: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteReceipt extends z.infer<typeof ReceiptModel> {
  client: CompleteClient
  items: CompleteItems[]
}

/**
 * RelatedReceiptModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReceiptModel: z.ZodSchema<CompleteReceipt> = z.lazy(() => ReceiptModel.extend({
  client: RelatedClientModel,
  items: RelatedItemsModel.array(),
}))
