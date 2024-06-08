$(document).ready(function() {
    loadCustomers();
    loadTypes();
});

function loadCustomers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/computers",
        success: function(data) {
            let content = '<table id="display-list" class="table table-bordered"><tr>' +
                '<th>Name</th>' +
                '<th>Code</th>' +
                '<th>Type</th>' +
                '<th>Update</th>' +
                '<th>Delete</th>' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += getProduct(data[i]);
            }
            content += "</table>";
            $('#fuckingList').html(content).show();
            $('#add-customers').hide();
            $('#display-create').show();
            $('#edit-customers').show();
            $('#title').show();
        }
    });
}

function loadTypes() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/types",
        success: function(data) {
            const selectElement = document.createElement('select');
            selectElement.id = 'type';
            selectElement.name = 'type';
            selectElement.className = 'form-control';

            for (let i = 0; i < data.length; i++) {
                const optionElement = document.createElement('option');
                optionElement.value = data[i].id;
                optionElement.textContent = data[i].name;
                selectElement.appendChild(optionElement);
            }

            const inputElement = document.getElementById('type');
            inputElement.parentNode.replaceChild(selectElement, inputElement);
        },
        error: function(error) {
            console.error('Error fetching the options from the API:', error);
        }
    });
}

function getProduct(customer) {
    return `<tr>
            <td>${customer.name}</td>
            <td>${customer.code}</td>
            <td>${customer.type.name}</td>
            <td><button class="btn btn-warning" onclick="formEdit(${customer.id})">Update</button></td>
            <td><button class="btn btn-danger" onclick="deleteCustomer(${customer.id})">Delete</button></td>
        </tr>`;
}

function addNewCustomer(event) {
    event.preventDefault();
    let name = $('#name').val();
    let code = $('#code').val();
    let typeId = $('#type').val();
    let newCustomer = { "code": code, "name":  name, "type": { "id": typeId } };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/computers",
        data: JSON.stringify(newCustomer),
        success: successHandler
    });
}

function successHandler() {
    loadCustomers();
}

function displayFormCreate() {
    $('#title').show();
    $('#fuckingList').hide();
    $('#add-customers').show();
    $('#display-create').hide();
    $('#edit-customers').hide();
}

function deleteCustomer(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/computers/${id}`,
        success: successHandler
    });
}

function updateCustomer(event, id) {
    event.preventDefault();
    let name = $('#name-edit').val();
    let code = $('#code-edit').val();
    let type = $('#type-edit').val();
    let updatedCustomer = { "code": code, "name":  name, "type": { "id": type } };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: `http://localhost:8080/api/computers/${id}`,
        data: JSON.stringify(updatedCustomer),
        success: successHandler
    });
}

function getCustomerById(customer) {
    return `<tr>
            <td><label for="name-edit">Name:</label></td>
            <td><input type="text" id="name-edit" class="form-control" value="${customer.name}"></td>
        </tr>
        <tr>
            <td><label for="code-edit">Code:</label></td>
            <td><input type="text" id="code-edit" class="form-control" value="${customer.code}"></td>
        </tr>
        <tr>
            <td><label for="type-edit">Type:</label></td>
            <td><select id="type-edit" class="form-control" name="types"></select></td>
        </tr>
        <tr>
            <td></td>
            <td><button type="submit" class="btn btn-primary">Edit</button></td>
        </tr>
        <tr>
            <td></td>
            <td><button type="button" class="btn btn-secondary" onclick="backtoListCustomers()">Cancel</button></td>
        </tr>`;
}

function formEdit(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/computers/${id}`,
        success: function(data) {
            let contentData = '<form id="edit-customer" onsubmit="updateCustomer(event, ' + id + ')">' +
                '<h1>Form edit</h1>' +
                '<table class="table">';
            contentData += getCustomerById(data);
            contentData += '</table></form>';
            $('#edit-customer-1').html(contentData);
            $('#fuckingList').hide();
            $('#add-customers').hide();
            $('#display-create').hide();
            $('#title').hide();
            $('#edit-customers').show();

            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/types",
                success: function(types) {
                    let htmlOptions = types.map((type) => {
                        return `<option value="${type.id}" ${data.type.id === type.id ? "selected" : ""}>${type.name}</option>`;
                    }).join("");

                    $("#type-edit").html(htmlOptions);
                }
            });
        }
    });
}

function backtoListCustomers() {
    window.location.href = 'Ajax1.html';
}