import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

interface PropsType {
    labelSizeName?: boolean;
    labelPapierName?: boolean;
}

const labelSizeNameObject = {
    small: 'small',
    middle: 'middle',
    big: 'big',
    extraBig: 'extraBig',
}
const labelPapierNameObject = {
    white: 'white',
    yellow: 'yellow',
    red: 'red',
}

const FormControlLabelPosition: React.FC<PropsType> = ({labelSizeName, labelPapierName}) => {

    const componentFormSizeName = labelSizeName && (
        <>
        <FormControlLabel
                value="top"
                control={<Checkbox />}
                label={labelSizeNameObject.small}
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="start"
                control={<Checkbox />}
                label={labelSizeNameObject.middle}
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="bottom"
                control={<Checkbox />}
                label={labelSizeNameObject.big}
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="end"
                control={<Checkbox />}
                label={labelSizeNameObject.extraBig}
                labelPlacement="bottom"
                />
        </>
    )
    const componentFormPaperName = labelPapierName && (
        <>
        <FormControlLabel
                value="top"
                control={<Checkbox />}
                label={labelPapierNameObject.yellow}
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="start"
                control={<Checkbox />}
                label={labelPapierNameObject.white}
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="bottom"
                control={<Checkbox />}
                label={labelPapierNameObject.red}
                labelPlacement="bottom"
                />
        </>
    )
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
      {componentFormSizeName || componentFormPaperName}
      </FormGroup>
    </FormControl>
  );
}

export default FormControlLabelPosition;