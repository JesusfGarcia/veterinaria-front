import React from "react";

import { useNavigate } from "react-router-dom";

export default function Redirect({to}) {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(to);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
}
