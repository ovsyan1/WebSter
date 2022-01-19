import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
    DottedBorder,
    PhotosBodyWrapper, PhotosHeader,
} from "./styles";
import {DBOrderSettingsSectionType, OrderProps} from "../../../../types";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

export interface PageProps {
    section: DBOrderSettingsSectionType;
    remove: Function;
}

export const Photos: React.FC<PageProps> = ({section, remove}) => {

  return (
    <PhotosBodyWrapper>
        <PhotosHeader>
            <div>Розмір: {section?.size?.name}</div>
            <div onClick={() => remove()}>Видалити</div>
        </PhotosHeader>
        <DottedBorder>
            Вибір фотографій
        </DottedBorder>
    </PhotosBodyWrapper>
  );
};
