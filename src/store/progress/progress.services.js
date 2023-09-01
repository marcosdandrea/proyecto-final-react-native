import { getAllProgresses, insertNewProgress, deleteProgressById } from "../../database";
import { deleteProgress, loadProgress, saveProgress } from "./progress.slice";

export const _loadProgress = async (dispatch, getState) => {
  try {
    const res = await getAllProgresses();
    dispatch(loadProgress(res?.rows?._array || []))
  } catch (e) {
    console.warn("Error loading progress")
    console.warn(e.message);
  }
};

export const _addProgress = async (dispatch, getState, props) => {
  const { date, weight, height, frontPic, sidePic, backPic } = props;
  let state = getState()

  try {
    await insertNewProgress({
      date,
      weight,
      height,
      frontPic,
      sidePic,
      backPic,
    });
    dispatch(saveProgress({id: state.progress.progress.length +1, date, weight }))
  } catch (err) {
    console.warn(err.message);
  }
};

export const _removeProgressById = async (dispatch, getState, id) => {
  try {
    await deleteProgressById({ id });
    let state = getState()
    let progress = JSON.parse(JSON.stringify(state.progress.progress))
    const index = progress.findIndex(progress => progress.id === id)
    if (index == -1) return
    progress.splice(index, 1)
    dispatch(deleteProgress(progress))
  } catch (error) {
    console.warn(error.message);
  }
};
