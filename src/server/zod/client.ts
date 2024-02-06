import * as z from "zod"
import { CompleteAddress, RelatedAddressModel, CompleteReceipt, RelatedReceiptModel } from "./index"

export const ClientModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteClient extends z.infer<typeof ClientModel> {
  Address?: CompleteAddress | null
  receipts: CompleteReceipt[]
}

/**
 * RelatedClientModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedClientModel: z.ZodSchema<CompleteClient> = z.lazy(() => ClientModel.extend({
  Address: RelatedAddressModel.nullish(),
  receipts: RelatedReceiptModel.array(),
}))
