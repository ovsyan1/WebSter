import React, { useEffect } from "react";
import Header from "../../components/Header";
import { savePhoto, getImages } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import { RootState } from "../../store/rootReducer";
import UploadButton from "../../components/UploadButton";
import {
  ImageContainer,
  BodyWrapper,
  ImageItem,
  Img,
  ImgInfo,
  InputWrapper,
} from "./styles";

const UserImages: React.FC = () => {
  const [error, setError] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const dispatch = useDispatch();
  const photo = useSelector((state: RootState) => state.photo?.photoResponse);

  useEffect(() => {
    getImages().then((res) => {
      setImages(res.data);
    });
  }, [photo]);

  const getImage = async (e: any) => {
    setError(false);
    const imgName = e.target.files[0].name;
    if (e.target.files.length) {
      if (
        imgName.endsWith(".jpg") ||
        imgName.endsWith(".jpeg") ||
        imgName.endsWith(".png")
      ) {
        dispatch(savePhoto(e.target.files[0]));
      } else {
        setError(true);
      }
    }
  };
  return (
    <>
    <Header drawer />
      <BodyWrapper>
        <InputWrapper>
          <UploadButton getImage={getImage} />
        </InputWrapper>
        {photo.data && (
          <div>
            <img
              src={photo.data?.url}
              style={{ width: "200px" }}
              alt="profile"
            />
          </div>
        )}
        {error && (
          <div style={{ color: "red" }}>
            Вибачте, ми можем загрузити лише такі формати: ".jpg", ".jpeg" or ".png"
          </div>
        )}
        <ImageContainer>
          {images.length > 0 &&
            images.map((item, index) => {
              return (
                <ImageItem key={index}>
                  <Img>
                    <img
                      style={{ width: "100%" }}
                      src={item["url"]}
                      alt="downloaded file"
                    />
                  </Img>
                  <ImgInfo>
                    {item["settings"]["fileName"]}
                    <br />
                    {`розмір: ${Math.floor(
                      item["settings"]["size"] / 1024
                    )} Кб`}
                  </ImgInfo>
                </ImageItem>
              );
            })}
        </ImageContainer>
      </BodyWrapper>
      <Footer />
    </>
  );
};

export default UserImages;
