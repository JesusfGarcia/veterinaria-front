import { MenuItem, Select } from "@mui/material";
import React from "react";
import apiConsumer from "../../services";

export default function SelectVet({ value, onChange }) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await apiConsumer({
          method: "GET",
          url: "/users",
        });
        setUsers(data);
      } catch (error) {}
    };
    getData();
  }, []);
  return (
    <Select onChange={onChange} name="vetId" value={value}>
      <MenuItem value={0}>seleccione al usuario que atendió</MenuItem>
      {users.map((user) => {
        return (
          <MenuItem value={user.id}>{`${user.name} ${user.lastName}`}</MenuItem>
        );
      })}
    </Select>
  );
}
