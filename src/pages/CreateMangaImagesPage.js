import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
} from "@material-ui/core";
import React, { useState, useRef } from "react";
import FileBase64 from "react-file-base64";
import useStyles from "./styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateImagesByIdMutation } from "../features/mangaSlice";
import SaveIcon from "@material-ui/icons/Save";
const CreateMangaImagesPage = () => {
  const classes = useStyles();
  const [imageArray, setImageArray] = useState([]);
  const [showImageArray,setShowImageArray]=useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const [createImages, { isLoading, isError, error }] =
  useCreateImagesByIdMutation();
  if (isError) console.log(error);

  const deletePerItem = (name) => {
    setShowImageArray(showImageArray.filter(item=>item.name!=name))
    setImageArray(imageArray.filter((item) => item.name != name));
  };
  const selectImage=(e)=>{
    let data=[];
    setShowImageArray(e);
    e.map((item)=>data.push(item.file));
    setImageArray(data);
  }
  const saveImages = () => {
    let formData=new FormData();
    imageArray.map((item)=>{
      formData.append("images[]",item);
    })
    createImages({id,formData}).unwrap().then((resp)=>{
      navigate(-1);
    })
   
  };

  return (
    <Container style={{paddingTop:'30px',paddingBottom:'30px', display:'flex',justifyContent:'center',height:'100%' }}>
      <div>
      <FileBase64 multiple={true} onDone={(e) => selectImage(e)} />
      <Card>
        <CardContent className={classes.cardContainer}>
          {showImageArray &&
            showImageArray.map((item, index) => (
              <div
                key={index}
                style={{ width: 200, height: 280, position: "relative" }}
              >
                <img
                  key={index}
                  src={item.base64}
                  style={{ width: "100%", height: "100%", borderRadius: 12 }}
                />
                <IconButton
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => deletePerItem(item.name)}
                >
                  <HighlightOffIcon color="secondary" />
                </IconButton>
              </div>
            ))}
          <div style={{ width: 200, height: 200 }} />
          <div style={{ width: 200, height: 200 }} />
          <div style={{ width: 200, height: 200 }} />
          <div style={{ width: 200, height: 200 }} />
        </CardContent>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <div>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              variant="contained"
              startIcon={
                isLoading ? (
                  <CircularProgress color="secondary" size="20px" />
                ) : (
                  <SaveIcon />
                )
              }
              onClick={() => saveImages()}
            >
              Save
            </Button>
          </div>
        </CardActions>
      </Card>
      </div>
    </Container>
  );
};

export default CreateMangaImagesPage;
