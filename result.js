window.onload = function () {
  const assignments = JSON.parse(localStorage.getItem("assignmentResults"));
  const assignmentTable = document
    .getElementById("assignmentTable")
    .getElementsByTagName("tbody")[0];

  if (assignments && assignments.length > 0) {
    assignments.forEach((assignment) => {
      const row = assignmentTable.insertRow();
      row.insertCell(0).textContent = new Date(
        assignment.date
      ).toLocaleDateString();
      row.insertCell(1).textContent = assignment.session;
      row.insertCell(2).textContent = assignment.block;
      row.insertCell(3).textContent = assignment.hall;
      row.insertCell(4).textContent = assignment.floor;
      row.insertCell(5).textContent = assignment.faculty;
    });
  } else {
    const row = assignmentTable.insertRow();
    row.insertCell(0).textContent = "No Assignments Found";
    for (let i = 1; i < 6; i++) row.insertCell(i).textContent = "";
  }
};
