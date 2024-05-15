import React, { useRef, useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaMusic } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function PlaylistCreate({ onClose, data }) {
  const navigate = useNavigate();
  const modelRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {
    if (data) {
      const { playlistId, ...formDataWithoutId } = data;
      setFormData(formDataWithoutId);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const closeModel = (e) => {
    if (modelRef.current !== e.target) return;
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/playlist/${data.playlistId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await res.json();
      setLoading(false);
      if (!responseData.success) {
        console.log(responseData);
        return;
      }
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div
      ref={modelRef}
      onClick={closeModel}
      className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center">
      <div className=" flex flex-col bg-gray-800 p-2 w-[400px]">
        <div className="flex flex-row items-center justify-between m-0 bg-gray-800">
          <h1 className="text-2xl font-bold m-0 p-4 pl-2">Edit details</h1>
          <button onClick={() => onClose()} className="ml-auto">
            <IoCloseOutline className="text-3xl" />
          </button>
        </div>
        <form className="flex flex-col" id="form">
          <div className="flex flex-col m-5 ml-2">
            <input
              type="text"
              className="border-2 mb-2 p-3 rounded-sm bg-gray-700"
              value={formData.title}
              onChange={handleChange}
              id="title"
            />
            <textarea
              className="border-2 mt-2 p-2 rounded-sm bg-gray-700"
              placeholder="Add an optional description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="m-4 place-self-end bg-blue-500 text-white py-2 px-4 rounded-md">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlaylistCreate;
