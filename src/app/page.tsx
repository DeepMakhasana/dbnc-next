import Header from "@/components/Header";
import NearByStores from "@/components/home/NearByStores";

export default async function Home() {
  return (
    <div className="main-container">
      <Header />
      <main>
        <section>
          <NearByStores />
        </section>
      </main>
    </div>
  );
}
