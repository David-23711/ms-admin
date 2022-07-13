import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import CreateAuthor from "../components/CreateManga/CreateAuthor";
import CreateMangaPoster from "../components/CreateManga/CreateMangaPoster";
import CreateMangaInfo from "../components/CreateManga/CreateMangaInfo";
import {
  mangaSlice,
  useCreateMangaMutation,
  useFetchByMangaIdQuery,
  useUpdateMangaMutation,
} from "../features/mangaSlice";
const CreateMangaPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author_name: "",
      manga_name: "",
      release_date: "",
      description: "",
      genre_id: "",
      currentThumbnail: "",
      currentThumbnailPath: "",
    },
  });
  const [mangaPoster, setMangaPoster] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [createManga, { isLoading, isError: isMangaError, error: mangaError }] =
    useCreateMangaMutation();
  const [
    updateManga,
    { isLoading: upMangaLoading, isError: isUpmangaError, error: upMangaError },
  ] = useUpdateMangaMutation();
  const [trigger, { data: mangaData }] =
    mangaSlice.endpoints.fetchByMangaId.useLazyQuery();
  const { id } = useParams();
  if (isMangaError) console.log(mangaError);
  if (isUpmangaError) console.log(upMangaError);
  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("author_name", data.author_name);
    formData.append("name", data.manga_name);
    formData.append("release_date", data.release_date);
    formData.append("description", data.description);
    formData.append("thumbnail", mangaPoster);
    formData.append("genre_id", data.genre_id);
    formData.append("current_thumbnail", data.currentThumbnail);
    formData.append("current_thumbnail_path", data.currentThumbnailPath);
    if (isEdit) {
      await updateManga({ manga: formData, id })
        .unwrap()
        .then(() => {
          navigate("/admin/manga");
        });
    } else {
      await createManga(formData)
        .unwrap()
        .then(() => {
          navigate("/admin/manga");
        });
    }
  };
  const showImage = (e, idName) => {
    setMangaPoster(e.file);
    let img = document.getElementById(idName);
    img.src = e.base64;
  };
  useEffect(() => {
    let img = document.getElementById("img");
    if (id) {
      setIsEdit(true);
      trigger(id)
        .unwrap()
        .then((data) => {
          reset({
            author_name: data[0].author_name,
            manga_name: data[0].name,
            release_date: data[0].release_date,
            description: data[0].description,
            genre_id: data[0].genre_id,
            currentThumbnail: data[0].thumbnail,
            currentThumbnailPath: data[0].thumbnail_path,
          });
          setMangaPoster(data[0].thumbnail);

          img.src = data[0].thumbnail_path;
        });
    } else {
      setIsEdit(false);
      reset({
        author_name: "",
        manga_name: "",
        release_date: "",
        description: "",
        genre_id: "",
      });
      img.src = require("../images/nofound.png");
    }
  }, [id]);
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* for title */}
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} md={12}>
              <div className={classes.gridInner}>
                <Typography variant="h5">
                  {isEdit ? "Update Manga" : "Create Manga"}
                </Typography>
              </div>
            </Grid>
          </Grid>
          {/* for author */}
          <CreateAuthor register={register} errors={errors} />
          {/* for manga info */}
          <CreateMangaInfo register={register} errors={errors} />
          {/* for manga poster */}
          <CreateMangaPoster
            showImage={showImage}
            register={register}
            errors={errors}
          />
          <Box className="flex justify-end py-10">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              startIcon={
                isLoading ? (
                  <CircularProgress color="secondary" size="20px" />
                ) : (
                  <SaveIcon />
                )
              }
            >
              {isEdit ? "Update" : "Save"}
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default CreateMangaPage;
