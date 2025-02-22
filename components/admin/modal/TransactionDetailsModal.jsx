import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useTransactionDetails } from "lib/hooks/admin/transaction/fetchTransactionDetails";
import Cookies from "js-cookie";
import { BsBoxArrowInDownLeft, BsBoxArrowInUpRight } from "react-icons/bs";
import Image from "next/image";

function TransactionDetailModal({ show, onClose, transaction, type }) {
  const token = Cookies.get("access");
  const id = transaction?.id || 0;
  const transactionType = transaction?.type;
  const modalWidth =
    type === "Closing" || type === "Opening" ? "max-w-xl" : "max-w-4xl";

  // console.log("id +tenasactionType......>>>>",id, transactionType);

  const {
    data: details_data,
    error: post_state_error,
    isLoading: post_state_loading,
    isFetching: post_state_fetching,
  } = useTransactionDetails(token, id, transactionType);

  
  console.log("modal details_data lllll ==>>", details_data?.data);
  // console.log("second_amount ==>>", details_data?.data.first_amount);

  if (!id || !transactionType || !token) {
    return null;
  }

  return (
    <Modal isOpen={show} onOpenChange={onClose}>
      <ModalContent
        className={`${modalWidth} text-base antialiased leading-relaxed`}
      >
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b text-lg font-semibold text-gray-800">
              <div className="flex gap-3 text-gray-600">
                Transaction Details
                {details_data?.data?.first_type === "Sending" &&
                  details_data?.data?.second_type === "Receiving" && (
                    // <BsBoxArrowInDownLeft className="mt-1 text-success-400" />
                    <img src="/Tableicon/User2User.svg" alt="" />
                  )}
                {details_data?.data?.first_type === "Sending" &&
                  details_data?.data?.second_type === "empty" && (
                    <img src="/Tableicon/User2User.svg" alt="" />
                  )}
                {details_data?.data?.first_type === "Opening" &&
                  details_data?.data?.second_type === "Closing" && (
                    <img src="/Tableicon/PO2PO.svg" alt="" />
                  )}
                {details_data?.data?.first_type === "Opening" &&
                  details_data?.data?.second_type === "empty" && (
                    <img src="/Tableicon/PO2PO.svg" alt="" />
                  )}
                {details_data?.data?.first_type === "Central Transaction" &&
                  details_data?.data?.second_type === "empty" && (
                    <img src="/Tableicon/PO2PO.svg" alt="" />
                  )}
                {details_data?.data?.first_type === "empty" &&
                  details_data?.data?.second_type === "Central Transaction" && (
                    <img src="/Tableicon/PO2PO.svg" alt="" />
                  )}
                {details_data?.data?.first_type === "empty" &&
                  details_data?.data?.second_type === "Closing" && (
                    <img src="/Tableicon/PO2PO.svg" alt="" />
                  )}
                {details_data?.data?.first_type === "empty" &&
                  details_data?.data?.second_type === "Receiving" && (
                    <img src="/Tableicon/PO2PO.svg" alt="" />
                  )}
                {/* <p>
                  First :"{details_data?.data?.first_type}" ------- Second: "{" "}
                  {details_data?.data?.second_type}"
                </p> */}
              </div>
            </ModalHeader>

            <ModalBody className="text-black">
              {post_state_loading || post_state_fetching ? (
                <Spinner color="accent" isLoading>
                  Loading
                </Spinner>
              ) : post_state_error ? (
                <p className="text-red-500">
                  Error:{" "}
                  {post_state_error.message || "Failed to load details data."}
                </p>
              ) : (
                <>
                  {details_data?.data?.first_type === "Sending" &&
                    details_data?.data?.second_type === "Receiving" && (
                      <div>
                        <div className="flex gap-4 justify-center border-b py-4">
                          {/* Opening Transaction Details */}
                          <div>
                            <div className=" flex ">
                              <h4 className="font-semibold text-lg mb-2 text-gray-500">
                                Sending Transaction Details
                              </h4>
                              <img
                                className="mb-2 px-2"
                                src="/Tableicon/User2PO.svg"
                                alt=""
                              />
                            </div>

                            <p>
                              <strong>Date:</strong>{" "}
                              {details_data?.data?.first_trans_date}
                            </p>
                            <p>
                              <strong>Post Office:</strong>{" "}
                              {details_data?.data?.first_post_office}
                            </p>

                            <p>
                              <strong>Sender:</strong>{" "}
                              {details_data?.data?.first_sender_name} (
                              {details_data?.data?.first_sender_phone})
                            </p>
                            <p>
                              <strong>Operator:</strong>{" "}
                              {details_data?.data?.first_receiver_name} (
                              {details_data?.data?.first_receiver_phone})
                            </p>
                            <p>
                              <strong>Amount:</strong>{" "}
                              {new Intl.NumberFormat("en-IN").format(
                                details_data?.data?.first_trans_amount ||
                                  details_data?.data?.first_amount
                              )}
                              &nbsp;TK
                              {/* {details_data?.data?.first_trans_amount || details_data?.data?.first_amount}Tk */}
                            </p>
                            <p>
                              <strong>Delivery Fee:</strong>{" "}
                              {details_data?.data?.first_delivery_fee} Tk
                            </p>
                            <p>
                              <strong>Transaction Fee:</strong>{" "}
                              {details_data?.data?.first_trans_fee} Tk
                            </p>
                            <p>
                              <strong>Transaction ID:</strong>{" "}
                              {details_data?.data?.first_trans_id}
                            </p>
                            {details_data?.data?.first_balance_type?.length >
                              0 && (
                              <p>
                                <strong>First balance type:</strong>{" "}
                                {details_data?.data?.first_balance_type}
                              </p>
                            )}

                            {details_data?.data?.first_delivery_type?.length >
                              0 && (
                              <p>
                                <strong>First delivery type:</strong>{" "}
                                {details_data?.data?.first_delivery_type}
                              </p>
                            )}
                            <p>
                              <strong>Transaction Type:</strong>{" "}
                              {details_data?.data?.first_type}
                            </p>
                          </div>

                          <div className="pb-4 mb-4 ">
                            <div className="flex">
                              <h4 className="font-semibold text-lg mb-2 text-gray-500 ">
                                Receiving Transaction Details
                              </h4>
                              <img
                                className="mb-2 px-2"
                                src="/Tableicon/PO2User.svg"
                                alt=""
                              />
                            </div>

                            {details_data?.data?.second_trans_id === "empty" ? (
                              // When second_trans_id is "empty", show this message
                              <div className="text-primary-500 text-xl mt-12 ml-8  font-semibold">
                                Not yet completed.
                              </div>
                            ) : (
                              <div>
                                <p>
                                  <strong>Date:</strong>{" "}
                                  {details_data?.data?.second_trans_date}
                                </p>
                                <p>
                                  <strong>Post Office:</strong>{" "}
                                  {details_data?.data?.second_post_office}
                                </p>
                                <p>
                                  <strong>Operator:</strong>{" "}
                                  {details_data?.data?.second_sender_name} (
                                  {details_data?.data?.second_sender_phone})
                                </p>
                                <p>
                                  <strong>Receiver:</strong>{" "}
                                  {details_data?.data?.second_receiver_name} (
                                  {details_data?.data?.second_receiver_phone})
                                </p>
                                <p>
                                  <strong>Amount:</strong>{" "}
                                  {new Intl.NumberFormat("en-IN").format(
                                    details_data?.data?.second_trans_amount
                                  )}
                                  &nbsp;TK
                                  {/* {details_data?.data?.second_trans_amount} Tk */}
                                </p>
                                {/* <p>
                                  <strong>Transaction Fee:</strong>{" "}
                                  {details_data?.data?.second_trans_fee} Tk
                                </p> */}
                                <p>
                                  <strong>Transaction ID:</strong>{" "}
                                  {details_data?.data?.second_trans_id}
                                </p>

                                {details_data?.data?.second_delivery_type
                                  ?.length > 0 && (
                                  <p>
                                    <strong>Delivery Type:</strong>{" "}
                                    {details_data?.data?.second_delivery_type ||
                                      "Not specified"}
                                  </p>
                                )}
                                {details_data?.data?.second_balance_type
                                  ?.length > 0 && (
                                  <p>
                                    <strong>Balance Type:</strong>{" "}
                                    {details_data?.data?.second_balance_type ||
                                      "Not specified"}
                                  </p>
                                )}
                                <p>
                                  <strong>Transaction Type:</strong>{" "}
                                  {details_data?.data?.second_type}
                                </p>
                              </div>
                            )}

                            {/* <p>
                      <strong>Status:</strong>{" "}
                      {details_data?.data?.close_status}
                    </p> */}
                          </div>
                        </div>
                      </div>
                    )}
                  {details_data?.data?.first_type === "Sending" &&
                    details_data?.data?.second_type === "empty" && (
                      <div>
                        <div className="flex gap-4 border-b">
                          {/* Opening Transaction Details */}
                          <div>
                            <div className="flex  ">
                              <h4 className="font-semibold text-lg mb-2 text-gray-500">
                                Sending Transaction Details
                              </h4>
                              <img
                                className="mb-2 px-2"
                                src="/Tableicon/User2PO.svg"
                                alt=""
                              />
                            </div>

                            <p>
                              <strong>Date:</strong>{" "}
                              {details_data?.data?.first_trans_date}
                            </p>
                            <p>
                              <strong>Post Office:</strong>{" "}
                              {details_data?.data?.first_post_office}
                            </p>

                            <p>
                              <strong>Sender:</strong>{" "}
                              {details_data?.data?.first_sender_name} (
                              {details_data?.data?.first_sender_phone})
                            </p>
                            <p>
                              <strong>Operator:</strong>{" "}
                              {details_data?.data?.first_receiver_name} (
                              {details_data?.data?.first_receiver_phone})
                            </p>
                            <p>
                              <strong>Amount:</strong>{" "}
                              {new Intl.NumberFormat("en-IN").format(
                                details_data?.data?.first_trans_amount
                              )}
                              &nbsp;TK
                              {/* {details_data?.data?.first_trans_amount} Tk */}
                            </p>
                            <p>
                              <strong>Transaction fee:</strong>{" "}
                              {details_data?.data?.first_trans_fee} TK
                            </p>

                            <p>
                              <strong>Delivery Fee:</strong>{" "}
                              {details_data?.data?.first_delivery_fee} Tk
                            </p>
                            <p>
                              <strong>Transaction ID:</strong>{" "}
                              {details_data?.data?.first_trans_id}
                            </p>

                            <p>
                              <strong>Transaction Type:</strong>{" "}
                              {details_data?.data?.first_type}
                            </p>
                          </div>

                          <div className="pb-4 mb-4 ">
                            <div className="flex  ">
                              <h4 className="font-semibold text-lg mb-2 text-gray-500">
                                Receiving Transaction Details
                              </h4>
                              <img
                                className="mb-2 px-2"
                                src="/Tableicon/PO2User.svg"
                                alt=""
                              />
                            </div>
                            {details_data?.data?.second_trans_id === "empty" ? (
                              // When second_trans_id is "empty", show this message
                              <div className="text-primary-500 text-xl mt-12 font-semibold">
                                Not yet completed.
                              </div>
                            ) : (
                              // When second_trans_id is not "empty", render all the transaction details
                              <div>
                                <p>
                                  <strong>Date:</strong>{" "}
                                  {details_data?.data?.second_trans_date}
                                </p>
                                <p>
                                  <strong>Post Office:</strong>{" "}
                                  {details_data?.data?.second_post_office}
                                </p>
                                <p>
                                  <strong>Sender:</strong>{" "}
                                  {details_data?.data?.second_sender_name} (
                                  {details_data?.data?.second_sender_phone})
                                </p>
                                <p>
                                  <strong>Receiver:</strong>{" "}
                                  {details_data?.data?.second_receiver_name} (
                                  {details_data?.data?.second_receiver_phone})
                                </p>
                                <p>
                                  <strong>Amount:</strong>{" "}
                                  {details_data?.data?.second_amount} Tk
                                </p>
                                <p>
                                  <strong>Transaction ID:</strong>{" "}
                                  {details_data?.data?.second_trans_id}
                                </p>
                                <p>
                                  <strong>Delivery Type:</strong>{" "}
                                  {details_data?.data?.second_delivery_type}
                                </p>
                                <p>
                                  <strong>Balance Type:</strong>{" "}
                                  {details_data?.data?.second_balance_type}
                                </p>
                                <p>
                                  <strong>Transaction Type:</strong>{" "}
                                  {details_data?.data?.second_type}
                                </p>
                              </div>
                            )}

                            {/* <p>
                      <strong>Status:</strong>{" "}
                      {details_data?.data?.close_status}
                    </p> */}
                          </div>
                        </div>
                      </div>
                    )}

                  {details_data?.data?.second_type === "Receiving" &&
                    details_data?.data?.first_type === "empty" && (
                      <div>
                        <div className="flex gap-8 border-b justify-center py-4">
                          {/* Opening Transaction Details */}
                          <div>
                            <h4 className="font-semibold text-lg mb-2 text-gray-500">
                              Sending Transaction Details
                            </h4>

                            {details_data?.data?.first_trans_id === "empty" ? (
                              // When second_trans_id is "empty", show this message
                              <div className="text-primary-500 text-xl mt-12 ml-8 font-semibold">
                                Not yet completed.
                              </div>
                            ) : (
                              <div>
                                <p>
                                  <strong>Date:</strong>{" "}
                                  {details_data?.data?.first_trans_date}
                                </p>
                                <p>
                                  <strong>Post Office:</strong>{" "}
                                  {details_data?.data?.first_post_office}
                                </p>

                                <p>
                                  <strong>Sender:</strong>{" "}
                                  {details_data?.data?.first_sender_name} (
                                  {details_data?.data?.first_sender_phone})
                                </p>
                                <p>
                                  <strong>Receiver:</strong>{" "}
                                  {details_data?.data?.first_receiver_name} (
                                  {details_data?.data?.first_receiver_phone})
                                </p>
                                <p>
                                  <strong>Amount:</strong>{" "}
                                  {new Intl.NumberFormat("en-IN").format(
                                    details_data?.data?.first_trans_amount
                                  )}
                                  &nbsp;TK
                                  {/* {details_data?.data?.first_trans_amount} Tk */}
                                </p>
                                <p>
                                  <strong>Transaction ID:</strong>{" "}
                                  {details_data?.data?.first_trans_id}
                                </p>
                                <p>
                                  <strong>Transaction Fee:</strong>{" "}
                                  {details_data?.data?.second_trans_fee}
                                </p>
                                {/* <p>
                            <strong>First balance type:</strong>{" "}
                            {details_data?.data?.first_balance_type}
                          </p>
                          <p>
                            <strong>First delivery type:</strong>{" "}
                            {details_data?.data?.first_delivery_type}
                          </p> */}
                                {/* <p>
                                  <strong>Transaction Type:</strong>{" "}
                                  {details_data?.data?.first_type}
                                </p> */}
                              </div>
                            )}
                          </div>

                          <div className="pb-4 mb-4 ">
                            <h4 className="font-semibold text-lg mb-2 text-gray-500 ">
                              Receiving Transaction Details
                            </h4>

                            <div>
                              <p>
                                <strong>Date:</strong>{" "}
                                {details_data?.data?.second_trans_date}
                              </p>
                              <p>
                                <strong>Post Office:</strong>{" "}
                                {details_data?.data?.second_post_office}
                              </p>
                              <p>
                                <strong>Sender:</strong>{" "}
                                {details_data?.data?.second_sender_name} (
                                {details_data?.data?.second_sender_phone})
                              </p>
                              <p>
                                <strong>Receiver:</strong>{" "}
                                {details_data?.data?.second_receiver_name} (
                                {details_data?.data?.second_receiver_phone})
                              </p>
                              <p>
                                <strong>Amount:</strong>{" "}
                                {new Intl.NumberFormat("en-IN").format(
                                  details_data?.data?.second_trans_amount
                                )}
                                &nbsp;TK
                                {/* {details_data?.data.second_trans_amount} Tk */}
                              </p>
                              <p>
                                <strong>Transaction ID:</strong>{" "}
                                {details_data?.data?.second_trans_id}
                              </p>
                              <p>
                                <strong>Transaction Fee:</strong>{" "}
                                {details_data?.data?.second_trans_fee}
                              </p>
                              {details_data?.data?.second_delivery_type
                                ?.length > 0 && (
                                <p>
                                  <strong>Delivery Type:</strong>{" "}
                                  {details_data?.data?.second_delivery_type}
                                </p>
                              )}
                              {details_data?.data?.second_balance_type?.length >
                                0 && (
                                <p>
                                  <strong>Balance Type:</strong>{" "}
                                  {details_data?.data?.second_balance_type}
                                </p>
                              )}
                              <p>
                                <strong>Transaction Type:</strong>{" "}
                                {details_data?.data?.second_type}
                              </p>
                            </div>

                            <p>
                              <strong>Status:</strong>{" "}
                              {details_data?.data?.close_status}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  {type === "Closing" && (
                    <div>
                      <div className="flex gap-4 border-b py-4 ">
                        <div className="pb-4 mb-4">
                          <h4 className="font-semibold text-lg mb-2 text-gray-500">
                            Closing Transaction Details
                          </h4>
                          {details_data?.data?.second_trans_id === "empty" ? (
                            <div className="text-primary-500 text-xl mt-12 ml-8  font-semibold">
                              Not yet completed.
                            </div>
                          ) : (
                            <div>
                              <p>
                                <strong>Date:</strong>{" "}
                                {details_data?.data?.second_trans_date}
                              </p>
                              <p>
                                <strong>Post Office:</strong>{" "}
                                {details_data?.data?.second_post_office}
                              </p>
                              <p>
                                <strong>Sender:</strong>{" "}
                                {details_data?.data?.second_sender_name} (
                                {details_data?.data?.second_sender_phone})
                                [{details_data?.data?.second_sender_user_type}]
                              </p>
                              <p>
                                <strong>Receiver:</strong>{" "}
                                {details_data?.data?.second_receiver_name} (
                                {details_data?.data?.second_receiver_phone})
                                [{details_data?.data?.second_receiver_user_type}]
                              </p>
                              <p>
                                <strong>Amount:</strong>{" "}
                                {new Intl.NumberFormat("en-IN").format(
                                  details_data?.data?.second_trans_amount
                                )}{" "}
                                TK
                              </p>
                              <p>
                                <strong>Transaction ID:</strong>{" "}
                                {details_data?.data?.second_trans_id}
                              </p>
                              {/* <p><strong>Delivery Type:</strong> {details_data?.data?.second_delivery_type ? details_data?.data?.second_delivery_type : "Not specified"}</p> */}
                              {/* <p>
                                <strong>Delivery type:</strong>{" "}
                                {details_data?.data?.second_delivery_type ? (
                                  details_data?.data?.second_delivery_type
                                ) : (
                                  <span className="text-blue-600">
                                    Not specified
                                  </span>
                                )}
                                {details_data?.data?.second_delivery_type}
                              </p> */}
                              {/* <p>
                                <strong>Transaction Type:</strong>{" "}
                                {details_data?.data?.second_type}
                              </p> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {type === "Opening" && (
                    <div>
                      <div className="flex gap-4 border-b py-4 ">
                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-500">
                            {details_data?.data?.first_type} Details
                          </h4>
                          <p>
                            <strong>Date:</strong>{" "}
                            {details_data?.data?.first_trans_date}
                          </p>
                          <p>
                            <strong>Post Office:</strong>{" "}
                            {details_data?.data?.first_post_office}
                          </p>
                          <p>
                            <strong>Sender:</strong>{" "}
                            {details_data?.data?.first_sender_name} (
                            {details_data?.data?.first_sender_phone}) [
                            {details_data?.data?.first_sender_user_type}]
                          </p>

                          <p>
                            <strong>Receiver:</strong>{" "}
                            {details_data?.data?.first_receiver_name} (
                            {details_data?.data?.first_receiver_phone})
                            [{details_data?.data?.first_receiver_user_type}]
                          </p>
                          <p>
                            <strong>Amount:</strong>{" "}
                            {new Intl.NumberFormat("en-IN").format(
                              details_data?.data?.first_trans_amount
                            )}{" "}
                            TK
                          </p>
                          <p>
                            <strong>Transaction ID:</strong>{" "}
                            {details_data?.data?.first_trans_id}
                          </p>
                          {/* <p><strong>First balance type:</strong> {details_data?.data?.first_balance_type || "Not specified"}</p> */}
                          {/* <p>
                            <strong>First balance type:</strong>{" "}
                            {details_data?.data?.first_balance_type ? (
                              details_data?.data?.first_balance_type
                            ) : (
                              <span className="text-blue-600">
                                Not specified
                              </span>
                            )}
                            {details_data?.data?.first_balance_type}
                          </p> */}
                          {/* <p><strong>First delivery type:</strong> {details_data?.data?.first_delivery_type || "Not specified"}</p> */}
                          {/* <p>
                            <strong>First delivery type:</strong>{" "}
                            {details_data?.data?.first_delivery_type ? (
                              details_data?.data?.first_delivery_type
                            ) : (
                              <span className="text-blue-600">
                                Not specified
                              </span>
                            )}
                            {details_data?.data?.first_delivery_type}
                          </p> */}
                          {/* <p>
                            <strong>Transaction Type:</strong>{" "}
                            {details_data?.data?.first_type}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default TransactionDetailModal;
