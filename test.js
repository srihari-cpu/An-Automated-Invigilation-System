const sessions = ["Forenoon", "Afternoon"];

function assignInvigilation() {
  const examDate = document.getElementById("examDate").value;
  const facultyInput = document.getElementById("facultyNames").value;
  const faculties = facultyInput
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
  const hallInput = document.getElementById("hallNames").value;
  const halls = hallInput
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
  const blockName = document.getElementById("blockName").value || "No Block"; // Single block name

  const assignments = [];

  sessions.forEach((session) => {
    const availableFaculties = [...faculties]; // Clone the faculty list for each session

    halls.forEach((hall) => {
      const assignedFaculty =
        availableFaculties.length > 0
          ? availableFaculties.splice(
              Math.floor(Math.random() * availableFaculties.length),
              1
            )[0]
          : "No Faculty";

      const floorNumber = hall.charAt(0); // Get the first character as floor number
      assignments.push({
        date: examDate,
        session: session,
        block: blockName,
        hall: hall,
        floor: floorNumber ? `Floor ${floorNumber}` : "No Floor",
        faculty: assignedFaculty,
      });
    });
  });

  // Store the assignments in local storage
  localStorage.setItem("assignmentResults", JSON.stringify(assignments));

  // Redirect to results page
  window.location.href = "results.html";
}
