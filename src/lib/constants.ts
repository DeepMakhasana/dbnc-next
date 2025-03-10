export const constants = {
  TOKEN: "auth_token",
  FORMDATA: "profile_form_data",
  FORMSTEP: "profile_form_step",
};

export const APIBASEURL = "https://ky4jkxi7x6.execute-api.ap-south-1.amazonaws.com/production/api";

export const endpoints = {
  auth: {
    main: "/auth",
    sendVerifyOtpEmail: "/auth/send-verification-email",
    verifyEmailOtp: "/auth/verify-email-otp",
    visitor: "/auth/visitor",
  },
  store: {
    main: "/store",
    address: "/store/address",
    service: "/store/service",
    link: "/store/link",
    photo: "/store/photo",
    save: "/store/save",
  },
  utils: {
    main: "/utils",
    availableCities: "/utils/available-cities",
  },
};

export const allowPath = ["/account", "/account/onboard"];

export const afterLoginAllowedPath = ["/checkout"];

export const imageBaseUrl = "https://dbnc.s3.ap-south-1.amazonaws.com/";
export const metaImage = "https://dbnc.s3.ap-south-1.amazonaws.com";

// export const clientEndpoints = {
//   auth: {
//     register: "/register",
//     login: "/",
//     forgotPassword: "/forgot-password",
//     resetPassword: "/reset-password",
//   },
//   course: {
//     main: "/dashboard",
//   },
// };

// export const MAIN_COURSES_PAGE = "vcp-client.vercel.app";
export const BASE_DOMAIN = "https://liveyst.com";
