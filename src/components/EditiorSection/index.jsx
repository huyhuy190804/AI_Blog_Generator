import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Download } from "lucide-react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Spinner } from "@/components/ui/spinner";
const EditorSection = ({
  topic,
  setTopic,
  content,
  setContent,
  generateContent,
  handleCopy,
  handleDownload,
  loading,
}) => {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid gap-6">
        {/* Header */}
        <h1 className="text-3xl font-bold">Blog Editor</h1>

        {/* Blog Topic Section */}
        <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
          <div className="px-6 py-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-6">Chủ đề Blog</h2>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Nhập chủ đề blog của bạn (ví dụ: Lợi ích của thiền định)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      e.preventDefault();

                      if (!topic.trim()) {
                        toast.error("Vui lòng nhập đề tài!!!");
                        return;
                      }

                      generateContent();
                    }
                  }}
                />
                <Button
                  disabled={loading}
                  onClick={() => {
                    if (!topic.trim()) {
                      toast.error("Vui lòng nhập đề tài!!!");
                      return;
                    }

                    generateContent();
                  }}
                  className="flex items-center gap-2 disabled:opacity-50"
                >
                  {loading && <Spinner className="w-4 h-4" />}
                  {loading ? "Đang tạo..." : "Tạo Nội Dung"}
                </Button>
              </div>
              <label className="mt-4 text-sm text-muted-foreground block">
                AI sẽ tạo ra nội dung blog dựa trên chủ đề bạn nhập
              </label>
            </div>
          </div>
        </div>

        {/* Preview & Export Section */}
        <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b">
              <h2 className="text-2xl font-bold">Xem trước & Xuất</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-2" />
                  Sao chép
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    handleDownload();
                    // TODO: call content generation logic
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
              </div>
            </div>

            {/* Content Preview Area */}
            <div className="grid gap-8 min-h-28">
              {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
              ) : (
                <p
                  value={content}
                  className="text-center text-muted-foreground"
                >
                  Chưa có nội dung để hiển thị.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditorSection;
