import { useState, useEffect, useContext } from "react";
import UserContext from "../../utils/dataStore";
import { FaEnvelope, FaPhone, FaGlobe, FaEdit, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import AOS from "aos";

export default function Profile() {
  const data = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Initialize user state from context
  const [user, setUser] = useState({
    first_name: data.user?.first_name || "",
    last_name: data.user?.last_name || "",
    email: data.user?.email || "",
    phone: data.user?.phone || "Not provided",
    country: data.user?.country || "Not provided",
    profilePicture: data.user?.picture,
    role: data.user?.role,
  });

  // Form state for updates
  const [formData, setFormData] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, [data.user]);

  const generateInitials = (first_name, last_name) => 
    `${first_name?.charAt(0).toUpperCase() || ""}${last_name?.charAt(0).toUpperCase() || ""}`;

  const adjustGooglePictureUrl = (url) => 
    url?.includes("lh3.googleusercontent.com") ? url.replace(/=s\d+-c$/, "=s1024-c") : url;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim() // Trim whitespace from input
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out unchanged and empty values
    const changes = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value && value !== user[key]) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(changes).length === 0) {
      toast.warning("No changes made to user information", {
        position: "top-right",
      });
      setIsEditing(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/update-user-info`,
        changes,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        // Update both local and context state
        const updatedUser = { ...user, ...changes };
        setUser(updatedUser);
        data.setUser(prev => ({ ...prev, ...changes }));
        
        // Reset form state
        setFormData({});
        setIsEditing(false);
        
        toast.success("User information updated successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.extrD || "Failed to update user information",
        { position: "top-right" }
      );
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const formElement = e.target;
    const passwordData = {
      currentPassword: formElement.currentPassword.value,
      newPassword: formElement.newPassword.value,
      confirmPassword: formElement.confirmPassword.value,
    };

    // Add your password validation and update logic here
    setIsChangingPassword(false);
  };

  // Input field configurations
  const profileFields = [
    { name: "first_name", label: "First Name" },
    { name: "last_name", label: "Last Name" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "country", label: "Country" },
  ];

  const passwordFields = [
    { name: "currentPassword", label: "Current Password" },
    { name: "newPassword", label: "New Password" },
    { name: "confirmPassword", label: "Confirm New Password" },
  ];

  return (
    <div className="relative w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-5 mx-auto px-6">
        <div
          className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
          data-aos="fade-up"
        >
          <div className="md:flex items-center">
            <div className="md:ml-4 md:flex-shrink-0">
              {user.profilePicture ? (
                <img
                  className="h-48 w-full object-cover md:w-48 rounded-tl-xl md:rounded-bl-xl"
                  src={adjustGooglePictureUrl(user.profilePicture)}
                  alt="User Profile"
                />
              ) : (
                <div className="h-48 w-full md:w-48 flex items-center justify-center rounded-tl-xl md:rounded-bl-xl bg-blue-100 text-blue-600 font-bold text-4xl object-cover">
                  {generateInitials(user.first_name, user.last_name)}
                </div>
              )}
            </div>

            <div className="p-8 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                    {`${user.first_name} ${user.last_name}`}
                  </h1>
                  <p className={`mt-2 font-bold ${user.role === "Inactive" ? "text-[red]" : "text-[lightgreen]"}`}>
                    {user.role}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                    if (!isEditing) setFormData({});
                  }}
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
                  {profileFields.map(({ name, label, type = "text" }) => (
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
                        value={formData[name] || ""}
                        placeholder={user[name]}
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

              {!data.user?.thirdparty && (
                !isChangingPassword ? (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    <FaKey className="inline-block mr-2" />
                    Change Password
                  </button>
                ) : (
                  <form onSubmit={handlePasswordChange} className="mt-6 space-y-6">
                    {passwordFields.map(({ name, label }) => (
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
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}