import React from "react";
import Header from "@/components/Header";
import HistorySection from "@/components/HistorySection";

const History = () => {
  const [history, setHistory] = React.useState([]);
  React.useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("blogHistory") || "[]",
    );
    setHistory(storedHistory);
  }, []);
  const clearHistory = (id) => {
    const updated = history.filter((item) => item.id !== id);

    localStorage.setItem("blogHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  return (
    <>
      <Header />
      <HistorySection history={history} clearHistory={clearHistory} />
    </>
  );
};

export default History;
