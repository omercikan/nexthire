import { RootState } from "@/shared/redux/store";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

interface screeningQuestions {
  id: string;
  question: string;
  type: string;
  characterLimit?: string;
  options?: string[];
  required: boolean;
  knockout: boolean;
  correctAnswer?: string;
  knockoutAnswer?: string;
}

const questionsAdapter = createEntityAdapter({
  selectId: (question: screeningQuestions) => question.id,
});

const initialState = questionsAdapter.getInitialState();

export const candidateQuestionSlice = createSlice({
  name: "candidateQuestionSlice",
  initialState,
  reducers: {
    updateQuestion: questionsAdapter.updateOne,
    addScreeningQuestions: questionsAdapter.addOne,
    removeScreeningQuestion: questionsAdapter.removeOne,
  },
});

export const {
  updateQuestion,
  addScreeningQuestions,
  removeScreeningQuestion,
} = candidateQuestionSlice.actions;

export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectEntities: selectQuestionEntities,
  selectIds: selectQuestionIds,
} = questionsAdapter.getSelectors(
  (state: RootState) => state.candidateQuestionSlice,
);

export default candidateQuestionSlice.reducer;
