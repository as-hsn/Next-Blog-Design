"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "./Header";
import ShowToast from "../ShowToast";
import ReadNext from "./ReadNext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface BlogPostProps {
  slug: string;
}

interface BlogPost {
  id: string;
  category: string;
  userId: string;
  title: string;
  body: string;
  blogImgUrl: string;
  date: string;
  authorName: string;
  postedDate: string;
  authorImageUrl: string;
}

interface Comment {
  id: string;
  content: string;
  userName: string;
  text: string;
  createdAt: string;
  userId: string;
}

interface decodedTokenProps {
  id: string;
  name: string;
}

interface userDetailsProps {
  id: string;
}

const Details = ({ slug }: BlogPostProps) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogsCategory, setRelatedBlogsCategory] = useState<
    string | null
  >(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null);
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (token) {
      try {
        setUser(true);
        const decodedToken: decodedTokenProps = jwtDecode(token);
        setUserDetails({
          id: decodedToken.id,
        });
      } catch (error) {
        void error
      }
    }
  }, [token]);

  const fetchBlogBySlug = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/getBlog?slug=${encodeURIComponent(slug)}`);
      const data = await res.json();
      if (data.success) {
        setBlog(data.blog);
        setRelatedBlogsCategory(data.blog.category);
        setComments(data.blog.comments);
      }
    } catch (error) {
      void error;
      ShowToast("Error fetching blog", "error");
    } finally {
      setLoading(true);
    }
  },[slug]);

  useEffect(() => {
    if (!slug) return;
    fetchBlogBySlug();
  }, [slug,fetchBlogBySlug]);

  const CommentSchema = Yup.object().shape({
    text: Yup.string()
      .min(5, "Comment is too short")
      .max(500, "Comment is too long")
      .required("Comment is required"),
  });

  const addComment = async (
    values: { text: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const comment = {
      text: values.text,
    };
    resetForm();
    try {
      const response = await fetch("/api/auth/add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
          blogId: blog?.id,
        }),
      });
      const data = await response.json();
      if (data.success) {
        ShowToast(data.message, "success");
      } else {
        ShowToast(data.message, "warning");
      }
      fetchBlogBySlug();
    } catch (error) {
      if (error instanceof Error) {
        ShowToast(error.message)
      }else{
        ShowToast("An unknown error occurred")
      }
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const res = await fetch("/api/auth/delete-comment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId,
          userId: userDetails?.id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchBlogBySlug();
      }
    } catch (error) {
      if (error instanceof Error) {
        ShowToast(error.message);
      } else {
        ShowToast("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <div>
        {blog ? (
          <>
            <Header
              title={blog.title}
              category={blog.category}
              author={blog.authorName}
              date={new Date(blog.postedDate)}
              authorImage={blog.authorImageUrl}
            />
            <div className="justify-center flex lg:px-20 md:px-10 px-5 max-w-[1280px] max-h-[582px]">
              <Image
                src={blog.blogImgUrl || "/placeholder.svg"}
                alt="Hero img ..."
                width={1280}
                height={582}
              />
            </div>
            <div className="px-5 sm:px-8 md:px-16 pt-16 lg:px-[21rem] pb-8 lg:pb-16">
              <div className="mt-8">
                <div className="mb-8">
                  <h3 className="text-xl sm:text-xl lg:text-2xl text-gray-800 font-bold max-w-[40rem]">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500">{blog.body}</p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-12 border-t pt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Comments ({comments.length})
                </h3>

                {/* Add Comment Form */}

                <div className="mb-10 bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">
                    Leave a comment
                  </h4>
                  <Formik
                    initialValues={{ name: "", text: "" }}
                    validationSchema={CommentSchema}
                    onSubmit={addComment}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form>
                        <div className="mb-4">
                          <label
                            htmlFor="text"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Comment
                          </label>
                          <Field
                            as="textarea"
                            id="text"
                            name="text"
                            rows={4}
                            className={`w-full px-3 py-2 border text-gray-700 ${
                              errors.text && touched.text
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Share your thoughts..."
                          />
                          <ErrorMessage
                            name="text"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                        >
                          {isSubmitting ? "Posting..." : "Post Comment"}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500 font-thin mb-1">
                              {comment.userName}
                            </p>
                            <h4 className="font-semibold text-gray-700 mb-1">
                              {comment.content}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {comment.createdAt.split("T")[0]}
                            </p>
                          </div>
                          {user &&
                            (userDetails?.id === comment.userId ||
                              userDetails?.id === blog.userId) && (
                              <button
                                onClick={() => deleteComment(comment.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                aria-label="Delete comment"
                              >
                                Delete
                              </button>
                            )}
                        </div>
                        <p className="mt-3 text-gray-600">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          loading && <div className="flex items-center justify-center h-screen">
          <div className="loader-detail"></div>
        </div>
        
        )}
      </div>

      <ReadNext category={relatedBlogsCategory} />
    </>
  );
};

export default Details;
