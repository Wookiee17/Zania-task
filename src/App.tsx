import { useEffect, useState, DragEvent } from "react";
import "./App.css";
import { Card, Image, Spin, Tag } from "antd";
import useInterval from "./hooks/useInterval";
import { Doc } from "./types";

function App() {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [initialDocs, setInitialDocs] = useState<Doc[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    fetch("/docs")
      .then((response) => response.json())
      .then((data) => {
        setDocs(data);
        setInitialDocs(data);
      })
      .catch((error) => console.error("Error fetching documents:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSaved((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useInterval(() => {
    const haveDocsChanged =
      JSON.stringify(docs) !== JSON.stringify(initialDocs);
    if (haveDocsChanged) {
      setIsSaving(true);
      fetch("/update-docs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ docs }),
      })
        .then((response) => response.json())
        .then((data) => {
          setDocs(data);
          setLastSaved(0);
          setInitialDocs(data);
        })
        .catch((error) => console.error("Error updating documents:", error))
        .finally(() => setIsSaving(false));
    }
  }, 5000);

  const handleDrop = (e: DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    if (!docs) return;

    const data = e.dataTransfer.getData("id");
    const draggedOverItem = docs.find((doc: Doc) => doc.id === id);
    const draggedItem = docs.find((doc: Doc) => doc.id === parseInt(data));

    if (!draggedOverItem || !draggedItem) {
      return;
    }

    const draggedItemIndex = docs.indexOf(draggedItem);
    const draggedOverItemIndex = docs.indexOf(draggedOverItem);

    [draggedItem.position, draggedOverItem.position] = [
      draggedOverItem.position,
      draggedItem.position,
    ];

    const newDocs = [...docs];
    newDocs[draggedItemIndex] = draggedOverItem;
    newDocs[draggedOverItemIndex] = draggedItem;

    setDocs(newDocs);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (loading || docs === null) {
    return <Spin fullscreen />;
  }

  return (
    <div>
      <Tag className="mb-4 ">
        {" "}
        <strong>Last saved: {lastSaved}s ago </strong>
      </Tag>
      <div className="flex bg-red gap-5 flex-wrap">
        {docs.map((item: Doc, index: number) => (
          <div
            key={index}
            className="sm:w-[32%] w-full"
            draggable="true"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, item.id)}
            onDragStart={(e) => {
              e.dataTransfer.setData("id", item.id.toString());
            }}
          >
            <Card hoverable title={item.title}>
              <Image
                preview={{ toolbarRender: () => <div></div> }}
                placeholder={<Spin />}
                className="rounded-md"
                alt="document-image"
                src={item.thumbNail}
                height={200}
              />
            </Card>
          </div>
        ))}
      </div>
      <Spin spinning={isSaving} fullscreen />
    </div>
  );
}

export default App;
