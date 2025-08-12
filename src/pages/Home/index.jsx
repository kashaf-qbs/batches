import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrintQrCode from "../../components/PrintQrCode";
import axios, { isAxiosError } from "axios";
import { useLoadingBar } from "react-top-loading-bar";
import { toast } from "react-toastify";

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { start, complete } = useLoadingBar({
    height: 2,
  });

  useEffect(() => {
    let hasShownError = false;

    const getData = async () => {
      try {
        start();
        const res = await axios.get(
          "http://zconnectstaging.qbscocloud.net:5000/api/batches",
          {
            headers: {
              "x-api-key": "batches@123",
            },
          }
        );
        setData(res?.data?.data);
      } catch (err) {
        if (isAxiosError(err)) {
          console.error(err?.response?.data?.message || "Something went wrong");

          if (!hasShownError) {
            toast.error(
              err?.response?.data?.message || "An unexpected error occurred",
              { toastId: "fetchError" }
            );
            hasShownError = true;
          }
        } else {
          console.error(err);
          if (!hasShownError) {
            toast.error("An unexpected error occurred", {
              toastId: "fetchError",
            });
            hasShownError = true;
          }
        }
      } finally {
        complete();
      }
    };

    getData();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const formatTimeStamp = (ts) =>
    new Date(ts).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Batches Data</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>

        {data.length === 0 ? (
          <p className="font-bold text-gray-700">No Data Found!</p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700 sticky top-0">
                  <tr>
                    <th className="border px-4 py-2 text-left">Batch ID</th>
                    <th className="border px-4 py-2 text-left">Product Name</th>
                    <th className="border px-4 py-2 text-left">Description</th>
                    <th className="border px-4 py-2 text-left">Qty</th>
                    <th className="border px-4 py-2 text-left">Codes</th>
                    <th className="border px-4 py-2 text-left">Timestamp</th>
                    <th className="border px-4 py-2 text-left">QR</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={`${item.id}-${idx}`} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 font-medium">
                        {item?._id}
                      </td>
                      <td className="border px-4 py-2 font-medium">
                        {item?.product_name}
                      </td>
                      <td className="border px-4 py-2 font-medium">
                        {item?.product_description}
                      </td>
                      <td className="border px-4 py-2 font-medium">
                        {item?.quantity}
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex flex-wrap gap-1">
                          {item.codes.map((c, i) => (
                            <span
                              key={i}
                              className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="border px-4 py-2 text-gray-600">
                        {formatTimeStamp(item?.createdAt)}
                      </td>
                      <td className="border px-4 py-2">
                        <PrintQrCode item={item} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {data.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <p className="text-xs text-gray-500">Batch ID</p>
                  <p className="text-sm font-medium">{item._id}</p>

                  <p className="text-xs text-gray-500">Product Name</p>
                  <p className="text-sm font-medium">{item?.product_name}</p>

                  <p className="text-xs text-gray-500">Description</p>
                  <p className="text-sm font-medium">
                    {item?.product_description}
                  </p>

                  <p className="text-xs text-gray-500">Quantity</p>
                  <p className="text-sm font-medium">{item?.quantity}</p>

                  <p className="text-xs text-gray-500 mt-2">Codes</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.codes.map((c, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 mt-2">Timestamp</p>
                  <p className="text-sm text-gray-600">
                    {formatTimeStamp(item.createdAt)}
                  </p>

                  <PrintQrCode item={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
