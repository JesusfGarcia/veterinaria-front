import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import apiConsumer from "../../services";

export default function SearchPet({ value, onChange }) {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await apiConsumer({
          method: "get",
          url: "pets",
        });
        setList(
          data.rows.map((item) => {
            return {
              ...item,
              label: `${item.name} ${item.lastName}`,
            };
          })
        );
      } catch (error) {}
    };
    getList();
  }, []);

  const handleInputChange = (text) => {
    const findElement = list.find((item) => item.label === text);
    if (findElement) {
      //guardar el id
      onChange({
        target: {
          name: "petId",
          value: findElement.id,
        },
      });
    }
  };

  const autocompleteValue = React.useMemo(() => {
    const defaultValue = list.find(
      (item) => parseInt(item.id) === parseInt(value)
    );

    if (defaultValue) {
      return defaultValue?.label;
    }
    return "sin mascota";
  }, [value, list]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={list}
      value={autocompleteValue}
      renderInput={(params) => <TextField {...params} label="Mascota" />}
      onInputChange={(event, newInputValue) => {
        handleInputChange(newInputValue);
      }}
    />
  );
}
