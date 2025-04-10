# Website Speed Optimization Report for Zwarte Roes

**Date:** 2025-04-10

**Prepared For:** Marvin Antonius at Zwarte Roes
**Prepared By:** Milan Petrović / [wpspeedopt.net](wpspeedopt.net)

## 1. Introduction

This report details the website speed optimization work recently completed for your Shopify store, Zwarte Roes (zwarteroes.nl). The primary goal was to significantly improve loading speed, enhance user experience across devices, and boost Core Web Vitals metrics (LCP, CLS, INP). Particular attention was paid to addressing Cumulative Layout Shift (CLS) issues previously observed on product pages, alongside general optimizations for collections, blog articles, and other key templates.

The precise code changes implemented can be reviewed in the commit on GitHub:
[Commit Link](https://github.com/milllan/theme_export__zwarteroes-nl-coffee-store-ver-4-0-optimized-black-friday__04APR2025-1226pm/commit/90eb7d3b54c0586f32c6d7152389b519d8b9987d)

## 2. Summary of Work Performed

The optimization process involved a deep dive into the Zwarte Roes theme's code, assets, and loading strategies. Key areas addressed include:

*   **Advanced Image Loading:** Implementing modern techniques like native lazy loading, eager loading for critical images, async decoding, and responsive image formats (`srcset`, `sizes`, `<picture>`).
*   **CSS Optimization:** Streamlining CSS delivery, removing unused code (like Base64 flags), and leveraging modern CSS properties like `content-visibility` and `contain`.
*   **JavaScript Optimization:** Deferring script execution, loading libraries conditionally (like Swiper and Lazysizes), and optimizing third-party script loading (Clarity).
*   **Font Loading Strategy:** Optimizing how fonts (like `permanent-marker`) are declared and loaded.
*   **Asset Loading Strategy (`theme.liquid`):** Overhauling asset preloading and connection prioritization.
*   **Advanced Performance Techniques:** Implementing browser hints like prefetching and prerendering.
*   **Content & Template Optimization:** Optimizing image/video loading within blog articles and refining product grid rendering.
*   **Code Cleanup & Refinement:** Removing unused code and refining HTML/Liquid structures.

## 3. Detailed Breakdown of Changes (Based on Diff Analysis)

### Image Optimization (Major Focus)

*   **Native Lazy Loading:** Replaced JavaScript-based lazy loading with native HTML `loading="lazy"` across numerous sections (`banner`, `feature-columns`, `footer`, `story`, `text-and-image`, `product-grid-item`, `product-images`, etc.).
    *   **Impact:** Reduces reliance on JavaScript, leading to faster initial load and less JS execution.
*   **LCP Image Prioritization:** Targeted key images (e.g., main banner image, featured product image on pages like `/products/blendno1`) using `loading="eager"` and `fetchpriority="high"`. The main layout (`theme.liquid`) now intelligently applies these attributes to the first critical images.
    *   **Impact:** Directly improves the Largest Contentful Paint (LCP) metric.
*   **Asynchronous Decoding:** Added `decoding="async"` attribute to images.
    *   **Impact:** Allows browsers to decode images without blocking rendering.
*   **Responsive Images (`srcset` & `sizes`, `<picture>`):** Implemented or refined `srcset` and `sizes` for many images (article content, section backgrounds, product grids) using Shopify's `image_tag` or Liquid logic. Used `<picture>` for the footer background.
    *   **Impact:** Ensures browsers download appropriately sized images, saving bandwidth.
*   **Explicit Dimensions:** Added `width` and `height` attributes to several static images and refined container CSS.
    *   **Impact:** Helps prevent Cumulative Layout Shift (CLS), especially important for product pages.
*   **Removed Base64 Flags:** Deleted large Base64-encoded flag images from `assets/currency-flags.css`.
    *   **Impact:** Significantly reduced the size of this CSS file.

### CSS & Rendering Optimization

*   **`content-visibility` & `contain`:** Applied these modern CSS properties to elements often hidden initially (modals, drawers, search, megamenus, utility classes like `.hide`/`.show`).
    *   **Impact:** Improves rendering performance by allowing the browser to skip work for hidden content until needed.
*   **Collection Page Rendering:** Added `contain: content` and `content-visibility: auto` styles to the product grid container (`snippets/collection-template.liquid`).
    *   **Impact:** Optimizes rendering performance on pages with many products (e.g., `/collections/accessoires`).
*   **Font Loading:** Optimized `@font-face` for `permanent-marker` in `snippets/font-face.liquid` using `font-display: swap` and efficient `.woff2` format. Added conditional font preloads/preconnects in `theme.liquid`.
    *   **Impact:** Improves font loading speed and reduces layout shifts (CLS).

### JavaScript & Script Loading Optimization

*   **Deferred Execution:** Ensured main theme JavaScript files (`theme.min.js`, `custom.js`) use `defer="defer"`.
    *   **Impact:** Prevents scripts from blocking HTML parsing.
*   **Conditional Library Loading (Swiper & Lazysizes):** Modified Swiper and Lazysizes to load *only* when their respective elements are near the viewport, using IntersectionObserver. Corrected Swiper initialization.
    *   **Impact:** Reduces initial page weight and JS execution by loading heavy libraries only when necessary.
*   **Third-Party Script Optimization (Clarity & DebugBear):** Delayed Clarity tracking load. Added DebugBear RUM script for performance monitoring (conditionally excluded in design mode).
    *   **Impact:** Reduces the impact of third-party scripts on initial load and Core Web Vitals.
*   **Removed Unused Scripts:** Cleaned up commented-out/legacy scripts.

### Advanced Performance Techniques

*   **Prerendering (Speculation Rules):** Added JavaScript in `theme.liquid` to leverage the Speculation Rules API in Chrome, hinting the browser to prerender pages likely to be visited next.
    *   **Impact:** Can lead to near-instantaneous loading for subsequent page navigations for Chrome users.
*   **Prefetching (Quicklink):** Added JavaScript to load Quicklink library on interaction/scroll to prefetch in-viewport links during browser idle time.
    *   **Impact:** Speeds up subsequent page loads.

### Content & Template Optimization

*   **Article Content (e.g., Sage Barista guide):** Implemented logic in `sections/article-template.liquid` to automatically generate responsive `srcset`/`sizes` for inline article images and replaced standard YouTube iframes with the performant `lite-youtube-embed` component.
    *   **Impact:** Significantly improves load times and reduces page weight on blog posts.
*   **Layout Refinements (`theme.liquid`):** Adjusted the main layout structure for potentially optimized rendering order.

### Monitoring & Cleanup

*   Integrated DebugBear RUM for real-user performance monitoring.
*   Removed development-specific files/settings.

## 4. Expected Impact

These optimizations are expected to deliver substantial improvements for Zwarte Roes:

*   **Faster Load Times:** Noticeable across the site, especially visually heavy pages.
*   **Improved Core Web Vitals:** Targeting significant gains in LCP, INP, and CLS (particularly on product pages).
*   **Reduced Page Weight:** Lowering bandwidth consumption.
*   **Smoother User Experience:** Faster interactions, less layout shift, quicker navigation.
*   **Potential SEO Boost:** Improved performance metrics are a positive signal for search engines.

## 5. Verification & Measurement

We strongly recommend testing the performance improvements on the following key pages using the tools mentioned:

1.  **Homepage:** [https://zwarteroes.nl/](https://zwarteroes.nl/)
2.  **Product Page (Example):** [https://zwarteroes.nl/collections/koffiebonen/products/blendno1](https://zwarteroes.nl/collections/koffiebonen/products/blendno1)
3.  **Collection Page (Example):** [https://zwarteroes.nl/collections/accessoires](https://zwarteroes.nl/collections/accessoires)
4.  **Blog Post (Example):** [https://zwarteroes.nl/blogs/koffietips/sage-barista-express-pro-instellen](https://zwarteroes.nl/blogs/koffietips/sage-barista-express-pro-instellen)

**Tools:**

*   **Google PageSpeed Insights:** [https://pagespeed.web.dev/](https://pagespeed.web.dev/) - Check both Mobile and Desktop scores and Core Web Vitals.
*   **GTmetrix:** [https://gtmetrix.com/](https://gtmetrix.com/) - Analyze the detailed loading waterfall.
*   **Real User Monitoring (RUM):** Monitor the DebugBear dashboard for ongoing real-world performance data.
*   **Average CLS:**  already improved in CRuX data https://cruxvis.withgoogle.com/#/?view=cwvsummary&url=https%3A%2F%2Fzwarteroes.nl%2F&identifier=origin&device=PHONE&periodStart=0&periodEnd=-1&display=p75s


*Optional: Add before/after scores if available (e.g., "Previously, the Blend No1 product page scored X on Mobile CLS..."). We recommend running tests now on these specific URLs.*

## 6. Next Steps & Recommendations

1.  **Monitoring:** Closely monitor performance using DebugBear and periodic checks with PageSpeed Insights/GTmetrix on zwarteroes.nl.
2.  **App Audit:** Periodically review installed Shopify apps for performance impact.
3.  **Client Review:** Please test zwarteroes.nl thoroughly, paying particular attention to the example pages provided, on different devices and browsers.

## 7. Conclusion

This optimization project implemented a range of modern techniques targeting image loading, CSS/JS delivery, and browser hints specifically for the Zwarte Roes website. By addressing key templates like product pages (including the noted CLS issues), collections, and articles, we have significantly enhanced the store's technical foundation for speed, user experience, and Core Web Vitals.

I am confident you will see positive results on zwarteroes.nl. Please reach out with any questions or feedback.

---

**Sincerely,**

Milan Petrović - wpspeedopt.net
milan.petrovic@wpspeedopt.net
