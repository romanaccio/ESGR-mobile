import axios from 'axios';
import { REACT_APP_ESGR_BACKEND_URL } from '@env';

export interface ReportInterface {
  username: string;
  reportStart: number;
  score: number;
  data: any;
}

export const writeReport = async (report: ReportInterface): Promise<void> => {
  const url = REACT_APP_ESGR_BACKEND_URL;
  console.log('ESGR backend url : ' + url);
  const surveysUrl = url + '/surveys';
  console.log('post to ' + surveysUrl);
  if (url) await axios.post(surveysUrl, report);
  else console.log("Can't write report to ESGR Backend: missing url");
};

export const readReports = async (): Promise<ReportInterface[]> => {
  const url = REACT_APP_ESGR_BACKEND_URL;

  const res = await axios.get(url + '/surveys');
  const values = Object.values(res.data) as ReportInterface[];
  // console.log(values);
  return values;
};
