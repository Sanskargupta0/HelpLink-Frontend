import { useContext, useEffect, useState } from "react";
import UserContext from "../../utils/dataStore";
import { HiXMark, HiPhoto } from "react-icons/hi2";
const Dashboard = () => {
  const { user, fetching, setFetching } = useContext(UserContext);
  const [postType, setPostType] = useState('normal'); // 'normal' or 'fundraising'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    category: 1, // 1 for normal, 2 for fundraising
    tags: [],
    upi_Id: '',
    upi_qrCode: '',
    target_amount: '',
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const newSelectedImages = [...selectedImages];
    const newPreviewUrls = [...previewUrls];
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    newSelectedImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setSelectedImages(newSelectedImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // First upload all images to S3
      const uploadedImageUrls = [];
      
      for (const image of selectedImages) {
        const fileName = `${Date.now()}-${image.name}`;
        // Get upload URL
        const uploadUrlResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: fileName }),
        });
        const { url } = await uploadUrlResponse.json();
        
        // Upload image to S3
        await fetch(url, {
          method: 'PUT',
          body: image,
          headers: { 'Content-Type': image.type },
          maxBodyLength: Infinity,
        });
        
        uploadedImageUrls.push(fileName);
      }

      // Create the post
      const postData = {
        ...formData,
        image: uploadedImageUrls,
        category: postType === 'normal' ? 1 : 2,
        user_id: 'USER_ID', // Replace with actual user ID from auth context
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error('Failed to create post');

      // Reset form
      setFormData({
        title: '',
        description: '',
        images: [],
        category: 1,
        tags: [],
        upi_Id: '',
        upi_qrCode: '',
        target_amount: '',
      });
      setSelectedImages([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!user) {
      setFetching(!fetching);
    }
  }, [user]);
return <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
<h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Create New Post</h2>

{/* Post Type Selection */}
<div className="mb-6">
  <div className="flex gap-4">
    <button
      type="button"
      onClick={() => setPostType('normal')}
      className={`px-4 py-2 rounded-lg ${
        postType === 'normal'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
      }`}
    >
      Normal Post
    </button>
    <button
      type="button"
      onClick={() => setPostType('fundraising')}
      className={`px-4 py-2 rounded-lg ${
        postType === 'fundraising'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
      }`}
    >
      Fundraising Post
    </button>
  </div>
</div>

<form onSubmit={handleSubmit} className="space-y-6">
  {/* Title */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Title
    </label>
    <input
      type="text"
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      required
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Description
    </label>
    <textarea
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      rows={4}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      required
    />
  </div>

  {/* Image Upload */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Images
    </label>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
      <div className="space-y-1 text-center">
        <HiPhoto className="mx-auto h-12 w-12 text-gray-400" />
        <div className="flex text-sm text-gray-600 dark:text-gray-400">
          <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
            <span>Upload images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="sr-only"
            />
          </label>
        </div>
      </div>
    </div>

    {/* Image Previews */}
    {previewUrls.length > 0 && (
      <div className="mt-4 grid grid-cols-3 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="h-24 w-24 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <HiXMark className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Tags */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Tags (comma-separated)
    </label>
    <input
      type="text"
      value={formData.tags.join(', ')}
      onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    />
  </div>

  {/* Fundraising Fields */}
  {postType === 'fundraising' && (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          UPI ID
        </label>
        <input
          type="text"
          value={formData.upi_Id}
          onChange={(e) => setFormData({ ...formData, upi_Id: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required={postType === 'fundraising'}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Target Amount
        </label>
        <input
          type="number"
          value={formData.target_amount}
          onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required={postType === 'fundraising'}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          UPI QR Code
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFormData({ ...formData, upi_qrCode: file });
            }
          }}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300"
          required={postType === 'fundraising'}
        />
      </div>
    </div>
  )}

  {/* Submit Button */}
  <button
    type="submit"
    disabled={isLoading}
    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    {isLoading ? 'Creating Post...' : 'Create Post'}
  </button>
</form>
</div>
};

export default Dashboard;