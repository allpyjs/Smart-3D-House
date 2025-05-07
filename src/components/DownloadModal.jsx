import { useState } from "react";

const pdfSections = [
  { label: "Cover Sheet", value: "1" },
  { label: "Disclaimer", value: "2" },
  { label: "Material List PDF", value: "3" },
  { label: "Post Layout PDF", value: "4" },
  { label: "Cross Sections", value: "5" },
  { label: "Wall Layout PDF", value: "6" },
  { label: "Combined Assembly Drawings", value: "7" },
  { label: "Truss Layout PDF", value: "8" },
  { label: "4 View Elevations", value: "9" },
  { label: "Assembly Drawings", value: "10" },
  { label: "Sheating Drawings", value: "11" },
  { label: "Elevations", value: "12" },
  { label: "Raw Cut List PDF", value: "13" },
  { label: "Knee Bracing Detail", value: "14" },
  { label: "New Quote_1 Page", value: "15" },
  { label: "New Quote_2 Page", value: "16" },
];
const otherFiles = [
  { label: "Sales Quote/Proposal", value: "1" },
  { label: "Sample Sales Contract", value: "2" },
  { label: "Material List Excel (.XLSX) file", value: "3" },
  { label: "Cross Sections", value: "4" },
  { label: "Sheathing Drawings", value: "5" },
  { label: "Wall Layout DXF", value: "6" },
  { label: "Post Layout DXF", value: "7" },
  { label: "Truss Layout DXF", value: "8" },
  { label: "Assembly DXFs", value: "9" },
  { label: "Document Template", value: "10" },
  { label: "SketchUp .SKP file", value: "11" },
  { label: "Job Data CSV 26GA", value: "12" },
  { label: "Excel Workbook", value: "13" },
  { label: "CSV Template", value: "14" },
  { label: "CentralLink Upload file", value: "15" },
  { label: "Pick List", value: "16" },
  { label: "EZM File", value: "17" },
  { label: "Condoc SketchUp .SKP file", value: "18" },
  { label: "PF/SF Proposal", value: "19" },
];

const DownloadModal = ({ showModal, setShowModal }) => {
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  if (!showModal) return;
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="m-auto min-w-7xl min-h-[80%] max-w-full max-h-4/5 flex flex-col bg-white">
        <div className="bg-sky-600 text-white px-5 py-2 font-semibold text-center text-lg relative">
          Download Outputs
          <div
            className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            X
          </div>
        </div>
        <div className="shrink-0 grow basis-0 overflow-y-auto p-4">
          <div className="px-4 py-2 bg-sky-600 font-semibold text-white">
            PDF Sections:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4 mb-2">
            {pdfSections.map((section, index) => (
              <label
                key={`pdfsection-${index}`}
                className="flex gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!selectedSections.find((o) => o === section.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSections([...selectedSections, section.value]);
                    } else {
                      setSelectedSections(
                        selectedSections.filter((s) => s !== section.value)
                      );
                    }
                  }}
                />
                <div>{section.label}</div>
              </label>
            ))}
          </div>
          <div className="px-4 py-2 bg-sky-600 font-semibold text-white">
            Other Files:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4 mb-2">
            {otherFiles.map((file, index) => (
              <label
                key={`file-${index}`}
                className="flex gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!selectedFiles.find((o) => o === file.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFiles([...selectedFiles, file.value]);
                    } else {
                      setSelectedFiles(
                        selectedFiles.filter((s) => s !== file.value)
                      );
                    }
                  }}
                />
                <div>{file.label}</div>
              </label>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-400 px-5 py-2 flex items-center justify-center gap-2">
          <button
            className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white cursor-pointer transition-all duration-300 rounded min-w-16"
            onClick={() => {
              setSelectedFiles(otherFiles.map((o) => o.value));
              setSelectedSections(pdfSections.map((p) => p.value));
            }}
          >
            All On
          </button>
          <button
            className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white cursor-pointer transition-all duration-300 rounded min-w-16"
            onClick={() => {
              setSelectedFiles([]);
              setSelectedSections([]);
            }}
          >
            All Off
          </button>
          <button className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white cursor-pointer transition-all duration-300 rounded min-w-16">
            Download
          </button>
          <button className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white cursor-pointer transition-all duration-300 rounded min-w-16">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
