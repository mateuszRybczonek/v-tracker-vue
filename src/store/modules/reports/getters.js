export default {
  reports: state => state.reports,
  sortedReports: state => state.reports.sort((a, b) => new Date(b.reportTime).getTime() - new Date(a.reportTime).getTime()),
  fetchingReports: state => state.fetchingReports,
  selectedReport: state => state.selectedReport
}
