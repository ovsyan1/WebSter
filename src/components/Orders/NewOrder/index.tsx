import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
    Container,
    TypographyWrapper,
    BodyWrapper,
    ButtonWrapper,
    UploadButtonWrapper,
} from "./styles";
import {DBOrderSettingsType, DBSizeType, OrderProps} from "../../../types";
import CheckBoxGroup from '../../CheckBoxGroup';
import FormLabel from '@mui/material/FormLabel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import {
    StepLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import UploadButton from "../../UploadButton";
import {Photos} from "./Photos";
import {useEffect, useState} from "react";


export const NewOrder: React.FC<OrderProps> = ({ order, dropZero, setCurrentOrder }) => {

    const [step, setStep] = useState(0);
    const [orderInfo, setOrderInfo] = useState<DBOrderSettingsType>({});
    const steps = [
        'Виберіть розміри',
        'Завантажте або виберіть фото',
        'Виберіть папір',
        'Виберіть тип друку',
        'Виберіть сервіс'
    ]
    const sizes: Array<DBSizeType> = [
        {
            _id: '1212122',
            name: '10x15',
            width: 10,
            height: 15,
            createdAt: 'sdsdsd',
            updatesAt: 'sdsdsd',
            deletedAt: 'sdsdsd',
        },
        {
            _id: '121212',
            name: '13x18',
            width: 10,
            height: 15,
            createdAt: 'sdsdsd',
            updatesAt: 'sdsdsd',
            deletedAt: 'sdsdsd',
        },
        {
            _id: '12121',
            name: '15x21',
            width: 10,
            height: 15,
            createdAt: 'sdsdsd',
            updatesAt: 'sdsdsd',
            deletedAt: 'sdsdsd',
        },
        {
            _id: '1212',
            name: '21x30',
            width: 10,
            height: 15,
            createdAt: 'sdsdsd',
            updatesAt: 'sdsdsd',
            deletedAt: 'sdsdsd',
        },
    ]
    useEffect(() => {
        setOrderInfo({sections: [{size: null, photos: null, paper: null, type: null}]});
    }, []);

    const getSize = (id: string) => {
        return sizes.filter(item => item._id === id)[0];
    }

    const addSize = (e: SelectChangeEvent):void => {
        if(orderInfo?.sections) {
            const item = orderInfo.sections[orderInfo.sections.length - 1];
            item.size = getSize(e.target.value);
            setOrderInfo({sections: [...orderInfo.sections].slice(0, -1).concat(item)});
            setStep(step === 0 ? 1 : step);
        }
    }

    const addSection = () => {
        const state = {...orderInfo};
        state?.sections?.push({size: null, photos: null, paper: null, type: null});
        setOrderInfo(state);
    }

    const removeSection = (index: number) => {
        console.log('index ', index);

        const state = {...orderInfo};
        state.sections = state?.sections?.filter((item, key) => index != key);
        if(state?.sections?.length === 0 ) {
            state.sections =  [{size: null, photos: null, paper: null, type: null}];
            setStep(0);
        }
        setOrderInfo(state);
        console.log('remove');
        console.log(state);
    }

    console.log(orderInfo);
  return (
    <Container>
      <TypographyWrapper>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Замовлення № {order && dropZero(order?.number)}
        </Typography>
      </TypographyWrapper>
      <BodyWrapper>
            <ButtonWrapper>
                <Button onClick={() => setCurrentOrder(null)}>До списку замовлень</Button>
                <Button onClick={() => console.log('service')}>Розпочати з вибору Сервісу</Button>
            </ButtonWrapper>
          <ButtonWrapper>
              <Stepper activeStep={step} alternativeLabel>
                  {steps.map((label) => (
                      <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                      </Step>
                  ))}
              </Stepper>
          </ButtonWrapper>
          {orderInfo?.sections && orderInfo?.sections.length > 0 &&
              <>
              {orderInfo?.sections.map((item, key) =>
                      <FormControl variant="filled" style={{width:'100%'}} key={key.toString()}>
                          <InputLabel id="demo-simple-select-filled-label" style={{display: !item.size ? 'block' : 'none'}}>Розмір</InputLabel>
                          <Select
                              labelId="demo-simple-select-filled-label"
                              className="Mui-disabled"
                              id="demo-simple-select-filled"
                              value={item?.size?._id}
                              onChange={addSize}
                              style={{width: !item.size ? '150px' : '10px', overflow: 'hidden'}}

                          >
                              {sizes.map((size, keySize) => <MenuItem value={size._id} key={keySize.toString()}>{size.name}</MenuItem>)}
                          </Select>
                          {item.size && <Photos section={item} remove={() => removeSection(key)}/>}
                      </FormControl>
                  )
              }
              {orderInfo?.sections[orderInfo?.sections.length - 1].size && <Button onClick={addSection}>Додати ще один розмір або секцію з налаштуванням</Button>}
              </>
          }



      </BodyWrapper>
    </Container>
  );
};
