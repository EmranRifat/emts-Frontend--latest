import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { usePossData } from "lib/hooks/admin/users/usePossData";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import UnbindAlartModal from "./UnbindAlartModal";
import BindAlertModal from "./BindAlertModal";

function PosDataModal({ isModalOpen, handleCloseModal, user }) {
  const token = Cookies.get("access");
  const [constructionMessage, setConstructionMessage] = useState("");
  const [userStatus, setUserStatus] = useState(null);
  const [posMachineData, setPosMachineData] = useState([]);

  const [error, setError] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPosData, setSelectedPosData] = useState([]);
  const [selectedPosData2, setSelectedPosData2] = useState([]);
  const [isUnbind, setIsUnbind] = useState(false);

  const {
    data: poss_data,
    error: poss_state_error,
    isLoading: poss_state_loading,
    isFetching: poss_state_fetching,
  } = usePossData(token, user?.id);

  const possData = poss_data?.data?.pos_machine_data;
  const userIsActive = poss_data?.data?.user_data[0]?.user_is_active;
  const userId = poss_data?.data?.user_data[0]?.id;

  const [isLongPress, setIsLongPress] = useState(false);
  const longPressTimer = useRef(null);


  const handleLongPressStart = (action) => {
    setIsLongPress(true);
    longPressTimer.current = setTimeout(() => {
      if (action === "disable") {
        handleUserDisable();
      } else {
        handleUserEnable();
      }

      setIsLongPress(false);
    }, 1000); 
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer.current);
    setIsLongPress(false);
  };

  useEffect(() => {
    if (poss_data && poss_data.data && poss_data.data.user_data) {
      setUserStatus(userIsActive ? "enabled" : "disabled");
      setPosMachineData(poss_data?.data?.pos_machine_data);
    }
  }, [poss_data]);

  if (poss_state_loading || poss_state_fetching) {
    return <p>Loading...</p>;
  }

  if (poss_state_error) {
    console.error("Error fetching possData:", poss_state_error);
    return <p>Error fetching data: {poss_state_error.message}</p>;
  }

  const togglePosBindStatus = (posId, status) => {
    console.log("posId", posId, status);
    if (status === "bind") {
      setPosMachineData((prevData) =>
        prevData.map((pos) =>
          pos.pos_machine_id === posId
            ? { ...pos, is_active: true }
            : { ...pos }
        )
      );
    } else if (status === "unbind") {
      setPosMachineData((prevData) =>
        prevData.map((pos) =>
          pos.pos_machine_id === posId
            ? { ...pos, is_active: false }
            : { ...pos }
        )
      );
    }
  };

  const handleUserDisable = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users-change-status`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            status: "deactivate",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      if (result.status === "success") {
        setUserStatus("disabled");
        toast.success("User disable successfully..!");
        setConstructionMessage("User disabled successfully..!");
      }
    } catch (error) {
      console.error("Failed to disable user:", error);
      setError(error.message || "Failed to disable user");
    }
  };

  const handleUserEnable = async () => {
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users-change-status`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            status: "active",
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      if (result.status === "success") {
        setUserStatus("enabled");
        toast.success("User enabled successfully..!");
        setConstructionMessage("User enabled successfully..!");
      }
    } catch (error) {
      setError(error.message || "Failed to enable user");
    }
  };

  // const handleBindSuccess = (pos_machine_id) => {
  //   setPosMachineStatusBind((prevStatus) => ({
  //     ...prevStatus,
  //     [pos_machine_id]: true,
  //   }));
  // };

  // const handleUnbindSuccess = (pos_machine_id) => {
  //   setPosMachineStatusUnbind((prevStatus) => ({
  //     ...prevStatus,
  //     [pos_machine_id]: false,
  //   }));
  // };

  const handleConfirmUnbind = (pos_machine_id, sim_number, user_id) => {
    onOpenChange(true);
    setSelectedPosData({ pos_machine_id, sim_number, user_id });
  };

  const handleConfirmBind = (pos_machine_id, sim_number, user_id) => {
    setIsUnbind(true);
    setSelectedPosData2({ pos_machine_id, sim_number, user_id });
  };

  return (
    <div>
      <Modal
        className="text-gray-800"
        isOpen={isModalOpen}
        onOpenChange={handleCloseModal}
      >
        <ModalContent className="max-w-2xl">
          <ModalHeader>
            {/* Details for - {user?.first_name} {user?.last_name} */}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="flex border-b">
                {/* User Details */}
                <div className="pb-4">
                  <strong className="text-lg">Details of - </strong>{" "}
                  <span className="text-lg text-gray-700 font-semibold">
                    {user?.first_name} {user?.last_name}
                  </span>
                  <p>
                    <strong>Post Office:</strong> {user?.post_office}
                  </p>
                  <p>
                    <strong>Post-Code:</strong> {user?.post_code}
                  </p>
                  <p>
                    <strong>NID Number:</strong> {user?.nid}
                  </p>
                  <p>
                    <strong>Gender:</strong> {user?.gender}
                  </p>
                </div>

                {/* Bind and Unbind Actions */}
                {/* <div className="flex justify-center md:ml-24">
                  {userStatus === "disabled" ? (
                    <Button
                      onPress={handleUserEnable}
                      variant="ghost"
                      className="text-green-500"
                      endContent={
                        <Image
                          src="/Tableicon/success.svg"
                          alt="Enable icon"
                          width={16}
                          height={16}
                        />
                      }
                    >
                      Enable
                    </Button>
                  ) : (
                    <Button
                      onPress={handleUserDisable}
                      variant="ghost"
                      className="text-red-500"
                      endContent={
                        <Image
                          src="/Tableicon/disable.svg"
                          alt="Disable icon"
                          width={16}
                          height={16}
                        />
                      }
                    >
                      Disable
                    </Button>
                  )}
                </div> */}
               <div className="flex justify-center md:pl-24">
                {userStatus === "disabled" ? (
                  <Button
                    onPointerDown={() => handleLongPressStart("enable")}
                    onPointerUp={handleLongPressEnd}
                    onPointerLeave={handleLongPressEnd}
                    variant="ghost"
                    className={`text-green-500 font-semibold ${isLongPress ? "animate-long-press" : ""}`}
                  >
                    <Image src="/Tableicon/success.svg" alt="Enable icon" width={16} height={16} />
                    Enable
                    {isLongPress && (
                      <span className="long-press-progress"></span>
                    )}
                  </Button>
                ) : (
                  <Button
                    onPointerDown={() => handleLongPressStart("disable")}
                    onPointerUp={handleLongPressEnd}
                    onPointerLeave={handleLongPressEnd}
                    variant="ghost"
                    className={`text-red-500  font-semibold ${isLongPress ? "animate-long-press" : ""}`}
                  >
                    <Image src="/Tableicon/disable.svg" alt="Disable icon" width={16} height={16} />
                    Disable
                    {isLongPress && (
                      <span className="long-press-progress"></span>
                    )}
                  </Button>
                )}
              </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}

              <h1 className="text-lg text-gray-600 font-semibold">
                All Binding Data
              </h1>
              {/* POS Machine Data Table */}
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white dark:bg-darkblack-600">
                <table className="w-full text-xs text-left text-gray-700 dark:text-gray-400 bg-white dark:bg-darkblack-600">
                  <thead className="text-sm text-gray-800 bg-[#dde4eb] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-2 pl-2">
                        SL
                      </th>
                      <th scope="col" className="py-2 pl-2">
                        POS Machine ID
                      </th>
                      <th scope="col" className="py-2 px-2">
                        SIM Number
                      </th>
                      <th scope="col" className="py-2 px-2 whitespace-nowrap">
                        Created Date
                      </th>
                      <th scope="col" className="py-2 px-2 whitespace-nowrap">
                        Updated Date
                      </th>
                      <th scope="col" className="py-2 px-2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-darkblack-600 text-sm">
                    {Array.isArray(possData) && possData.length > 0 ? (
                      posMachineData.map((poss, index) => (
                        <tr
                          key={index}
                          className={` ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="py-0.5 px-2">{index + 1}</td>
                          <td className="py-0.5 px-1">{poss.pos_machine_id}</td>
                          <td className="py-0.5 px-1">
                            {poss.pos_machine_sim_number}
                          </td>
                          <td className="py-0.5 px-1">
                            {poss.pos_machine_created_at}
                          </td>
                          <td className="py-0.5 px-1">
                            {poss.pos_machine_updated_at}
                          </td>

                      
                          {console.log(
                            "is_active status for POS Machine ID",
                            poss.pos_machine_id,
                            ":",
                            poss.is_active
                          )}

                          <td className="py-0.5 pl-3 cursor-pointer">
                            {/* Check if the POS machine is inactive */}
                            {poss.is_active === false ? (
                              <Image
                                onClick={() =>
                                  handleConfirmBind(
                                    poss.pos_machine_id,
                                    poss.pos_machine_sim_number,
                                    userId
                                  )
                                }
                                height={20}
                                width={20}
                                src="/Tableicon/red lock.svg"
                                alt="Red lock icon"
                              />
                            ) : poss.is_active === true ? (
                              <Image
                                onClick={() =>
                                  handleConfirmUnbind(
                                    poss.pos_machine_id,
                                    poss.pos_machine_sim_number,
                                    userId
                                  )
                                }
                                height={16}
                                width={18}
                                src="/Tableicon/lock-closed.svg"
                                alt="Closed lock icon"
                              />
                            ) : (
                              <Image
                                onClick={() =>
                                  handleConfirmBind(
                                    poss.pos_machine_id,
                                    poss.pos_machine_sim_number,
                                    userId
                                  )
                                }
                                height={20}
                                width={20}
                                src="/Tableicon/red lock.svg"
                                alt="Red lock icon"
                              />
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-1 px-3 text-red-400 font-semibold"
                        >
                          No POS machine data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {constructionMessage && (
                <p className="text-green-500 mt-4">{constructionMessage}</p>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="error" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <UnbindAlartModal
        selectedPosData={selectedPosData}
        isOpen={isOpen}
        token={token}
        onOpenChange={onOpenChange}
        togglePosBindStatus={togglePosBindStatus}
      />

      <BindAlertModal
        selectedPosData2={selectedPosData2}
        isOpen={isUnbind}
        setIsUnbind={setIsUnbind}
        token={token}
        handleConfirmBind={handleConfirmBind}
        togglePosBindStatus={togglePosBindStatus}
      />
      <ToastContainer />
   
      <style jsx>{`
        .long-press-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background:rgba(0, 123, 255, 0.7);
          animation: slide-progress 1s linear forwards;
        }

        @keyframes slide-progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default PosDataModal;
