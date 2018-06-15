export default {
  sortedReports: state => state.reports.sort((a, b) => new Date(b.reportTime).getTime() - new Date(a.reportTime).getTime()),
  sortedReportsDesc: state => [...state.reports].sort((a, b) => new Date(a.reportTime).getTime() - new Date(b.reportTime).getTime()),
}
