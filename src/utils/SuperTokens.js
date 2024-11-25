import SuperTokens from "supertokens-auth-react";
import ThirdParty, { Google } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session from "supertokens-auth-react/recipe/session";
import { toast } from "react-toastify";

SuperTokens.init({
  appInfo: {
    appName: import.meta.env.VITE_APP_NAME,
    apiDomain: import.meta.env.VITE_BACKEND_URL,
    websiteDomain: import.meta.env.VITE_FRONTEND_URL,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  getRedirectionURL: async (context) => {
    if (context.action === "SUCCESS" && context.newSessionCreated) {
      let redirectToPath = context.redirectToPath;
      if (redirectToPath !== undefined) {
        return redirectToPath;
      }
      if (context.createdNewUser) {
        // user signed up
        toast.success("User signed up successfully", {
          position: "top-center",
        });
        return "/dashboard";
      } else {
        // user signed in
        toast.success("User signed up successfully", {
          position: "top-center",
        });
        return "/dashboard";
      }
    } else if (context.action === "TO_AUTH") {
      return "/auth";
    }
    return undefined;
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [Google.init()],
      },
    }),
    EmailVerification.init({
      mode: "REQUIRED",
    }),
    EmailPassword.init({
      signInAndUpFeature: {
        signUpForm: {
          formFields: [
            {
              id: "name",
              label: "Full name",
              placeholder: "First name and last name",
              nonOptionalErrorMsg: "Full name is required",
            },
            {
              id: "phone",
              label: "Phone number",
              placeholder: "Your phone number",
              nonOptionalErrorMsg: "Phone number is required",
              validate: (value) => {
                if (value.length < 10) {
                  return "Phone number must be at least 10 digits";
                }
                return undefined;
              },
            },
            {
              id: "country",
              label: "Your country",
              placeholder: "Where do you live?",
              optional: true,
            },
          ],
        },
      },
    }),
    Session.init(),
  ],
});

export default SuperTokens;
