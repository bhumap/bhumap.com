"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { format } from "timeago.js";

function CommentSection({ property }) {
  var [comments, setComments] = useState({});
  var [fetching, setFetching] = useState(false);

  const fetchComments = async () => {
    try {
      setFetching(true);
      var res = await axios.get(`/api/comments?property=${property._id}`);
      setComments(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <section id={property._id} className="bg-white py-8 lg:py-10 antialiased">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
          Comments ({comments?.count})
        </h2>
      </div>
      <div className="mb-6">
        <CommentForm property={property} commentId={false} buttonText="Comment" fetchComments={fetchComments} />
      </div>
      {comments?.data?.map((v, i) => {
        return (
          <SingleComment fetchComments={fetchComments} comment={v} key={i} />
        );
      })}
    </section>
  );
}

export default CommentSection;

const CommentForm = ({ commentId, fetchComments,setCommenting,buttonText,property }) => {
  var [message, setMessage] = useState("");
  var [loading, setLoading] = useState(false);

  const postNewComment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      var res;
      if (commentId) {
        res = await axios.post(`/api/comments?commentId=${commentId}`, {
          text: message,
        });
      } else {
        res = await axios.post(`/api/comments`, {
          text: message,
          property: property._id,
        });
      }

      toast.success("Posted Successfully!");
      setMessage("");
      if (fetchComments) {
        fetchComments();
      }
      if(setCommenting){
        setCommenting(false)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={postNewComment}>
      <div className="relative ">
        <textarea
          id="comment"
          rows="2"
          disabled={loading}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg  p-2 pb-7 resize-none text-sm text-gray-900 border border-black/20 shadow-md focus:border-primary focus:ring-0 focus:outline-none"
          placeholder="Write a comment..."
          required
        ></textarea>
        <button
          disabled={loading}
          type="submit"
          className="inline-flex bottom-3 right-2 absolute rounded-md disabled:opacity-50 disabled:cursor-not-allowed items-center py-1 px-3 text-xs font-medium text-center text-black border focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
        >
          {loading ? "Processing..." : buttonText}
        </button>
      </div>
    </form>
  );
};

const SingleComment = ({ comment, fetchComments }) => {
  var [commenting, setCommenting] = useState(false);

  return (
    <div className="text-base border-black/5 border-b p-2 bg-white">
      <div className="flex justify-between items-center ">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900">
            <img
              className="mr-2 w-8 border h-8 rounded-full"
              src={comment?.user?.photo || "/images/user.png"}
              alt="Michael Gough"
            />
            {comment?.user?.fullName}
          </div>
          <p className="text-sm text-gray-600">
            <time
              pubdate="true"
              dateTime="2022-02-08"
              title="February 8th, 2022"
            >
              {format(new Date(comment.createdAt), "en_US")}
            </time>
          </p>
        </div>
      </div>

      <div className="ml-10">
        <p className="text-black text-sm mb-1 font-medium">{comment?.text}</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <i className="bx p-2 hover:bg-gray-200 rounded-full cursor-pointer bx-like"></i>{" "}
            <div className="text-sm">2</div>
          </div>
          <button
            onClick={() => setCommenting(!commenting)}
            className="text-xs font-medium hover:bg-gray-200 px-3 rounded-full text-black"
          >
            {commenting ? "Cancel" : "Reply"}
          </button>
        </div>
        {commenting && (
          <CommentForm buttonText={"Reply"} setCommenting={setCommenting} fetchComments={fetchComments} commentId={comment._id} />
        )}

        {/* Comment Replies */}
        <div className="pt-2 flex flex-col gap-2">
          {comment?.replies?.map((v, i) => {
            return (
              <div className="" key={i}>
                <div className="flex justify-between items-center ">
                  <div className="flex items-center">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                      <img
                        className="mr-2 w-6 border h-6 rounded-full"
                        src={v?.user?.photo || "/images/user.png"}
                        alt="Michael Gough"
                      />
                      {v?.user?.fullName}
                    </div>
                    <p className="text-sm text-gray-600">
                      <time
                        pubdate="true"
                        dateTime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {format(new Date(v.createdAt), "en_US")}
                      </time>
                    </p>
                  </div>
                </div>

                <div className="ml-8">
                  <p className="text-black text-sm mb-1 font-medium">{v?.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
