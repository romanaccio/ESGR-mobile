import axios from 'axios';
import { REACT_APP_ESGR_BACKEND_URL } from '@env';

interface ReportInterface {
  username: string;
  reportStart: number;
  data: any;
}
export const writeReport = (report: ReportInterface): void => {
  const url = REACT_APP_ESGR_BACKEND_URL;
  console.log('ESGR backend url : ' + url);
  if (url) axios.post(url + '/surveys', report);
  else console.log("Can't write report to ESGR Backend");
};
