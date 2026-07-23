const API = "http://34.93.136.32:3000";

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

async function loadStudents() {

    const res = await fetch(API + "/students");
    const students = await res.json();

    studentList.innerHTML = "";

    students.forEach(student => {

        studentList.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>
                <button class="deleteBtn" onclick="deleteStudent('${student._id}')">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch(API + "/students", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email
        })

    });

    form.reset();

    loadStudents();

});

async function deleteStudent(id) {

    await fetch(API + "/students/" + id, {
        method: "DELETE"
    });

    loadStudents();

}

loadStudents();
