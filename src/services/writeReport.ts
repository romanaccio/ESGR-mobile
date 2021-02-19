import axios from 'axios';

interface ReportInterface {
  username: string;
  reportStart: number;
  data: any;
}
export const writeReport = (report: ReportInterface): void => {
  const url = process.env.REACT_APP_ESGR_BACKEND_URL;
  console.log('ESGR backend url : ' + url);
  if (url) axios.post(url + '/surveys', report);
  else console.log("Can't write report to ESGR Backend");
};
