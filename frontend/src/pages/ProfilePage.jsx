import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Camera, Mail, User } from "lucide-react";
import { toast } from "react-hot-toast";

/**
 * ProfilePage Component
 * 
 * Displays and allows editing of user profile information including:
 * - Profile picture upload/display
 * - User's full name
 * - Email address
 * - Account information (join date, status)
 */
const ProfilePage = () => {
  // Get user data and update function from auth store
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  // Get current theme
  const { theme } = useThemeStore();
  // State to store the selected image before upload
  const [selectedImg, setSelectedImg] = useState(null);

  const isByrne = theme === 'byrne';

  /**
   * Handles the image upload process
   * 1. Gets the selected file
   * 2. Converts it to base64
   * 3. Updates the local state
   * 4. Sends the image to the backend for Cloudinary upload
   */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const maxSizeMB = 10; //Set the img size
    const maxSizeInBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      toast.error("Image size too large")
      return;
    }

    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  }

  return (
    // Main container with padding from top to account for header
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Profile card container with background and spacing */}
        <div className={`rounded-xl p-6 space-y-8 ${isByrne ? 'bg-neutral text-base-100' : 'bg-base-300'}`}>
          {/* Header section with title and subtitle */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className={`mt-2 ${isByrne ? 'text-base-100/70' : ''}`}>Your profile information</p>
          </div>

          {/* Profile picture upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Profile image display with fallback to default avatar */}
              {selectedImg || authUser.profilePic ? (
                <img
                  src={selectedImg || authUser.profilePic}
                  alt="Profile"
                  className={`size-32 rounded-full object-cover border-4 ${isByrne ? 'border-secondary' : ''}`}
                />
              ) : (
                <div className={`size-32 rounded-full border-4 ${isByrne ? 'border-secondary' : ''} bg-base-200 flex items-center justify-center`}>
                  <span className="text-4xl font-bold text-base-content/50">
                    {authUser?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              {/* Hidden file input with styled camera icon button */}
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isByrne ? 'bg-primary hover:bg-primary/90' : 'bg-base-content hover:scale-105'}
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className={`w-5 h-5 ${isByrne ? 'text-neutral' : 'text-base-200'}`} />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            {/* Upload status message */}
            <p className={`text-sm ${isByrne ? 'text-base-100/70' : 'text-zinc-400'}`}>
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User information section */}
          <div className="space-y-6">
            {/* Full name display */}
            <div className="space-y-1.5">
              <div className={`text-sm flex items-center gap-2 ${isByrne ? 'text-base-100/70' : 'text-zinc-400'}`}>
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className={`px-4 py-2.5 rounded-lg border ${
                isByrne ? 'bg-secondary/10 border-secondary/20' : 'bg-base-200 border-base-300'
              }`}>
                {authUser?.fullName}
              </p>
            </div>

            {/* Email address display */}
            <div className="space-y-1.5">
              <div className={`text-sm flex items-center gap-2 ${isByrne ? 'text-base-100/70' : 'text-zinc-400'}`}>
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className={`px-4 py-2.5 rounded-lg border ${
                isByrne ? 'bg-secondary/10 border-secondary/20' : 'bg-base-200 border-base-300'
              }`}>
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account information section */}
          <div className={`mt-6 rounded-xl p-6 ${isByrne ? 'bg-secondary/10' : 'bg-base-300'}`}>
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              {/* Member since date */}
              <div className={`flex items-center justify-between py-2 border-b ${
                isByrne ? 'border-secondary/20' : 'border-zinc-700'
              }`}>
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              {/* Account status */}
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className={isByrne ? 'text-primary' : 'text-green-500'}>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;