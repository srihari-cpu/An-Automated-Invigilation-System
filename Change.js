function toggleDropdown() {
  document.getElementById("facultyDropdown").classList.toggle("show");
}

function updateSelectedFaculties() {
  const checkboxes = document.querySelectorAll(
    '#facultyDropdown input[type="checkbox"]'
  );
  const selectedFaculties = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked && checkbox.value !== "Select All")
    .map((checkbox) => checkbox.value);

  document.getElementById("facultyInput").value = selectedFaculties.join(", ");
  document.getElementById(
    "selectedFaculty"
  ).innerText = `Selected Faculty: ${selectedFaculties.join(", ")}`;

  // Update "Select All" checkbox state
  const allChecked = selectedFaculties.length === checkboxes.length - 1; // -1 for the "Select All" checkbox
  document.getElementById("selectAll").checked = allChecked;
}

function toggleSelectAll() {
  const selectAllCheckbox = document.getElementById("selectAll");
  const checkboxes = document.querySelectorAll(
    '#facultyDropdown input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    if (checkbox.value !== "Select All") {
      checkbox.checked = selectAllCheckbox.checked;
    }
  });
  updateSelectedFaculties();
}

function updateSessionSelection() {
  const sessionCheckboxes = document.querySelectorAll('input[name="session"]');
  const selectedSessions = Array.from(sessionCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  // Store the selected sessions for later use
  localStorage.setItem("selectedSessions", JSON.stringify(selectedSessions));
}

function assignInvigilation() {
  const examDate = document.getElementById("examDate").value;
  const numForenoon = parseInt(document.getElementById("numForenoon").value);
  const numAfternoon = parseInt(document.getElementById("numAfternoon").value);
  const selectedFaculties = document
    .getElementById("facultyInput")
    .value.split(", ")
    .filter((name) => name !== "");
  const blockName = document.getElementById("blockName").value || "No Block";

  const selectedSessions =
    JSON.parse(localStorage.getItem("selectedSessions")) || [];

  if (
    !examDate ||
    selectedFaculties.length === 0 ||
    selectedSessions.length === 0
  ) {
    alert(
      "Please fill in all required fields: Exam Date, Selected Faculty, and Session."
    );
    return;
  }

  const assignments = [];

  selectedSessions.forEach((session) => {
    const numNeeded = session === "Forenoon" ? numForenoon : numAfternoon;
    for (let i = 0; i < numNeeded; i++) {
      if (selectedFaculties.length === 0) {
        alert("Not enough faculty available for the required sessions.");
        break;
      }
      const assignedFaculty =
        selectedFaculties.splice(
          Math.floor(Math.random() * selectedFaculties.length),
          1
        )[0] || "No Faculty";
      assignments.push({
        date: examDate,
        session: session,
        block: blockName,
        faculty: assignedFaculty,
      });
    }
  });

  localStorage.setItem("assignmentResults", JSON.stringify(assignments));
  window.location.href = "results.html";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches("#facultyInput")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
