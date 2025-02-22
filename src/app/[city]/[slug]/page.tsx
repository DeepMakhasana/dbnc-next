import { MotionHideShowSection } from "@/components/motion/HideShowSection";
import Header from "@/components/store/Header";
import PhotoCarousel from "@/components/store/PhotoCarousel";
import SaveStore from "@/components/store/SaveStore";
import ShareStore from "@/components/store/ShareStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { APIBASEURL } from "@/lib/constants";
import { imageBaseUrl } from "@/lib/constants";
import { IStore } from "@/types/store";
import { IndianRupee, Mail, MapPin, MessageCircleMore, PhoneCall, Send } from "lucide-react";
import { notFound } from "next/navigation";

interface StoreSlugCity {
  store: {
    slug: string;
  };
  city: {
    name: string;
  };
}

export async function generateStaticParams() {
  const res = await fetch(`${APIBASEURL}/store/slug-city`);
  const data: StoreSlugCity[] = await res.json();
  const slugCity = data.map((slugCity) => ({ slug: slugCity.store.slug, city: slugCity.city.name.toLowerCase() }));
  console.log("slugCity", slugCity);
  return slugCity;
}

async function getStoreBySlugCity(params: Promise<{ slug: string; city: string }>) {
  const param = await params;
  const res = await fetch(`${APIBASEURL}/store/${param.slug}/city/${param.city}`);
  const store = await res.json();

  return store;
}

export default async function StoreBySlug({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const store: IStore = await getStoreBySlugCity(params);
  console.log(store);

  if (!store) {
    notFound();
  }

  return (
    <main className="max-w-screen-2xl mx-auto px-3 lg:px-8">
      <Header isOpen={store?.isOpen} />
      <div className="grid 2xl:grid-cols-3 gap-4 py-4 2xl:py-2 mb-4">
        <div className="h-full flex flex-col gap-4 justify-between lg-2xl:grid lg-2xl:grid-cols-2 lg-2xl:self-stretch">
          {/* main Information */}
          <MotionHideShowSection>
            <Card className="w-full h-full border-none shadow-none">
              <CardContent className="max-xs:p-4">
                <div className="flex flex-col items-center">
                  <img src={`${imageBaseUrl}${store?.logo}`} alt={store?.name} className="w-28 h-28 object-contain" />
                  <h1 className="text-center text-2xl font-bold text-zinc-800">{store?.name}</h1>
                  <h3 className="text-center text-zinc-500 text-sm sm:text-base">{store?.tagline}</h3>
                </div>
              </CardContent>
              <CardFooter className="max-xs:p-4 flex justify-evenly">
                <a href={`tel:${store?.number}`}>
                  <Button variant="outline" size={"icon"}>
                    <PhoneCall />
                  </Button>
                </a>
                <a href={`https://api.whatsapp.com/send?phone=+91${store?.whatsappNumber}`}>
                  <Button variant="outline" size={"icon"}>
                    <MessageCircleMore />
                  </Button>
                </a>
                <a href={`mailto:${store?.email}`}>
                  <Button variant="outline" size={"icon"}>
                    <Mail />
                  </Button>
                </a>
                <ShareStore />
                <SaveStore storeId={store?.id} />
              </CardFooter>
            </Card>
          </MotionHideShowSection>
          {/* bio and services */}
          <MotionHideShowSection>
            <Card className="w-full">
              <CardHeader className="max-xs:p-4">
                <CardTitle>
                  <h2>Bio - Services</h2>
                </CardTitle>
                <CardDescription>Explore Our Bio & Services</CardDescription>
              </CardHeader>
              <CardContent className="max-xs:p-4">
                <p>{store?.bio}</p>
              </CardContent>
              <CardFooter className="max-xs:p-4 flex flex-wrap gap-2">
                {store?.storeServices?.slice(0, 4).map((service) => (
                  <h4 key={service.id} className="border rounded p-2 text-zinc-700 hover:text-black">
                    {service.service.name}
                  </h4>
                ))}
              </CardFooter>
            </Card>
          </MotionHideShowSection>
        </div>

        <div className="h-full flex flex-col gap-4 justify-between lg-2xl:grid lg-2xl:grid-cols-2 lg-2xl:self-stretch">
          {/* feedback */}
          <MotionHideShowSection>
            <Card className="w-full">
              <CardHeader className="max-xs:p-4">
                <CardTitle>
                  <h2>Feedback</h2>
                </CardTitle>
                <CardDescription>Share Your Valuable Feedback</CardDescription>
              </CardHeader>
              <CardContent className="max-xs:p-4 flex gap-3 justify-between items-center">
                <p>Give feedback & review</p>
                <a href={store?.feedbackLink}>
                  <Button>
                    <Send /> send
                  </Button>
                </a>
              </CardContent>
            </Card>
          </MotionHideShowSection>
          {/* Payment */}
          <MotionHideShowSection>
            <Card className="w-full">
              <CardHeader className="max-xs:p-4">
                <CardTitle>
                  <h2>Payment</h2>
                </CardTitle>
                <CardDescription>Secure & Easy Payment Options</CardDescription>
              </CardHeader>
              <CardContent className="max-xs:p-4 flex justify-between items-center">
                <p>UPI</p>
                <a href={`upi://pay?pn=UPAYI&pa=${store?.upiId}&cu=INR`}>
                  <Button>
                    <IndianRupee /> pay
                  </Button>
                </a>
              </CardContent>
            </Card>
          </MotionHideShowSection>
          {/* address */}
          <MotionHideShowSection>
            <Card className="w-full">
              <CardHeader className="max-xs:p-4">
                <CardTitle>
                  <h2>Address Information</h2>
                </CardTitle>
                <CardDescription>Find Our Location Details</CardDescription>
              </CardHeader>
              <CardContent className="max-xs:p-4">
                <p>{store?.storeAddresses?.addressLine}</p>
              </CardContent>
              <CardFooter className="max-xs:p-4 flex justify-between">
                <a href={store?.storeAddresses?.googleMapLink}>
                  <Button>
                    <MapPin /> Location
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </MotionHideShowSection>
        </div>
        <div className="h-full flex flex-col gap-4 justify-between lg-2xl:grid lg-2xl:grid-cols-2 lg-2xl:self-stretch">
          {/* photos */}
          <MotionHideShowSection>
            <Card className="w-full">
              <CardHeader className="max-xs:p-4 2xl:hidden">
                <CardTitle>
                  <h2>Photos</h2>
                </CardTitle>
                <CardDescription>Gallery of Our Best Moments</CardDescription>
              </CardHeader>
              <CardContent className="max-xs:p-4 2xl:mt-8">
                <PhotoCarousel photos={store?.storePhotos} storeName={store?.name} />
              </CardContent>
            </Card>
          </MotionHideShowSection>
          {/* links */}
          <MotionHideShowSection>
            <Card className="w-full">
              <CardHeader className="max-xs:p-4">
                <CardTitle>
                  <h2>Impotent Links</h2>
                </CardTitle>
                <CardDescription>Quick Access to Key Links</CardDescription>
              </CardHeader>
              <CardContent className="max-xs:p-4 flex gap-3">
                {store?.storeSocialMedias?.map((link) => (
                  <a key={link.id} href={link.link}>
                    <Button variant={"outline"} size={"icon"}>
                      <img
                        src={`/icon/${link?.socialMedia?.icon}.svg`}
                        alt={link?.socialMedia?.name}
                        className="w-5 h-5"
                      />
                    </Button>
                  </a>
                ))}
              </CardContent>
            </Card>
          </MotionHideShowSection>
        </div>
      </div>
      <div className="w-52 h-1 rounded mx-auto bg-black mb-4" />
    </main>
  );
}
