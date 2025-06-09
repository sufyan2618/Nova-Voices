import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from 'react-router';
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const UpdateName = () => {
    const [assistantName, setAssistantName] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { updateAssistant, isUpdatingProfile } = useAuthStore();
    const { state } = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            // If the image is a data URL (custom image), upload it as a file
            if (state?.assistantImage?.startsWith("data:image")) {
                const blob = await fetch(state.assistantImage).then((r) => r.blob());
                formData.append("file", blob, "assistant.png");
            } else {
                // For preloaded images, send the URL
                formData.append("imageUrl", state?.assistantImage);
            }
            formData.append("assistantName", assistantName);


            const res = await updateAssistant(formData);
            if (res) {
                setRedirect(true)
            }

        } catch (error) {
            setRedirect(false);
            console.error(error);
        }
    };

    if (redirect) {
        return <Navigate to="/" replace />;
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Name your <span className="text-blue-400">Assistant</span>
            </h1>
            <div className="mb-6">
                <img
                    src={state?.assistantImage}
                    alt="Assistant"
                    className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg"
                />
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full max-w-md"
            >
                <input
                    type="text"
                    value={assistantName}
                    onChange={(e) => setAssistantName(e.target.value)}
                    placeholder="Enter your assistant's name"
                    className="w-full px-4 py-3 text-white rounded-lg mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
                <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg transition-all duration-200"
                > {isUpdatingProfile ? (<ClipLoader/>) : ('Save')}
                </button>
            </form>
        </div>
    );
};

export default UpdateName;
