import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const HistorySection = ({ history, clearHistory }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedBlog, setSelectedBlog] = React.useState(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid gap-8">
        <h1 className="text-3xl font-bold">Hi, here is your history</h1>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div className="w-70 h-70">
              <DotLottieReact
                src="https://lottie.host/526000bd-8f6d-4854-80c7-c2bc3d275ce2/zk7oty75F7.lottie"
                loop
                autoplay
              />
            </div>
            <p className="text-lg text-muted-foreground">No history found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-card w-full text-card-foreground rounded-xl border p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-4 text-ellipsis overflow-hidden whitespace-nowrap">
                  {item.topic}
                </h2>

                <p className="text-sm line-clamp-3">{item.content}</p>

                <div className="flex  gap-2 mt-4">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedBlog(item);
                      setOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 flex " />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => {
                      setDeleteId(item.id);
                      setOpenConfirm(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{selectedBlog?.topic}</DialogTitle>
          </DialogHeader>

          <div className="mt-4 whitespace-pre-line">
            {selectedBlog?.content}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="sm:max-w-425px text-center">
          <div className="w-full max-w-200px mx-auto">
            <DotLottieReact
              src="https://lottie.host/d8bc3a6b-d965-46d4-8f78-effc55e7ae43/VFxUEmg01x.lottie"
              loop
              autoplay
            />
          </div>

          <DialogHeader>
            <DialogTitle className="text-xl text-center">
              Confirm Delete
            </DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground text-sm mb-4">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>

          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setOpenConfirm(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                clearHistory(deleteId);
                setOpenConfirm(false);
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default HistorySection;
