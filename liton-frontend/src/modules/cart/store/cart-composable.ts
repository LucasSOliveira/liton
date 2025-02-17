import { reactive } from "vue";

const state = reactive({
  currentStep: 1,

});

const handleStepChange = (step: number | undefined) => {
  if (step !== undefined) {
    state.currentStep = step;
  }
};

export const useCart = () => ({
  state,
  handleStepChange
});
