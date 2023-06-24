import { z } from 'zod'

export const User = z.object({
  name: z.string(),
  id: z.string().uuid(),
  email: z.string().email(),
})

export const Events = z.object({
  transforms: z.array(
    z.object({
      key: z.string(),
      formats: z.array(z.string()),
      resize: z.object({
        width: z.number().optional(),
        height: z.number().optional(),
        fit: z.string().optional(),
      }),
    })
  ),
  groups: z.record(
    z.object({
      city: z.string(),
      country: z.string(),
      description: z.string(),
      events: z.array(
        z.object({
          description: z.string(),
          duration: z.number().int(),
          feeSettings: z.any(),
          id: z.string(),
          image: z.object({
            file: z.string(),
            res: z.array(z.tuple([z.number().int(), z.number().int()])),
            corners: z.array(z.string()),
          }),
          maxTickets: z.number(),
          numberOfAllowedGuests: z.number(),
          time: z.number().int(),
          title: z.string(),
          topics: z.array(z.string()),
          venue: z.string(),
        })
      ),
      foundedAt: z.number(),
      lat: z.number(),
      lng: z.number(),
      name: z.string(),
      organizer: z.string(),
      state: z.string(),
      timezone: z.string(),
      urlname: z.string(),
      welcomeBlurb: z.string(),
      zip: z.string(),
    })
  ),
  venues: z.array(
    z.object({
      address: z.string(),
      city: z.string(),
      crossStreet: z.string().nullable(),
      id: z.string(),
      lat: z.number(),
      lng: z.number(),
      name: z.string(),
      postalCode: z.string(),
      state: z.string(),
    })
  ),
})
