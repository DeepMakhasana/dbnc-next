"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateVisitorProfilePayload, updateVisitorProfileResponse } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
// import InputOTPForm from "./OtpVerify";
import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/constants";
import useAuthContext from "@/context/auth/useAuthContext";
import { useEffect } from "react";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name require minimum 2 characters")
    .max(30, "First Name cannot exceed 30 characters"),
  lastName: z
    .string()
    .min(2, "Last name require minimum 2 characters")
    .max(30, "Last Name cannot exceed 30 characters"),
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .transform((val) => val.toLowerCase()),
  number: z.string().min(10, "Enter a valid phone number").max(10, "Enter a valid phone number"),
});

// send-verification-email
export async function updateVisitorProfile(
  payload: updateVisitorProfilePayload
): Promise<updateVisitorProfileResponse> {
  const { data } = await axiosInstance.put(endpoints.auth.visitor, payload);
  return data;
}

const ProfileUpdateForm = () => {
  const { user, login } = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ")[1] || "",
      email: user?.email || "",
      number: user?.number || "",
    },
  });

  const { setValue } = form;

  // mutation for verify otp for verification
  const { mutate, isPending } = useMutation<updateVisitorProfileResponse, Error, updateVisitorProfilePayload>({
    mutationFn: updateVisitorProfile,
    onSuccess: (data) => {
      console.log("Profile update done", data);
      login(data.token);
      toast({
        title: "Profile update:",
        description: "Profile update successfully",
      });
    },
    onError: (error: any) => {
      console.log("error", error);
      toast({
        title: "OTP verification error:",
        description: error?.response.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    mutate({ name: `${values.firstName} ${values.lastName}`, number: values.number });
  }

  useEffect(() => {
    setValue("firstName", user?.name?.split(" ")[0] || "");
    setValue("lastName", user?.name?.split(" ")[1] || "");
    setValue("email", user?.email || "");
    setValue("number", user?.number || "");
  }, [setValue, user]);

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="surname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" disabled placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormDescription>Enter your email above to start your account</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile number</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? "Please wait" : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileUpdateForm;
