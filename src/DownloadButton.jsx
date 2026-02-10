
import html2pdf from "html2pdf.js";

export default function DownloadButton() {
  return (
    <button
      onClick={() => {
        const el = document.getElementById("resume-preview");
        html2pdf().from(el).save("resume.pdf");
      }}
      className="px-4 py-2 bg-black text-white"
    >
      Download PDF
    </button>
  );
}
