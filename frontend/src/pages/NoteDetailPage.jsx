import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axiosAPI from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosAPI.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.dismiss();
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to detele this note?")) return;

    try {
      await axiosAPI.delete(`/notes/${id}`);
      toast.dismiss();
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.dismiss();
      toast.success("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.dismiss();
      toast.error("Please add a title or content");
    }

    setSaving(true);

    try {
      await axiosAPI.put(`/notes/${id}`, note);
      toast.dismiss();
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the notes:", error);
      toast.dismiss();
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <fieldset className="fieldset mb-4">
                <label className="label" htmlFor="note-title">
                  Title
                </label>

                <input
                  id="note-title"
                  type="text"
                  placeholder="Note title"
                  className="input w-full focus:border-[#313030] focus:outline focus:outline-[#2c2b2b]"
                  value={note.title}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      title: e.target.value
                    })
                  }
                />
              </fieldset>

              <fieldset className="fieldset mb-4">
                <label className="label" htmlFor="note-content">
                  Content
                </label>

                <textarea
                  id="note-content"
                  placeholder="Write your note here..."
                  className="textarea h-32 w-full p-3.5 focus:border-[#313030] focus:outline focus:outline-[#2c2b2b]"
                  value={note.content}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      content: e.target.value
                    })
                  }
                />
              </fieldset>

              <div className="card-actions justify-end ">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
