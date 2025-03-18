import { useContext } from "react";
import { AssessmentContext } from "../context/AssessmentContext";

const useAssessment = () => {
  const context = useContext(AssessmentContext);

  if (!context) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }

  return context;
};

export default useAssessment;
