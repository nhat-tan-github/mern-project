import { ArrowLeftIcon } from "lucide-react";
import axiosAPI from "../lib/axios.js";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.dismiss();
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axiosAPI.post("/notes", {
        title,
        content
      });
      toast.dismiss();
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.dismiss();
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000
        });
      } else {
        toast.dismiss();
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset mb-4">
                  <legend className="fieldset-legend">Title</legend>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full focus:border-[#313030] focus:outline focus:outline-[#2c2b2b]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset mb-4">
                  <legend className="fieldset-legend">Content</legend>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea p-3.5 textarea-bordered h-32 w-full focus:border-[#313030] focus:outline focus:outline-[#2c2b2b]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </fieldset>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
