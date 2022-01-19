import React, { useEffect, useState, ChangeEvent } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";
import {
  Heading,
  NoElements,
  ElementsList,
  TextFieldWrapper,
} from "../../styles";
import { getPapers, postPapers } from "../../../../api";
import { Typography } from "@mui/material";

const AdminMainPapers: React.FC = () => {
  const [papers, setPapers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [sizeInput, setSizeInput] = useState<string>("");
  const [typePaperInput, setTypePaperInput] = useState<string>("");
  const [densityInput, setDensityInput] = useState<number>(0);

  useEffect(() => {
    getPapers().then((res) => {
      if (res.status === 0) {
        setPapers(res.data);
      }
      console.log(res);
    });
  }, []);

  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNameInput(e.target.value);
  };
  const handleChangeSize = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSizeInput(e.target.value);
  };
  const handleChangeTypePaper = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTypePaperInput(e.target.value);
  };
  const handleChangeDensity = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDensityInput(+e.target.value);
  };

  const creatingPostRequestWithSizes = () => {
    postPapers({
      name: nameInput,
      size: sizeInput,
      typePaper: typePaperInput,
      density: densityInput,
    }).then(
      (res) => {
        if (res.status === 0) {
          setNameInput('');
          setSizeInput('');
          setTypePaperInput('');
          setDensityInput(0);
        }
      });
  };

  return (
    <div>
      <Heading>
        <Typography variant="h4">Папір - список</Typography>
      </Heading>

      <Button onClick={() => setShowForm(!showForm)}>Додати папір</Button>
      {showForm && (
        <>
          <div>
            <Typography variant="h5">
              Додайте назву та параметри паперу:
            </Typography>
            <TextFieldWrapper
              id="name"
              label="name"
              variant="outlined"
              value={nameInput}
              onChange={handleChangeName}
            />
            <TextFieldWrapper
              id="name"
              label="size"
              variant="outlined"
              value={sizeInput}
              onChange={handleChangeSize}
            />
            <TextFieldWrapper
              id="name"
              label="typePaper"
              variant="outlined"
              value={typePaperInput}
              onChange={handleChangeTypePaper}
            />
            <TextFieldWrapper
              id="name"
              label="density"
              variant="outlined"
              value={densityInput}
              onChange={handleChangeDensity}
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
        {papers.length === 0 && <NoElements>Ще немає паперу</NoElements>}
        {papers.length > 0 && (
          <List>
            <ListItem>Один папір</ListItem>
          </List>
        )}
      </ElementsList>
    </div>
  );
};

export default AdminMainPapers;
