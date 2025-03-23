"use client";

import { useState } from "react";
import { useClientTranslation } from "@/app/hooks/useTranslate";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentModal({ isOpen, onClose }: CommentModalProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const addCommnet = useClientTranslation("add_comment");
  const commentText = useClientTranslation("comment");
  const ratingText = useClientTranslation("rating");
  const addBtn = useClientTranslation("add");

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log({ comment, rating });
    setComment("");
    setRating(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md flex flex-col p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-6">{addCommnet}</h2>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={commentText}
          className="w-full p-3 border border-gray-300 rounded-md mb-6 min-h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="mb-8 flex flex-col w-full">
          <p className="mb-2 text-gray-700">{ratingText}</p>
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <div
                key={value}
                className="cursor-pointer"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(null)}
              >
                <svg
                  className={`w-8 h-8 ${
                    (
                      hoverRating !== null
                        ? value <= hoverRating
                        : value <= (rating || 0)
                    )
                      ? "text-orange-400"
                      : "text-gray-300"
                  } transition-colors`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!comment || !rating}
            className="px-8 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
          >
            {addBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
