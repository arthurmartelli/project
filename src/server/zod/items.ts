import * as z from "zod"
import { CompleteReceipt, RelatedReceiptModel } from "./index"

export const ItemsModel = z.object({
  id: z.string(),
  receiptId: z.number().int().nullish(),
  category: z.string(),
  quantity: z.number().int(),
  description: z.string(),
  cost: z.number(),
  discount: z.number(),
  discountType: z.string(),
})

export interface CompleteItems extends z.infer<typeof ItemsModel> {
  receipt?: CompleteReceipt | null
}

/**
 * RelatedItemsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedItemsModel: z.ZodSchema<CompleteItems> = z.lazy(() => ItemsModel.extend({
  receipt: RelatedReceiptModel.nullish(),
}))
