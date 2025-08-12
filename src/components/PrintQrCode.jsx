import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import QRCode from "react-qr-code";

const PrintQrCode = ({ item }) => {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: `
    @page {
      size: auto;
      margin: 0;
    }
    @media print {
      body {
        margin: 0;
      }
      #print-content {
        width: 100vw;
        height: 100vh;
      }
    }
  `,
  });

  return (
    <>
      <div className="mt-3 p-1 bg-white rounded w-fit">
        {/* Printable Content not shown in the UI*/}
        <div ref={contentRef} id={`qr-${item._id}`} className="print-only">
          <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-4 border border-gray-200">
            <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg">
              <QRCode value={item?._id} size={96} level="H" />
            </div>

            <div className="flex flex-col justify-center text-sm gap-2">
              <p className="font-semibold text-gray-800">
                Product Name: <span className="font-normal">{item?.product_name}</span>
              </p>
              <p className="font-semibold text-gray-800">
                Description:{" "}
                <span className="font-normal">
                 {item?.product_description}
                </span>
              </p>
              <p className="font-semibold text-gray-800">
                Qty: <span className="font-normal">{item?.quantity}</span>
              </p>
            </div>
          </div>
        </div>

        {/* UI Part */}
        <QRCode value={item?._id} size={96} level="H" />
        <button
          onClick={reactToPrintFn}
          className="mt-3 px-3 py-1 bg-green-500 text-white rounded-md text-xs"
        >
          Print
        </button>
      </div>
    </>
  );
};

export default PrintQrCode;
