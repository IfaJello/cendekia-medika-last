import { physiologicalDiagnoses } from "./physiological";
import { circulationDiagnoses } from "./circulation";
import { nutritionDiagnoses } from "./nutrition";
import { eliminationDiagnoses } from "./elimination";
import { activityDiagnoses } from "./activity";
import { safetyDiagnoses } from "./safety";
import { psychosocialDiagnoses } from "./psychosocial";


export const sdkid = [
  ...physiologicalDiagnoses,
  ...circulationDiagnoses,
  ...nutritionDiagnoses,
  ...eliminationDiagnoses,
  ...activityDiagnoses,
  ...safetyDiagnoses,
  ...psychosocialDiagnoses
];