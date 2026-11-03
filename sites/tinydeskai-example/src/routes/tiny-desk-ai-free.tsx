import { pageHead } from '@shipwords/core/seo';
import { createFileRoute, Link } from '@tanstack/react-router';
import { m } from '~/paraglide/messages.js';
import { Faq, type FaqItem, faqJsonLd, GuidePage } from '~/site/guide';
import { formatPrice, packName, perVideo } from '~/site/pricing';
import site from '../../site.config';

// Free and comparison page: targets "tiny desk ai free", "free online" and "best tiny desk ai generator".
// Organized by the visitor's questions: what the free ways are, what the first paid video costs, which to pick. State other sites' free first video and free preview accurately
// (ChatGPT checks this page against the competitors it finds and won't cite it if it is wrong); when prices change, update this file and guides_free_checked.

const PATH = '/tiny-desk-ai-free';

const freeWays = () => [
  {
    name: m.guides_free_way_capcut_name(),
    get: m.guides_free_way_capcut_get(),
    catch: m.guides_free_way_capcut_catch(),
  },
  {
    name: m.guides_free_way_first_name(),
    get: m.guides_free_way_first_get(),
    catch: m.guides_free_way_first_catch(),
  },
  {
    name: m.guides_free_way_preview_name(),
    get: m.guides_free_way_preview_get(),
    catch: m.guides_free_way_preview_catch(),
  },
  {
    name: m.guides_free_way_credits_name(),
    get: m.guides_free_way_credits_get(),
    catch: m.guides_free_way_credits_catch(),
  },
  {
    name: m.guides_free_way_diy_name(),
    get: m.guides_free_way_diy_get(),
    catch: m.guides_free_way_diy_catch(),
  },
];

const faq = (): FaqItem[] => [
  {
    q: m.guides_free_faq1_q(),
    a: m.guides_free_faq1_a({ site: site.name, price: formatPrice(site.products[0]) }),
  },
  { q: m.guides_free_faq2_q(), a: m.guides_free_faq2_a() },
  { q: m.guides_free_faq3_q(), a: m.guides_free_faq3_a() },
  {
    q: m.guides_free_faq4_q(),
    a: m.guides_free_faq4_a({ site: site.name, price: formatPrice(site.products[0]) }),
  },
  {
    q: m.guides_free_faq5_q(),
    a: m.guides_free_faq5_a({
      packs: site.products
        .slice(1)
        .map((p) => m.guides_free_faq5_pack({ name: packName(p), price: formatPrice(p) }))
        .join(m.guides_free_faq5_pack_or()),
    }),
  },
];

export const Route = createFileRoute('/tiny-desk-ai-free')({
  head: () =>
    pageHead(site, {
      title: m.guides_free_meta_title(),
      description: m.guides_free_meta_description(),
      path: PATH,
      jsonLd: [faqJsonLd(faq())],
    }),
  component: FreePage,
});

function FreePage() {
  const checked = m.guides_free_checked();
  return (
    <GuidePage
      path={PATH}
      title={m.guides_free_title()}
      updated={checked}
      intro={<p>{m.guides_free_intro()}</p>}
    >
      <h2>{m.guides_free_ways_heading()}</h2>
      {/* A list, not a table: a three-column table scrolls sideways on phones and hides the "catch" column. */}
      <ul>
        {freeWays().map((way) => (
          <li key={way.name}>
            <strong>{way.name}</strong>: {way.get}. {m.guides_free_ways_catch_label()} {way.catch}.
          </li>
        ))}
      </ul>
      <p>
        {m.guides_free_diy_before()}{' '}
        <Link to="/how-to-make-outstanding-tiny-desk-ai-video">{m.guides_free_diy_link()}</Link>
        {m.guides_free_diy_after()}
      </p>

      <h2>{m.guides_free_pick_heading()}</h2>
      <ul>
        <li>{m.guides_free_pick_free()}</li>
        <li>{m.guides_free_pick_hd()}</li>
        <li>{m.guides_free_pick_cheap()}</li>
        <li>{m.guides_free_pick_group({ site: site.name, price: formatPrice(site.products[0]) })}</li>
        <li>
          {m.guides_free_pick_packs({
            site: site.name,
            price3: perVideo(site.products[1]),
            price10: perVideo(site.products[2]),
          })}
        </li>
      </ul>
      <p>
        {m.guides_free_pricing_before()}
        <a href="/#pricing">{m.guides_free_pricing_link()}</a>
        {m.guides_free_pricing_after()}
      </p>

      <Faq title={m.guides_free_faq_title()} items={faq()} />
    </GuidePage>
  );
}
