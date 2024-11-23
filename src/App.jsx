import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from 'react-toastify';
import AOS from "aos";
import "aos/dist/aos.css";

// superTokens
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, {
  Google
} from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import * as reactRouterDom from "react-router-dom";

// Component import
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages import
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Dashboard from "./pages/Dashboard/Dashboard";

SuperTokens.init({
  appInfo: {
    appName: "Delhivery",
    apiDomain: "http://localhost:8080",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  getRedirectionURL: async (context) => {
    if (context.action === "SUCCESS" && context.newSessionCreated) {
        // called on a successful sign in / up. Where should the user go next?
        let redirectToPath = context.redirectToPath;
        if (redirectToPath !== undefined) {
            // we are navigating back to where the user was before they authenticated
            return redirectToPath;
        }
        if (context.createdNewUser) {
            // user signed up
            toast.success("User signed up successfully",{
              position: "top-center",
            });
            return "/dashboard"
        } else {
            // user signed in
            toast.success("User signed up successfully",{
              position: "top-center",
            });
            return "/dashboard"
        }
    } else if (context.action === "TO_AUTH") {
        // called when the user is not authenticated and needs to be redirected to the auth page.
        return "/auth";
    }
    // return undefined to let the default behaviour play out
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
    EmailPassword.init(),
    Session.init(),
  ],
});

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <SuperTokensWrapper>
      <BrowserRouter>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <Navbar />
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
            ThirdPartyPreBuiltUI,
            EmailPasswordPreBuiltUI,
            EmailVerificationPreBuiltUI,
          ])}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={
                        <SessionAuth>
                            <Dashboard />
                        </SessionAuth>
                    } />
        </Routes>
        <Footer />
      </div>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
};

export default App;
