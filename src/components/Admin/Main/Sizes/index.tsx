import React, { ChangeEvent, useEffect, useState } from "react";

import {
  ElementsList,
  Heading,
  NoElements,
  TextFieldWrapper,
} from "../../styles";
import { Button, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { getSizes, postSizes } from "../../../../api";
import { RootState } from "../../../../store/rootReducer";

const AdminMainSizes: React.FC = () => {
  const [paper, setPaper] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [widthInput, setWidthInput] = useState<number>(0);
  const [heightInput, setHeightInput] = useState<number>(0);
  const sizes = useSelector((state: RootState) => state.sizes.sizesResponse);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSizes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNameInput(e.target.value);
  };
  const handleChangeWidth = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWidthInput(+e.target.value);
  };
  const handleChangeHeight = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHeightInput(+e.target.value);
  };

  const creatingPostRequestWithSizes = () => {
    setPaper(false);
    postSizes({ name: nameInput, width: widthInput, height: heightInput }).then(
      (res) => {
        if (res.status === 0) {
          setNameInput("");
          setWidthInput(0);
          setHeightInput(0);
          setPaper(true)
        }
      }
    );
    dispatch(getSizes());
  };

  return (
    <div>
      <Heading>
        <Typography variant="h4">Розміри - список</Typography>
      </Heading>

      <Button onClick={() => setShowForm(!showForm)}>Додати розмір</Button>
      {showForm && (
        <>
          <div>
            <Typography variant="h5" style={{ marginLeft: 10 }}>
              Додайте назву та параметри розміру:
            </Typography>
            <TextFieldWrapper
              id="name"
              name="name"
              label="Назва розміру"
              variant="outlined"
              value={nameInput}
              onChange={handleChangeName}
            />
            <TextFieldWrapper
              id="width"
              label="Ширина"
              variant="outlined"
              value={widthInput}
              onChange={handleChangeWidth}
            />
            <TextFieldWrapper
              id="height"
              label="Висота"
              variant="outlined"
              value={heightInput}
              onChange={handleChangeHeight}
            />
          </div>
          <Button
            onClick={creatingPostRequestWithSizes}
            style={{ marginTop: 20 }}
          >
            Add
          </Button>
        </>
      )}
      <ElementsList>
        {paper ? <NoElements>Один папір</NoElements> : <NoElements>Ще немає паперу</NoElements>}
               {paper && <List>
                    <ListItem>
                        Один папір
                    </ListItem>
                </List>}
      </ElementsList>
    </div>
  );
};

export default AdminMainSizes;
