import { MotionHideShowSection } from "@/components/motion/HideShowSection";
import Header from "@/components/store/Header";
import PhotoCarousel from "@/components/store/PhotoCarousel";
import SaveStore from "@/components/store/SaveStore";
import ShareStore from "@/components/store/ShareStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { APIBASEURL, metaImage } from "@/lib/constants";
import { imageBaseUrl } from "@/lib/constants";
import { IStore, IStoreCoordinates } from "@/types/store";
import { IndianRupee, Mail, MapPin, MessageCircleMore, PhoneCall, Send } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface StoreProps {
  params: Promise<{ city: string; slug: string }>;
}

interface StoreSlugCity {
  store: {
    id: number;
    slug: string;
  };
  city: {
    name: string;
  };
}

export async function generateMetadata({ params }: StoreProps): Promise<Metadata> {
  const store: IStore = await getStoreBySlugCity(params);

  return {
    metadataBase: new URL(metaImage),
    title: `${store.name} at ${store.storeAddresses.addressLine2}, ${store.storeAddresses.city.name} | Liveyst`,
    description: store.bio,
    keywords: store.storeServices.map((s) => `${s.service.name} at ${store.storeAddresses.city.name}`),
    openGraph: {
      title: `${store.name} at ${store.storeAddresses.addressLine2}, ${store.storeAddresses.city.name} | Liveyst`,
      description: store.bio,
      images: [`/${store.logo}`],
    },
  };
}

export async function generateStaticParams() {
  const res = await fetch(`${APIBASEURL}/store/slug-city`);
  const data: StoreSlugCity[] = await res.json();
  const slugCity = data.map((slugCity) => ({
    slug: `${slugCity.store.slug}-${slugCity.store.id}`,
    city: slugCity.city.name.toLowerCase(),
  }));
  console.log("slugCity", slugCity);
  return slugCity;
}

async function getStoreBySlugCity(params: Promise<{ slug: string; city: string }>) {
  const param = await params;
  const res = await fetch(`${APIBASEURL}/store/${param.slug}/city/${param.city}`);
  const store = await res.json();

  return store;
}

async function getStoreCoordinates(params: Promise<{ slug: string; city: string }>) {
  const param = await params;
  const storeId = param.slug.split("-").pop();
  const res = await fetch(`${APIBASEURL}/store/address/coordinates/${storeId}`);
  const coordinates = await res.json();

  return coordinates;
}

export default async function StoreBySlug({ params }: StoreProps) {
  const store: IStore = await getStoreBySlugCity(params);
  const coordinates: IStoreCoordinates = await getStoreCoordinates(params);

  if (!store) {
    notFound();
  }

  return (
    <main className="max-w-screen-2xl mx-auto px-3 lg:px-8">
      <Header id={store?.id} />
      <div className="grid 2xl:grid-cols-3 gap-4 py-4 2xl:py-2 mb-4">
        <div className="h-full flex flex-col gap-4 lg-2xl:grid lg-2xl:grid-cols-2 lg-2xl:self-stretch">
          {/* main Information */}
          <MotionHideShowSection>
            <Card className="w-full h-full border-none shadow-none">
              <CardContent className="max-xs:p-4">
                <div className="flex flex-col items-center">
                  <img src={`${imageBaseUrl}${store?.logo}`} alt={store?.name} className="w-full h-48 object-contain" />
                  <h1 className="text-center text-2xl font-bold text-zinc-800 mt-4">{store?.name}</h1>
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
                <ShareStore
                  title={`${store.name} at ${store.storeAddresses.addressLine2}, ${store.storeAddresses.city.name}`}
                  bio={store.bio}
                />
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

        <div className="h-full flex flex-col gap-4 justify-evenly lg-2xl:grid lg-2xl:grid-cols-2 lg-2xl:self-stretch">
          {/* feedback */}
          {store?.feedbackLink && (
            <MotionHideShowSection>
              <Card className="w-full">
                <CardHeader className="max-xs:p-4">
                  <CardTitle>
                    <h2>Feedback</h2>
                  </CardTitle>
                  <CardDescription>Share Your Valuable Feedback</CardDescription>
                </CardHeader>
                <CardContent className="max-xs:p-4 flex gap-3 justify-between items-center">
                  <p>Feedback & Review</p>
                  <a href={store?.feedbackLink}>
                    <Button>
                      <Send /> send
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </MotionHideShowSection>
          )}
          {/* Payment */}
          {store?.upiId && (
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
          )}
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
                <p>
                  {store.storeAddresses.addressLine1}, {store.storeAddresses.addressLine2},{" "}
                  {store.storeAddresses.city.name}, {store.storeAddresses.state.name} {store.storeAddresses.pincode}
                </p>
              </CardContent>
              <CardFooter className="max-xs:p-4 flex justify-between">
                <a
                  href={
                    store?.storeAddresses?.googleMapLink
                      ? store?.storeAddresses?.googleMapLink
                      : `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
                  }
                >
                  <Button>
                    <MapPin /> Location
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </MotionHideShowSection>
          {/* links */}
          {store?.storeSocialMedias.length > 0 && (
            <MotionHideShowSection>
              <Card className="w-full">
                <CardHeader className="max-xs:p-4">
                  <CardTitle>
                    <h2>Impotent Links</h2>
                  </CardTitle>
                  <CardDescription>Quick Access to Key Links</CardDescription>
                </CardHeader>
                <CardContent className="max-xs:p-4 flex flex-wrap gap-3">
                  {store?.storeSocialMedias?.map((link) => (
                    <a key={link.id} href={link.link}>
                      <Button variant={"outline"}>
                        <img
                          src={`/icon/${link?.socialMedia?.icon}.svg`}
                          alt={link?.socialMedia?.name}
                          className="w-5 h-5"
                        />
                        <span>{link?.socialMedia?.name}</span>
                      </Button>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </MotionHideShowSection>
          )}
        </div>
        <div className="h-full flex flex-col gap-4 justify-evenly lg-2xl:grid lg-2xl:grid-cols-2 lg-2xl:self-stretch">
          {/* photos */}
          <MotionHideShowSection>
            <Card className="w-full">
              <CardHeader className="max-xs:p-4">
                <CardTitle>
                  <h2>Photos</h2>
                </CardTitle>
                <CardDescription>Gallery of Our Best Moments</CardDescription>
              </CardHeader>
              <CardContent className="max-xs:p-4">
                <PhotoCarousel photos={store?.storePhotos} storeName={store?.name} />
              </CardContent>
            </Card>
          </MotionHideShowSection>
          {/* lets connect */}
          <MotionHideShowSection>
            <Card className="w-full">
              <CardHeader className="max-xs:p-4">
                <CardTitle>
                  <h2>Let&apos;s Connect</h2>
                </CardTitle>
                <CardDescription>Connect for Product or Services</CardDescription>
              </CardHeader>
              <CardContent className="max-xs:p-4 flex gap-3 justify-between items-center">
                <p>Connect on WhatsApp</p>
                <a href={`https://api.whatsapp.com/send?phone=+91${store?.whatsappNumber}`}>
                  <Button>
                    <img src={`/icon/whatsapp.svg`} alt={"whatsapp"} className="w-4 h-4" /> connect
                  </Button>
                </a>
              </CardContent>
            </Card>
          </MotionHideShowSection>
        </div>
      </div>
      <div className="w-52 h-1 rounded mx-auto bg-black mb-4" />
    </main>
  );
}
