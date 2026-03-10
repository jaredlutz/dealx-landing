import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";

export default function ContentPage({ title, body, primaryImage, children }) {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        {primaryImage && (
          <div className="mb-10 overflow-hidden rounded-2xl">
            <img
              src={primaryImage}
              alt=""
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        )}
        <h1 className={cn("text-3xl font-bold sm:text-4xl", brand.text)}>
          {title}
        </h1>
        {body && (
          <div
            className={cn("mt-6 whitespace-pre-line text-base leading-relaxed", brand.muted)}
          >
            {body}
          </div>
        )}
        {children}
      </Container>
    </div>
  );
}
