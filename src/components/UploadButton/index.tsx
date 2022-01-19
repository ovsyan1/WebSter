import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Input } from './styles';

export interface PropsType {
    getImage?: (e: any) => void;
}


const UploadButton: React.FC<PropsType>= ({ getImage }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={getImage}/> 
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </Stack>
  );
}

export default UploadButton;