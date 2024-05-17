const students = JSON.parse(localStorage.getItem('students')) || [
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
            const name = e.target.name.value.trim(); 
            const birth = e.target.birth.value;
            
            if (name === '' || birth === '') { 
                alert('Veuillez remplir tous les champs.');
                return; 
            }

            students.push({ name, birth });
            e.target.reset();
            localStorage.setItem('students', JSON.stringify(students));
            alert('Utilisateur ajouté');
            renderUsers();
        });
    }
});


function renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `${student.name} - ${formatDate(student.birth)}`;
        const button = document.createElement('button');
        button.type = 'button';
        button.innerText = 'Supprimer';
        button.addEventListener('click', () => {
            deleteUser(student.name);
        });
        li.appendChild(button);
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

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}
