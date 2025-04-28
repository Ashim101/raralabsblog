// import { useForm } from "react-hook-form";
// import { BlogFormData } from "../types";

// type BlogFormProps = {
//   initialValues?: Omit<BlogFormData, "category"> & { category?: string | number };
//   onSubmit: (data: BlogFormData) => void;
//   isPending?: boolean;
// };

// const BlogForm = ({ initialValues, onSubmit, isPending }: BlogFormProps) => {
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors },
//     reset
//   } = useForm<BlogFormData>({
//     defaultValues: initialValues ? {
//       ...initialValues,
//       category: typeof initialValues.category === 'string' 
//         ? parseInt(initialValues.category) 
//         : initialValues.category || 1
//     } : {
//       title: "",
//       description: "",
//       category: 1, // Default to category 1
//     }
//   });

//   const handleFormSubmit = (data: BlogFormData) => {
//     try {
//       onSubmit({
//         ...data,
//         category: Number(data.category) // Ensure category is number
//       });
//       if (!initialValues) {
//         reset({
//           title: "",
//           description: "",
//           category: 1
//         });
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-6 rounded-lg shadow-md space-y-6">
//       <div>
//         <label className="block text-gray-700 mb-1">Title*</label>
//         <input 
//           {...register("title", { 
//             required: "Title is required",
//             minLength: {
//               value: 5,
//               message: "Title must be at least 5 characters"
//             },
//             maxLength: {
//               value: 100,
//               message: "Title must be less than 100 characters"
//             }
//           })}
//           type="text"
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter blog title"
//           disabled={isPending}
//         />
//         {errors.title && (
//           <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-gray-700 mb-1">Description*</label>
//         <textarea
//           {...register("description", { 
//             required: "Description is required",
//             minLength: {
//               value: 50,
//               message: "Description must be at least 50 characters"
//             },
//             maxLength: {
//               value: 5000,
//               message: "Description must be less than 5000 characters"
//             }
//           })}
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Write your blog description..."
//           rows={6}
//           disabled={isPending}
//         />
//         {errors.description && (
//           <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-gray-700 mb-1">Category*</label>
//         <select
//           {...register("category", { 
//             required: "Category is required",
//             valueAsNumber: true
//           })}
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={isPending}
//         >
//           <option value={1}>Category 1</option>
//           <option value={2}>Category 2</option>
//           <option value={3}>Category 3</option>
//           <option value={4}>Category 4</option>
//         </select>
//         {errors.category && (
//           <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
//         )}
//       </div>

//       <div className="flex justify-end gap-4">
//         <button
//           type="button"
//           onClick={() => reset({
//             title: initialValues?.title || "",
//             description: initialValues?.description || "",
//             category: initialValues?.category ? 
//               (typeof initialValues.category === 'string' 
//                 ? parseInt(initialValues.category) 
//                 : initialValues.category) 
//               : 1
//           })}
//           className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
//           disabled={isPending}
//         >
//           Reset
//         </button>
//         <button
//           type="submit"
//           disabled={isPending}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
//         >
//           {isPending ? "Processing..." : initialValues ? "Update Blog" : "Create Blog"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BlogForm;



import { useForm } from "react-hook-form";
import { BlogByAuthor,Blog,BlogFormData} from "../types";
import { useCategories}from "../../api/blogs"




const categories=[1,2,3,4]
type BlogFormProps = {
  initialValues?: BlogFormData;
  onSubmit: (data: BlogFormData) => Promise<void> | void;
  isPending?: boolean;
  // category?: { id: BlogCategory; name: string }[]; // Optional custom categories
};

// const defaultCategories = [
//   { id: 1 as const, name: "Technology" },
//   { id: 2 as const, name: "Business" },
//   { id: 3 as const, name: "Lifestyle" },
//   { id: 4 as const, name: "Education" },
// ];

const BlogForm = ({ 
  initialValues, 
  onSubmit, 
  isPending, 
  
}: BlogFormProps) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<BlogFormData>({
    mode: 'onChange',
    defaultValues: initialValues ? {
      ...initialValues,
      category_id: initialValues.category_id
    } : {
      title: "",
      description: "",
      category_id: 1,
    }
  });

  const handleFormSubmit = async (data: BlogFormData) => {
    try {
      await onSubmit({
        ...data,
      });
      
      if (!initialValues) {
        reset({
          title: "",
          description: "",
          category_id:1
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  const{ data:categories}=useCategories()

  console.log(categories)

  // Watch form values for real-time validation feedback
  const currentTitle = watch('title');
  const currentDescription = watch('description');
  console.log(initialValues)

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Title Field */}
      <div>
        <label className="block text-gray-700 mb-1">Title*</label>
        <input 
          {...register("title", { 
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters"
            },
            maxLength: {
              value: 100,
              message: "Title must be less than 100 characters"
            }
          })}
          type="text"
          className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter blog title"
          disabled={isPending}
          aria-invalid={errors.title ? "true" : "false"}
        />
        <div className="flex justify-between mt-1">
          {errors.title ? (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          ) : (
            <p className="text-gray-500 text-sm">Min. 5 characters</p>
          )}
          <span className={`text-xs ${currentTitle?.length > 100 ? 'text-red-500' : 'text-gray-500'}`}>
            {currentTitle?.length || 0}/100
          </span>
        </div>
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-gray-700 mb-1">Description*</label>
        <textarea
          {...register("description", { 
            required: "Description is required",
            minLength: {
              value: 50,
              message: "Description must be at least 50 characters"
            },
            maxLength: {
              value: 5000,
              message: "Description must be less than 5000 characters"
            }
          })}
          className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Write your blog description..."
          rows={6}
          disabled={isPending}
          aria-invalid={errors.description ? "true" : "false"}
        />
        <div className="flex justify-between mt-1">
          {errors.description ? (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          ) : (
            <p className="text-gray-500 text-sm">Min. 50 characters</p>
          )}
          <span className={`text-xs ${currentDescription?.length > 5000 ? 'text-red-500' : 'text-gray-500'}`}>
            {currentDescription?.length || 0}/5000
          </span>
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label className="block text-gray-700 mb-1">Category*</label>
        <select
          {...register("category_id", { 
            required: "Category is required",
          })}
          className={`w-full border ${errors.category_id ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          disabled={isPending}
          aria-invalid={errors.category_id? "true" : "false"}
        >
          {categories?.map((cat) => (
            <option key={cat.cid} value={cat.cid}>
               {cat.cname}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => reset(initialValues || {
            title: "",
            description: "",
            category_id: 1
          })}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
          disabled={isPending}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isPending || !isValid}
          className={`px-6 py-2 rounded-lg transition ${
            isPending 
              ? 'bg-gray-400 cursor-not-allowed' 
              : isValid 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" /> Processing...
            </span>
          ) : initialValues ? (
            "Update Blog"
          ) : (
            "Create Blog"
          )}
        </button>
      </div>
    </form>
  );
};

// Small spinner component for loading state
const Spinner = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => (
  <div 
    className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${
      size === 'sm' ? 'h-4 w-4' : 
      size === 'md' ? 'h-5 w-5' : 
      'h-6 w-6'
    }`}
  />
);

export default BlogForm;