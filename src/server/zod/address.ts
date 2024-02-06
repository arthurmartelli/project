import * as z from "zod"
import { CompleteClient, RelatedClientModel } from "./index"

export const AddressModel = z.object({
  id: z.string(),
  line1: z.string(),
  line2: z.string().nullish(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip: z.string(),
  clientId: z.string(),
})

export interface CompleteAddress extends z.infer<typeof AddressModel> {
  client: CompleteClient
}

/**
 * RelatedAddressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAddressModel: z.ZodSchema<CompleteAddress> = z.lazy(() => AddressModel.extend({
  client: RelatedClientModel,
}))
