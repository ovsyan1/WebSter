import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";
import { Heading, NoElements, ElementsList, TextFieldWrapper } from "../../styles";
import { getPapers } from "../../../../api";
import { Typography } from "@mui/material";

const AdminMainTypes: React.FC = () => {
  const [papers, setPapers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getPapers().then((res) => {
      if (res.status === 0) {
        setPapers(res.data);
      }
      console.log(res);
    });
  }, []);

  return (
    <div>
      <Heading>
        <Typography variant="h4">Типи - список</Typography>
      </Heading>

      <Button onClick={() => setShowForm(!showForm)}>Додати тип</Button>
      {showForm && (
        <div>
          <Typography variant="h5">
            Додайте назву та тип паперу:
          </Typography>
          <TextFieldWrapper id="name" label="name" variant="outlined" />
        </div>
      )}
      <ElementsList>
        {papers.length === 0 && <NoElements>Ще немає типу паперу</NoElements>}
        {papers.length > 0 && (
          <List>
            <ListItem>Один папір</ListItem>
          </List>
        )}
      </ElementsList>
    </div>
  );
};

export default AdminMainTypes;