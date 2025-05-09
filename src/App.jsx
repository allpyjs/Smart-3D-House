import { useEffect, useState } from "react";
import DownloadModal from "./components/DownloadModal";
import Header from "./components/Header";
import TabGroup from "./components/TabGroup";
import ThreeDim from "./components/Tabs/ThreeDim";

function App() {
  const [showOutputModal, setShowOutputModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("3d");

  return (
    <div>
      <div className="flex flex-col h-screen w-screen">
        <Header setShowOutputModal={setShowOutputModal} />
        <TabGroup selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="flex flex-col grow basis-0 shrink-0">
          <ThreeDim />
        </div>
      </div>
      <DownloadModal
        showModal={showOutputModal}
        setShowModal={setShowOutputModal}
      />
    </div>
  );
}

export default App;
