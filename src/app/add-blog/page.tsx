"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ShowToast from "../components/ShowToast";
import { useEffect, useState } from "react";
import Image from "next/image";

const validationSchema = Yup.object({
  blogTitle: Yup.string().required("Blog title is required"),
  blogCategory: Yup.string().required("Blog category is required"),
  blogBody: Yup.string().required("Blog content is required"),
  blogImage: Yup.mixed().required("Blog image is required"),
});

interface BlogProps {
  title: string;
  blogImgUrl: string;
  id: string;
  category: string;
  body: string;
}

export default function UploadForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userBlogs, setUserBlogs] = useState<BlogProps[]>([]);
  const [updateBlog, setUpdateBlog] = useState<BlogProps | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/auth/get-blogs", {
        method: "GET",
      });

      const data = await res.json();
      if (data.success) {
        setUserBlogs(data.blogs);
      } else {
        ShowToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleUpdateClick = (blog: BlogProps) => {
    setUpdateBlog(blog);
    setIsUpdating(true);
  };

  const handleDeleteClick = async (blog: BlogProps) => {
    if (blog.id) {
      const blogId = blog.id;
      try {
        const res = await fetch(`/api/auth/delete-blog?blogId=${blogId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          ShowToast(data.message, "success");
          fetchBlogs();
        } else {
          ShowToast(data.message, "error");
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (blog.id === updateBlog?.id) {
          setUpdateBlog(null);
          setIsUpdating(false);
        }
      }
    }
  };

  return (
    <div className="custom-background -mb-32 py-16">
      <Formik
        enableReinitialize
        initialValues={{
          blogTitle: updateBlog ? updateBlog.title : "",
          blogCategory: updateBlog ? updateBlog.category : "",
          blogBody: updateBlog ? updateBlog.body : "",
          blogImage: updateBlog ? updateBlog.blogImgUrl : "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("blogTitle", values.blogTitle);
          formData.append("blogCategory", values.blogCategory);
          formData.append("blogBody", values.blogBody);
          if (values.blogImage) formData.append("blogImage", values.blogImage);
          try {
            setLoading(true);
            let res;
            if (isUpdating) {
              formData.append("blogId", updateBlog ? updateBlog.id : "");
              res = await fetch("/api/auth/update-blog", {
                method: "PUT",
                body: formData,
              });
            } else {
              res = await fetch("/api/auth/add-blog", {
                method: "POST",
                body: formData,
              });
            }

            const data = await res.json();

            if (data.success) {
              ShowToast(data.message, "success");
              resetForm();
              setIsUpdating(false);
              setUpdateBlog(null);
              fetchBlogs();
            } else {
              ShowToast(data.message, "error");
            }
          } catch (error) {
            console.error("Error:", error);
          } finally {
            setLoading(false);
          }

          setSubmitting(false);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="max-w-2xl bg-white shadow-2xl mx-auto p-4 space-y-6 scroll-target">
            <div className="space-y-4">
              <h2 className="text-xl text-center font-semibold text-gray-700">
                Add Blog
              </h2>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Blog Title
                </label>
                <Field
                  type="text"
                  name="blogTitle"
                  className="w-full p-2 text-gray-700 border-[1.5px] border-gray-500/60 rounded-sm"
                />
                <ErrorMessage
                  name="blogTitle"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Blog Category
                </label>
                <Field
                  as="select"
                  name="blogCategory"
                  className="w-full p-2 border-[1.5px] border-gray-500/60 text-gray-700"
                >
                  <option value="business">Business</option>
                  <option value="startup">Startup</option>
                  <option value="technology">Technology</option>
                  <option value="economy">Economy</option>
                  <option value="marketing">Marketing</option>
                  <option value="life">Life</option>
                </Field>
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Blog Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setFieldValue("blogImage", file);
                  }}
                  className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-600 hover:file:bg-yellow-100 max-w-fit"
                />
                <ErrorMessage
                  name="blogImage"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Blog Content
                </label>
                <Field
                  as="textarea"
                  name="blogBody"
                  className="w-full text-gray-700 p-2 border-[1.5px] border-gray-500/60 h-48"
                />
                <ErrorMessage
                  name="blogBody"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            {loading ? (
              <div className=" bg-yellow-400 text-black font-medium py-2  cursor-wait flex items-center space-x-2 justify-center">
                <p className="font-normal">
                  {isUpdating ? "Updating..." : "Publishing..."}
                </p>
                <div className="loader"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-medium py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors"
              >
                {isUpdating ? "Update Blog" : "Publish Blog"}
              </button>
            )}
          </Form>
        )}
      </Formik>

      <div
        className="max-w-2xl bg-white shadow-2xl mx-auto p-4 space-y-6 mt-8 w-full"
        data-id="author_blogs_div"
      >
        <h2 className="text-lg mb-4 font-semibold text-gray-700 text-center">
          Your Blogs
        </h2>
        <hr />
        {userBlogs.length > 0 ? (
          userBlogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between mb-4 p-4 border rounded-lg shadow bg-white flex-wrap"
            >
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative">
                  <Image
                    src={blog.blogImgUrl}
                    alt="General physician"
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="ml-4 text-lg truncate max-w-[18rem] font-medium text-gray-800">
                  {blog.title.slice(0, 35)}
                </p>
              </div>
              <div className="flex gap-x-2">
                <button
                  onClick={() => {
                    handleUpdateClick(blog);
                    const element = document.querySelector(".scroll-target");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg w-fit"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(blog)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg w-fit"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-center text-black">
              You have not added any blog
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
