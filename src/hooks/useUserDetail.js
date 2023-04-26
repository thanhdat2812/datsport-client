import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import authApi from "../api/auth";
import { getProfile } from "../redux/authActions";
import { useCallback } from "react";

export default function useUserDetail() {
  const [loading, setLoading] = useState(false);

  const { userName } = JSON.parse(localStorage.getItem("data_user")) ?? {};

  const { userDetail } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDetail) {
      dispatch(getProfile({ username: userName }));
    }
  }, [dispatch]);


  return {...userDetail};
}
