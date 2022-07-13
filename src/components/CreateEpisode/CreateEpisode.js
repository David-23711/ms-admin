import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import BookIcon from "@material-ui/icons/Book";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import {
  mangaSlice,
  useCountEpisodeQuery,
  useCreateEpisodeMutation,
  useDeleteEpisodeMutation,
  useFetchEpisodeQuery,
} from "../../features/mangaSlice";
import SaveIcon from "@material-ui/icons/Save";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Alert } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
const CreateEpisode = ({ register, errors, handleSubmit, mangaId, reset }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [trigger, { data: episodeData, isFetching }] =
    mangaSlice.endpoints.fetchEpisode.useLazyQuery();
    console.log(episodeData?.length)
  const [countFunc = trigger, { data: count }] =
    mangaSlice.endpoints.countEpisode.useLazyQuery();
  const [createEpisode, { isError, error, isLoading }] =
    useCreateEpisodeMutation();
  const [deleteEpisode, { isLoading: deleteLoading }] =
    useDeleteEpisodeMutation();
  const [isEdit, setIsEdit] = useState(false);
  const onSubmit = (data) => {
    createEpisode({ name: data.name, mangaId: mangaId });
    reset({ name: "Episode " });
  };
  if (isError) console.log(error.data.error.name);
  const deleteEpisodeFunc = (id) => {
    deleteEpisode(id);
  };
  const getCount = (id) => {
    return count ? count?.filter((item) => item.episode_id == id).length : null;
  };
  useEffect(() => {
    trigger(mangaId);
    countFunc(mangaId);
  }, []);
  return (
    <Grid container spacing={4} className={"pb-10"}>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card style={{ paddingTop: "20px" }}>
            <CardContent>
              <label style={{ marginLeft: 30 }}>Create Episode</label>
              <TextField
                id="name"
                name="name"
                placeholder="Enter Episode"
                style={{ padding: "10px 30px 30px 30px" }}
                fullWidth
                variant="outlined"
                {...register("name", {
                  required: "Episode is required",
                })}
                error={Boolean(errors.genre || isError)}
                helperText={errors.genre?.message || error?.data?.error?.name}
              />
            </CardContent>
            <CardActions
              style={{ justifyContent: "flex-end", paddingRight: 46 }}
            >
              <Grid container>
                <Grid item xs={8} md={8} align="end"></Grid>
                <Grid item xs={4} md={4} align="end">
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
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </form>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper style={{ maxHeight: 200, maxWidth: "100%", overflow: "auto" }}>
          {episodeData?.length ? (
            <List className={classes.listRoot}>
              {episodeData &&
                episodeData?.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#e6f9fc" }}>
                        <BookIcon className="text-blue-400" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={`total pages (${getCount(item.id)})`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="start"
                        onClick={() =>
                          navigate(`/admin/createMangaImages/${item.id}`)
                        }
                      >
                        <AddCircleIcon className="text-blue-400" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => deleteEpisodeFunc(item.id)}
                      >
                        <HighlightOffIcon className="text-red-400" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          ) : (
            <h4 style={{padding:10}} >There is no episode in this session!</h4>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateEpisode;
