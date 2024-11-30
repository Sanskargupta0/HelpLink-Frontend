import { useState, useEffect, useContext } from "react";
import UserContext from "../../utils/dataStore";
import { FaEnvelope, FaPhone, FaGlobe, FaEdit, FaKey } from "react-icons/fa";
import Session from "supertokens-auth-react/recipe/session";
import { UserRoleClaim } from "supertokens-auth-react/recipe/userroles";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const data = useContext(UserContext);

  let claimValue = Session.useClaimValue(UserRoleClaim);

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });

    if (claimValue.loading || !claimValue.doesSessionExist) {
      return null;
    } else {
      let userRole = claimValue.value;
      setUser({ ...user, status: userRole[0] });
    }
  }, []);

  const [user, setUser] = useState({
    firstName: data.user?.userMetadata?.metadata?.first_name,
    lastName: data.user?.userMetadata?.metadata?.last_name,
    email: data.user?.userInfo?.emails[0],
    phone: data.user?.userMetadata?.metadata?.phone || "Not provided",
    country: data.user?.userMetadata?.metadata?.country || "Not provided",
    profilePicture: data.user?.userMetadata?.metadata?.picture,
  });

  const generateInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const adjustGooglePictureUrl = (url) => {
    if (url && url.includes("lh3.googleusercontent.com")) {
      return url.replace(/=s\d+-c$/, "=s1024-c");
    }
    return url;
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setIsChangingPassword(false);
  };

  return (
    <div className="relative w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-5 mx-auto px-6">
        <div
          className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
          data-aos="fade-up"
        >
          <div className="md:flex items-center">
            <div className="ml-4 md:flex-shrink-0">
              {user.profilePicture ? (
                <img
                  className="h-48 w-full object-cover md:w-48 rounded-tl-xl md:rounded-bl-xl"
                  src={adjustGooglePictureUrl(user.profilePicture)}
                  alt="User Profile"
                />
              ) : (
                <div className="h-48 w-full md:w-48 flex items-center justify-center rounded-tl-xl md:rounded-bl-xl bg-blue-100 text-blue-600 font-bold text-4xl object-cover">
                  {generateInitials(user.firstName, user.lastName)}
                </div>
              )}
            </div>

            <div className="p-8 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                    {`${user.firstName} ${user.lastName}`}
                  </h1>
                  {user.status == "Inactive" ? (
                    <p className="mt-2 font-bold text-[red]">
                      {user.status}
                    </p>
                  ) : (
                    <p className="mt-2 font-bold text-[lightgreen]">
                      {user.status}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                >
                  <FaEdit className="inline-block mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {!isEditing ? (
                <div className="mt-6 space-y-4">
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaEnvelope className="mr-2 text-blue-500" /> {user.email}
                  </p>
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaPhone className="mr-2 text-green-500" /> {user.phone}
                  </p>
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaGlobe className="mr-2 text-yellow-500" /> {user.country}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  {[
                    { name: "firstName", label: "First Name" },
                    { name: "lastName", label: "Last Name" },
                    { name: "phone", label: "Phone", type: "tel" },
                    { name: "country", label: "Country" },
                  ].map(({ name, label, type = "text" }) => (
                    <div key={name}>
                      <label
                        htmlFor={name}
                        className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        id={name}
                        value={user[name]}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white px-4 py-2"
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </form>
              )}

              {!isChangingPassword ? (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                >
                  <FaKey className="inline-block mr-2" />
                  Change Password
                </button>
              ) : (
                <form
                  onSubmit={handlePasswordChange}
                  className="mt-6 space-y-6"
                >
                  {[
                    { name: "currentPassword", label: "Current Password" },
                    { name: "newPassword", label: "New Password" },
                    { name: "confirmPassword", label: "Confirm New Password" },
                  ].map(({ name, label }) => (
                    <div key={name}>
                      <label
                        htmlFor={name}
                        className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                      >
                        {label}
                      </label>
                      <input
                        type="password"
                        name={name}
                        id={name}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white px-4 py-2"
                      />
                    </div>
                  ))}
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => setIsChangingPassword(false)}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
