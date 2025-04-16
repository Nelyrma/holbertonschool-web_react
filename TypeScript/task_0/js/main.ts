interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
    firstName: "Jean",
    lastName: "Lemoine",
    age: 18,
    location: "Toulouse"
};

const student2: Student = {
    firstName: "Melody",
    lastName: "Kate",
    age: 25,
    location: "Paris"
};

const studentsList: Student[] = [student1, student2];

// create a HTML table
const table = document.createElement('table');

// add lines
studentsList.forEach((student) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = student.firstName;

    const locationCell = document.createElement('td');
    locationCell.textContent = student.location;

    row.appendChild(nameCell);
    row.appendChild(locationCell);
    table.appendChild(row);
});

document.body.appendChild(table);
