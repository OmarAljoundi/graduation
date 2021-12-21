export const filterComplaints = (complaints, sort, status, query) => {
  let tempComplaints
  tempComplaints =
    query !== ''
      ? Object.values(complaints).filter((complaint) =>
          complaint.place_name.toLowerCase().startsWith(query.toLowerCase())
        )
      : complaints

  switch (status ? status['value'] : 'None') {
    case 'completed':
      tempComplaints = Object.values(tempComplaints).filter(
        (service) => service.status === 'completed'
      )
      break
    case 'pending':
      tempComplaints = Object.values(tempComplaints).filter(
        (service) => service.status === 'pending'
      )
      break
  }
  switch (sort ? sort['value'] : 'None') {
    case 'Latest':
      return Object.values(tempComplaints).sort((a, b) => a.id - b.id)
    case 'Oldest':
      return Object.values(tempComplaints).sort((a, b) => b.id - a.id)
    default:
      return Object.values(tempComplaints)
  }
}
