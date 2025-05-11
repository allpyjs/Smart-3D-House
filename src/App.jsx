import { useEffect, useState } from "react";
import DownloadModal from "./components/DownloadModal";
import Header from "./components/Header";
import TabGroup from "./components/TabGroup";
import ThreeDim from "./components/Tabs/ThreeDim";
import TwoDim from "./components/Tabs/TwoDim";
import AdvancedEdit from "./components/Tabs/AdvancedEdit";
import JobReview from "./components/Tabs/JobReview";
import Drawings from "./components/Tabs/Drawings";

function App() {
  const [showOutputModal, setShowOutputModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("3d");
  const [params, setParams] = useState({
    width: 10,
    length: 15,
    ceilingHeight: 5,
    roofRiseIn12: 6,
  });

  return (
    <div>
      <div className="flex flex-col h-screen w-screen overflow-auto">
        <Header setShowOutputModal={setShowOutputModal} />
        <TabGroup selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="flex flex-col grow basis-0 shrink-0 overflow-auto">
          {selectedTab === "3d" && (
            <ThreeDim params={params} setParams={setParams} />
          )}
          {selectedTab === "2d" && <TwoDim />}
          {selectedTab === "job" && <JobReview />}
          {selectedTab === "drawing" && <Drawings />}
          {selectedTab === "advanced" && (
            <AdvancedEdit params={params} setParams={setParams} />
          )}
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
