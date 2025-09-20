let listData = [];

const inputActivity = document.getElementById('input-activity');
const inputDate = document.getElementById('input-date');
const addButton = document.getElementById('add-activity');
const displayContainer = document.getElementById('display-container');
const deleteAllBtn = document.getElementById('delete-all');
const filterSelect = document.querySelector('.filter-deleteAll-wrapper select');

function validateData(activity, date) {
    return !!(activity && date);
}

function addData() {
    const data = {
        activity: inputActivity.value,
        date: inputDate.value,
        completed: false
    };
    listData.push(data);
    displayData();
}

function deleteData(index) {
    listData.splice(index, 1);
    displayData();
}

function toggleCompleted(index) {
    listData[index].completed = !listData[index].completed;
    displayData();
}

function deleteAll() {
    listData = [];
    displayData();
}

function getFilteredData() {
    const filter = filterSelect.value;
    if (filter === 'completed') {
        return listData.filter(item => item.completed);
    } else if (filter === 'uncompleted') {
        return listData.filter(item => !item.completed);
    }
    return listData;
}

function displayData() {
    displayContainer.innerHTML = '';
    const filtered = getFilteredData();
    if (filtered.length === 0) {
        displayContainer.innerHTML = "<tr><td colspan='4' class='info-activity'>Tidak ada aktivitas</td></tr>";
        return;
    }
    filtered.forEach((data, idx) => {
        const tr = document.createElement('tr');

        // Activity
        const tdActivity = document.createElement('td');
        tdActivity.textContent = data.activity;
        if (data.completed) {
            tdActivity.style.textDecoration = 'line-through';
            tdActivity.style.color = '#aaa';
        }

        // Date
        const tdDate = document.createElement('td');
        tdDate.textContent = data.date;
        if (data.completed) {
            tdDate.style.textDecoration = 'line-through';
            tdDate.style.color = '#aaa';
        }

        // Status
        const tdStatus = document.createElement('td');
        const statusBtn = document.createElement('button');
        statusBtn.textContent = data.completed ? 'Selesai' : 'Belum Selesai';
        statusBtn.className = data.completed ? 'delete-all' : '';
        statusBtn.style.background = data.completed ? '#2ecc40' : '#f1c40f';
        statusBtn.style.color = '#fff';
        statusBtn.style.border = 'none';
        statusBtn.style.borderRadius = '1rem';
        statusBtn.style.padding = '0.2rem 0.8rem';
        statusBtn.style.cursor = 'pointer';
        statusBtn.onclick = () => {
            // Cari index asli di listData
            const realIdx = listData.indexOf(data);
            toggleCompleted(realIdx);
        };
        tdStatus.appendChild(statusBtn);

        // Action
        const tdAction = document.createElement('td');
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Hapus';
        delBtn.className = 'delete-all';
        delBtn.style.background = '#e74c3c';
        delBtn.style.color = '#fff';
        delBtn.style.border = 'none';
        delBtn.style.borderRadius = '1rem';
        delBtn.style.padding = '0.2rem 0.8rem';
        delBtn.style.cursor = 'pointer';
        delBtn.onclick = () => {
            const realIdx = listData.indexOf(data);
            deleteData(realIdx);
        };
        tdAction.appendChild(delBtn);

        tr.appendChild(tdActivity);
        tr.appendChild(tdDate);
        tr.appendChild(tdStatus);
        tr.appendChild(tdAction);
        displayContainer.appendChild(tr);
    });
}

addButton.addEventListener('click', function () {
    if (validateData(inputActivity.value, inputDate.value)) {
        addData();
        inputActivity.value = "";
        inputDate.value = "";
    } else {
        alert("Kolom inputan tidak boleh kosong!!");
    }
});

deleteAllBtn.addEventListener('click', function (e) {
    if (confirm('Yakin ingin menghapus semua aktivitas?')) {
        deleteAll();
    }
});

filterSelect.addEventListener('change', displayData);

// Initial render
displayData();
