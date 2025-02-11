import Header from "@/components/store/Header";
import { apiBaseUrl } from "@/lib/constants";

export async function generateStaticParams() {
  return [{ city: "ara" }, { city: "chandigarh" }];
}

async function getStoreBySlugCity(params: Promise<{ slug: string; city: string }>) {
  const param = await params;
  const res = await fetch(`${apiBaseUrl}/store/${param.slug}/city/${param.city}`);
  const store = await res.json();

  return store;
}

export default async function StoreBySlug({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const store = await getStoreBySlugCity(params);
  console.log(store);

  return (
    <main className="max-w-screen-2xl mx-auto px-3 lg:px-8">
      <Header />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <section>Main Information</section>
          <section>Address Information</section>
          <section>social media Information</section>
        </div>
        <div className="flex flex-col gap-4">
          <section>bio - services</section>
          <section>feedback</section>
          <section>payment</section>
          <section>photos</section>
        </div>
      </div>
    </main>
  );
}
