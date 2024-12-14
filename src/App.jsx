import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// superTokens
import { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { AccessDeniedScreen } from "supertokens-auth-react/recipe/session/prebuiltui";
import { UserRoleClaim } from "supertokens-auth-react/recipe/userroles";
import * as reactRouterDom from "react-router-dom";
import SuperTokens from "./utils/SuperTokens";

// Component import
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages import
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Notification from "./pages/Notification/Notification";
import Wallet from "./pages/Wallet/Wallet";
import CreateLabel from "./pages/CreateLabel/CreateLabel";
import Admin from "./pages/Admin/Admin";
import Error from "./pages/Error/Error";

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
            <Route
              path="/dashboard"
              element={
                <SessionAuth>
                  <Dashboard />
                </SessionAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <SessionAuth>
                  <Profile />
                </SessionAuth>
              }
            />
            <Route
              path="/notification"
              element={
                <SessionAuth>
                  <Notification />
                </SessionAuth>
              }
            />
            <Route
              path="/wallet"
              element={
                <SessionAuth>
                  <Wallet />
                </SessionAuth>
              }
            />
            <Route
              path="/create-label"
              element={
                <SessionAuth
                  accessDeniedScreen={AccessDeniedScreen}
                  overrideGlobalClaimValidators={(globalValidators) => [
                    ...globalValidators,
                    UserRoleClaim.validators.includes("Active"),
                  ]}
                >
                  <CreateLabel />
                </SessionAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <SessionAuth
                  accessDeniedScreen={AccessDeniedScreen}
                  overrideGlobalClaimValidators={(globalValidators) => [
                    ...globalValidators,
                    UserRoleClaim.validators.includes("Admin"),
                  ]}
                >
                  <Admin />
                </SessionAuth>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
};

export default App;
