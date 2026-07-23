const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

async function loadStudents(){

    const res = await fetch("/students");
    const students = await res.json();

    studentList.innerHTML="";

    students.forEach(student=>{

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

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;

    await fetch("/students",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name,
            email
        })

    });

    form.reset();

    loadStudents();

});

async function deleteStudent(id){

    await fetch("/students/"+id,{
        method:"DELETE"
    });

    loadStudents();

}

loadStudents();
