export default {
  reports: state => state.reports,
  reversedReports: state => [...state.reports.reverse()],
  // lastReport: state => [...state.reports.reverse()].slice(-1)[0],
  last14Reports: state => [...state.reports].slice(-14),
  fetchingReports: state => state.fetchingReports,
  selectedReport: state => state.selectedReport
}
