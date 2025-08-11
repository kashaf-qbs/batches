import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import QRCode from "react-qr-code";

const PrintQrCode = ({ item }) => {

    
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: `
    @page {
      size: 25mm 25mm portrait;  /* change to portrait if your label is portrait */
      margin: 0;
    }
    @media print {
      body, html {
        margin: 0;
        padding: 0;
        width: 25mm;
        height: 25mm;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #${contentRef.current?.id} {
        width: 25mm !important;
        height: 25mm !important;
        margin: 0 !important;
        padding: 0 !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  `,
  });

  return (
    <>
      <div className="mt-3 p-1 bg-white rounded w-fit" id={`qr-${item.id}`}>
        <div ref={contentRef}>
          <QRCode value={String(item?._id)} size={96} level="H" />
        </div>
      </div>
      <button
        onClick={reactToPrintFn}
        className="mt-3 px-3 py-1 bg-green-500 text-white rounded-md text-xs"
      >
        Print
      </button>
    </>
  );
};

export default PrintQrCode;
