# DECISIONS.md

## The open questions I noticed

### Images

Fakestoreapi gives you one image per product. That's it. No gallery, no alternate angles, nothing you'd actually put on a real PDP. I pulled extra images from Unsplash and mapped them manually to each product. Not something you'd do in production — in a real project these would come from a CDN or a proper media object in the API — but the alternative was shipping a gallery component with a single image in it, which defeats the point of building a gallery.

### Size, color, quantity, discount

None of this comes from the API. Fakestoreapi gives you a title, a price, a description, and a rating. That's the whole product object. So size options, color swatches, stock quantity, and the sale price are all static data I defined locally. The component logic that reads from it — disabled sold-out buttons, quantity cap, crossed-out original price — is real and would connect to an actual API without rewriting anything. But yeah, the data itself is fake.

### Tabs vs accordion

Tabs on desktop, accordion on mobile. I didn't want to pick one globally because they solve different problems. On desktop you have horizontal space — tabs sit at the top, one click, no page jump. On mobile that same tab bar gets tight and the jump between panels feels jarring in a single-column scroll. Accordion just fits better there. Same underlying component, different layout controlled by a media query.

### Image zoom

The spec says "image should support zoom on hover — but read the open questions section." There is no open questions section. I took that as intentional and made a call: CSS scale transform on hover, nothing more. Adding a real cursor-tracked zoom — where the zoom origin follows your mouse around the image — would need a `useMousePosition` hook and some coordinate math. Didn't feel worth the time given everything else the core spec needed, so I kept it simple and moved on.

---

## The hardest call: what to do about missing API data

This was the thing I kept coming back to. When the API doesn't give you what the spec requires, you have a few options. You could swap to a different API that actually has this data. You could build a mock API layer. You could just hardcode it and be upfront about it.

I went with hardcoded static data. My reason: this is a frontend assignment, not an API integration task. What they're evaluating is whether I can build the UI states correctly — sold out, low stock, on sale, quantity cap. For that, the data source doesn't matter much, as long as the components consuming it are wired up properly. A more complete API would just mean swapping the data file for a fetch call, the component logic stays the same.

The thing I'd do differently: I'd have been more deliberate about the shape of that local data from the start. I added fields as I needed them and the structure got a bit messy by the end. A cleaner approach would've been to define the full product type in TypeScript first and work backwards from there.

---

## What I'd clean up with more time

The zoom. What's there now is a `scale(1.1)` on hover with a CSS transition. It looks fine but it's not real zoom — you can't follow a specific part of the image with your cursor. That would've taken another couple of hours and I made a call to ship the other states correctly instead. If I picked it back up, I'd write a small hook that tracks mouse position relative to the image bounds and uses `transform-origin` dynamically.
