export const students = [
    { name: "Sonia", birth: "2019-05-14" },
    { name: "Antoine", birth: "2000-05-12" },
    { name: "Alice", birth: "1990-09-14" },
    { name: "Sophie", birth: "2001-02-10" },
    { name: "Bernard", birth: "1980-08-21" }
];

document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById('userList');
    const addUserForm = document.getElementById('addUserForm');

    if (userList) {
        renderUsers();
    }

    if (addUserForm) {
        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const birth = e.target.birth.value;
            students.push({ name, birth });
            e.target.reset();
            localStorage.setItem('students', JSON.stringify(students));
            alert('Utilisateur ajouté');
        });
    }
});

function renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const storedStudents = JSON.parse(localStorage.getItem('students')) || students;

    storedStudents.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `${student.name} - ${dayjs(student.birth).locale('fr').format('DD MMMM YYYY')}`;
        const form = document.createElement('form');
        form.action = '/delete';
        form.method = 'POST';
        form.style.display = 'inline';
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'name';
        input.value = student.name;
        const button = document.createElement('button');
        button.type = 'submit';
        button.innerText = 'Supprimer';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            deleteUser(student.name);
        });
        form.appendChild(input);
        form.appendChild(button);
        li.appendChild(form);
        userList.appendChild(li);
    });
}

function deleteUser(name) {
    const index = students.findIndex(student => student.name === name);
    if (index !== -1) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderUsers();
        alert('Utilisateur supprimé');
    }
}
