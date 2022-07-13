import { Container, Grid } from "@material-ui/core";
import React from "react";
import CreateEpisode from "../components/CreateEpisode/CreateEpisode";
import MangaDetail from "../components/CreateEpisode/MangaDetail";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const CreateEpisodePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Episode ",
    },
  });
  const { mangaId } = useParams();
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MangaDetail mangaId={mangaId} />
        </Grid>
        <Grid item xs={12}>
          <CreateEpisode
            register={register}
            reset={reset}
            errors={errors}
            handleSubmit={handleSubmit}
            mangaId={mangaId}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateEpisodePage;
