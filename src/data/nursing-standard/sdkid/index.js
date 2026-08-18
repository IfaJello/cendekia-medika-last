import { physiologicalDiagnoses } from "./physiological";
import { circulationDiagnoses } from "./circulation";
import { nutritionDiagnoses } from "./nutrition";


export const sdkid = [
  ...physiologicalDiagnoses,
  ...circulationDiagnoses,
  ...nutritionDiagnoses
];