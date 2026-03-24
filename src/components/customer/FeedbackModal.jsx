import React from "react";

const FeedbackModal = ({ feedback, onChangeRating, onChangeComment, onSubmit }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 text-center border-t-8 border-[#A00000]">
        <h3 className="text-2xl font-serif font-bold text-[#A00000]">
          Trải nghiệm của bạn?
        </h3>
        <p className="text-gray-500 text-sm">
          Giúp Hadilao phục vụ bạn tốt hơn ở lần sau nhé!
        </p>

        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onChangeRating(star)}
              className={`text-4xl transition-transform ${
                feedback.rating >= star
                  ? "text-[#D4AF37] scale-110 drop-shadow-md"
                  : "text-gray-200"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={feedback.comment}
          onChange={(e) => onChangeComment(e.target.value)}
          rows={3}
          className="w-full border-2 border-[#E8D5B5] rounded-xl p-4 text-sm outline-none focus:border-[#A00000] bg-[#FDFBF7] resize-none"
          placeholder="Chia sẻ thêm cảm nhận của bạn..."
        />

        <button
          onClick={onSubmit}
          className="w-full py-3.5 rounded-xl bg-[#A00000] text-[#F5D7A0] font-bold uppercase tracking-widest active:scale-95 shadow-md"
        >
          Gửi Đánh Giá
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
