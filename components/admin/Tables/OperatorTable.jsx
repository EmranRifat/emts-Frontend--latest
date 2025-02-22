import React, { useState, useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import cookies from "js-cookie";
import ApproveAmountModal from "components/admin/modal/ApproveAmountModal";

function OperatorTable({ operators, isLoading, error, refetch }) {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  // const [action, setAction] = useState(null);
  const action = "approve";
  // Fetch the token on the client side only
  useEffect(() => {
    const accessToken = cookies.get("access");
    setToken(accessToken);
  }, []);

  const handleApprove = (id, type) => {
    setUserId(id);
    setShowModal(true);
    // setAction(type);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserId(null);
  };

  if (isLoading) {
    return (
      <div className="text-center text-lg py-10">
        <Spinner color="default" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/update-self-assigned`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: id,
            action: "reject",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reject the amount.");
      }

      const result = await response.json();
      refetch();

      if (result.status_code === 200) {
        toast.success(result.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to reject amount. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const hasOperators = operators && operators.data && operators.data.length > 0;

  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white dark:bg-darkblack-600">
        <table className="w-full text-sm text-left text-gray-500 bg-white dark:bg-darkblack-600">
          <thead className="text-md text-gray-700 uppercase bg-[#dde4eb] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                SL
              </th>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Phone Number
              </th>
              <th scope="col" className="py-3 px-6">
                User Type
              </th>
              <th scope="col" className="py-3 px-6">
                Created At
              </th>
              <th scope="col" className="py-3 px-6">
                Approved By DPMG
              </th>
              <th scope="col" className="py-3 pl-8">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {hasOperators ? (
              operators.data.map((operator, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-200 cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{operator.id}</td>
                  <td className="py-3 px-6">{operator.name}</td>
                  <td className="py-3 px-6">{operator.phone_number}</td>
                  <td className="py-3 px-6">
                    {operator.assigned_user_type.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    )}
                  </td>
                  <td className="py-3 px-6">{operator.created_at}</td>
                  <td
                    className={`py-3 pl-12 ${
                      operator.self_operator_status === "pending"
                        ? "text-blue-500"
                        : operator.self_operator_status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {operator.self_operator_status}
                  </td>

                  {/* Action Column */}
                  <td className="py-3 gap-4 flex pl-8">
                    {operator.self_operator_status !== "approved" &&
                    operator.self_operator_status !== "rejected" ? (
                      <>
                        <Button
                          radius="full"
                          color="primary"
                          style={{
                            backgroundColor: "#D9E9E6",
                            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
                          }}
                          size="sm"
                          variant="faded"
                          onClick={() =>
                            handleApprove(
                              operator.id,
                              operator.self_operator_status
                            )
                          }
                          className="font-semibold"
                        >
                          Approve
                          {/* Approve SVG Icon */}
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#F2DDE0",
                            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
                          }}
                          radius="full"
                          color="danger"
                          size="sm"
                          variant="faded"
                          onClick={() => handleReject(operator.id)}
                          className="font-semibold"
                        >
                          Reject
                          {/* Reject SVG Icon */}
                        </Button>
                      </>
                    ) : (
                      <span className="text-gray-400 hidden">N/A</span> // or simply leave it blank <span></span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-3 px-6 font-semibold">
                  No self_operators found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ApproveAmountModal
          show={showModal}
          onClose={handleCloseModal}
          userId={userId}
          action={action}
          token={token}
          refetch={refetch}
        />
      )}

      <ToastContainer position="top-right" />
    </div>
  );
}

export default OperatorTable;
