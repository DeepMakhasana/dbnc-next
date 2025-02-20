"use client";
import routeProtection from "@/components/HOC/routeProtection";
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm";
import Link from "next/link";

function Auth() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link href="/" className="flex flex-col items-center gap-2 font-medium">
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <img src="/bliveprofile.svg" alt="bliveprofile" />
                </div>
                <span className="sr-only">Bliveprofile</span>
              </Link>
              <h1 className="text-3xl font-bold">Profile</h1>
              <div className="text-center text-sm">Update your profile details</div>
            </div>
            <ProfileUpdateForm />
          </div>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
            Keep up to date your profile details
          </div>
        </div>
      </div>
    </main>
  );
}

export default routeProtection(Auth);
