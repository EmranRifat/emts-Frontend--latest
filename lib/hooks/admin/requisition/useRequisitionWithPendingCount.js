import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { useRequisitionData } from "./useRequisitionData";

export const useRequisitionWithPendingCount = (page, pageSize, search) => {
  const token = Cookies.get("access");
  const [countPendingRequisition, setCountPendingRequisition] = useState(0);

  const {
    data: requisitions_state,
    isLoading: requisitions_state_loading,
    error: requisitions_state_error,
    isFetching: requisitions_state_fetching,
    refetch: refetch_requisitions,
  } = useRequisitionData(token, page, pageSize, search);

  const pendingRequisitions = useMemo(() => {
    if (requisitions_state && requisitions_state.data) {
      return requisitions_state.data.data?.filter((req) => req.status === "pending");
    }
    return [];
  }, [requisitions_state]);

  useEffect(() => {
    setCountPendingRequisition(pendingRequisitions?.length);
  }, [pendingRequisitions]);

  return {
    requisitions_state,
    countPendingRequisition,
    requisitions_state_loading,
    requisitions_state_fetching,
    requisitions_state_error,
    refetch_requisitions,
  };
};
