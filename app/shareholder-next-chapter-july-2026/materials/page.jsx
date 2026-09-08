import ShareholderNextChapterMaterialsClient from "@/components/shareholder/ShareholderNextChapterMaterialsClient";
import { SHAREHOLDER_NEXT_CHAPTER_HOSTED_REPLAY_URL } from "@/lib/shareholder/shareholderNextChapterHostedReplay";
import { proxyCrmJson } from "@/lib/crm-proxy";

export const metadata = {
  title: "Shareholder Webinar Recording & Presentation | DiversyFund",
  description:
    "Watch the July 22 shareholder Path Forward webinar recording and download the presentation.",
  robots: { index: false, follow: false },
};

async function loadMaterialsBootstrap(tid) {
  const result = await proxyCrmJson(
    "/api/public/marketing-site/shareholder-next-chapter-materials-bootstrap",
    { query: tid ? { tid } : {} }
  );
  if (!result.ok || !result.data?.ok) return null;
  return result.data;
}

export default async function ShareholderNextChapterMaterialsPage({ searchParams }) {
  const tid = (await searchParams)?.tid?.trim() || null;
  const bootstrap = await loadMaterialsBootstrap(tid);

  if (!bootstrap) {
    return (
      <ShareholderNextChapterMaterialsClient
        tid={tid}
        posthogDistinctId={null}
        firstName=""
        replayVideoUrl={SHAREHOLDER_NEXT_CHAPTER_HOSTED_REPLAY_URL}
        presentationHref="/documents/shareholder-path-forward-july-22-2026.pptx"
        presentationFilename="DiversyFund-Path-Forward-July-22-2026.pptx"
        bootstrapUnavailable
      />
    );
  }

  return (
    <ShareholderNextChapterMaterialsClient
      tid={tid}
      posthogDistinctId={bootstrap.posthogDistinctId}
      firstName={bootstrap.firstName}
      replayVideoUrl={SHAREHOLDER_NEXT_CHAPTER_HOSTED_REPLAY_URL}
      presentationHref={bootstrap.presentationHref}
      presentationFilename={bootstrap.presentationFilename}
    />
  );
}
