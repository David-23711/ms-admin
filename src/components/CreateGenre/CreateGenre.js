import React, { useEffect } from "react";
import {
  TextField,
  Card,
  InputLabel,
  CardActions,
  Button,
  CircularProgress,
} from "@material-ui/core";

import useStyles from "./style";
import SaveIcon from "@material-ui/icons/Save";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
} from "../../features/genreSlice";
const CreateGenre = ({
  handleSubmit,
  handleReset,
  register,
  errors,
  isEdit,
  genreId,
  setIsEdit,
}) => {
  const classes = useStyles();

  const [createGenre, { data, isLoading, isSuccess, isError, error, reset }] =
    useCreateGenreMutation();
  const [
    updateGenre,
    {
      data: updateMessage,
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: isUpdateError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateGenreMutation();
  
  if (isError) console.log(error);
  if(isUpdateError) console.log(updateError);
  const resetFunction = () => {
    reset();
    updateReset();
    handleReset({ genre: "" });
  };
  if (isSuccess||updateSuccess) {
    setTimeout(() => resetFunction(), 1500);
  }
  const cancleUpdate = () => {
    setIsEdit();
    handleReset({ genre: "" });
  };
  const onSubmit = (data) => {
    if (isEdit) {
      updateGenre({ genreId, genre: data.genre });
    } else {
      createGenre(data.genre);
    }
  };

  return (
    <div className={classes.gridInner}>
      <Card style={{ width: "100%", paddingTop: 20 }} className="drop-shadow-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputLabel htmlFor="name" style={{ padding: "10px 30px" }}>
              Genre Name
            </InputLabel>
            <TextField
              id="genre"
              name="genre"
              placeholder="Enter Genre"
              style={{ padding: "10px 30px 30px 30px" }}
              fullWidth
              variant="outlined"
              {...register("genre", {
                required: "Genre Name is required",
              })}
              error={Boolean(errors.genre)}
              helperText={errors.genre?.message}
            />
          </div>
          <CardActions className={classes.cardAction}>
            {isEdit && (
              <Button
                onClick={(e) => cancleUpdate(e)}
                variant="contained"
                title="save"
                type="submit"
                color="secondary"
              >
                Go Save
              </Button>
            )}
            <Button
              style={{ marginRight: 25 }}
              variant="contained"
              title="save"
              type="submit"
              color="secondary"
              startIcon={
                isLoading || updateLoading ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  <SaveIcon />
                )
              }
            >
              {isEdit ? "Update" : "Save"}
            </Button>
          </CardActions>
        </form>
      </Card>
      {isSuccess && (
        <div className="mt-5">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {data.message}
          </Alert>
        </div>
      )}
      {updateSuccess && (
        <div className="mt-5">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {updateMessage.message}
          </Alert>
        </div>
      )}
    </div>
  );
};
export default CreateGenre;
