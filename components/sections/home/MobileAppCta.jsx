import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";

export default function MobileAppCta({ content = {} }) {
  const title = content.mobile_title ?? "Invest From Anywhere With Our Mobile App";
  const subtitle = content.mobile_subtitle ?? "Download the App Now";
  const appStoreUrl = content.app_store_url ?? "#";
  const googlePlayUrl = content.google_play_url ?? "#";
  const mobileImage = content.mobile_image_url || "/migrated/home/home-19.png";

  return (
    <section id="mobile" className="py-16 sm:py-20">
      <Container>
        <div className={cn("flex flex-col items-center rounded-2xl border bg-gradient-to-b from-diversy-primary/5 to-gray-100 p-10 text-center sm:p-14 dark:from-diversy-primary/10 dark:to-white/5", brand.border, "dark:border-white/10")}>
          {mobileImage && (
            <img src={mobileImage} alt="" className="h-24 w-auto object-contain" />
          )}
          <h2 className={cn("mt-4 text-2xl font-semibold sm:text-3xl", brand.text)}>
            {title}
          </h2>
          <p className={cn("mt-3 text-lg", brand.muted)}>
            {subtitle}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={appStoreUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white hover:bg-diversy-primary-hover transition"
            >
              App Store
            </a>
            <a
              href={googlePlayUrl}
              className={cn("inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition hover:border-diversy-primary/30", brand.border, brand.text, "hover:bg-gray-100 dark:border-white/20 dark:hover:bg-white/5")}
            >
              Google Play
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
