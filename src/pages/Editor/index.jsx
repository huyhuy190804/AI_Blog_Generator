import React, { useState } from "react";
import Header from "@/components/Header";
import EditorSection from "@/components/EditiorSection";
import { askGemini } from "@/services/geminiService";
import { toast } from "react-hot-toast";
const Editor = () => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = React.useState("");
  const [content, setContent] = React.useState("");
  const handleCopy = async () => {
    try {
      if (!content || !content.trim()) {
        toast.error("Không có nội dung để sao chép.");
        return;
      }
      await navigator.clipboard.writeText(content);
      toast.success("Nội dung đã được sao chép vào clipboard!");
    } catch (error) {
      toast.error(
        "Đã có lỗi xảy ra khi sao chép nội dung. Vui lòng thử lại sau.",
      );
    }
  };
  const handleDownload = async () => {
    try {
      if (!content || !content.trim()) {
        toast.error("Không có nội dung để tải xuống.");
        return;
      }
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${topic}.txt`.replaceAll( /\s+/g, "-" );

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Nội dung đã được tải xuống thành công!");
    } catch (error) {
      toast.error(
        "Đã có lỗi xảy ra khi tải xuống nội dung. Vui lòng thử lại sau.",
      );
    }
  };
  //goi api askGemini de lay noi dung tu topic su dung try catch de bat loi va hien thi thong bao loi su dung toast
  const generateContent = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const prompt = `Viết một bài blog về chủ đề "${topic}". Bài viết nên có cấu trúc rõ ràng với phần mở đầu, thân bài và kết luận.`;

      const response = await askGemini(prompt);

      setContent(response);

      const oldHistory = JSON.parse(
        localStorage.getItem("blogHistory") || "[]",
      );

      const newBlog = {
        id: Date.now(),
        topic,
        content: response,
        createdAt: new Date().toISOString(),
      };

      const updatedHistory = [newBlog, ...oldHistory];

      localStorage.setItem("blogHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tạo nội dung.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <EditorSection
        topic={topic}
        setTopic={setTopic}
        content={content}
        setContent={setContent}
        generateContent={generateContent}
        handleCopy={handleCopy}
        handleDownload={handleDownload}
        loading={loading}
      />
    </>
  );
};

export default Editor;
