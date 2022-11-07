const userAddFormId = $('#addFormNewPurchase');
const deleteFormId = $('#modalDelete');
const userTableId = $('#userTable');

function insertUser() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    let purchase = {
        'name': userAddFormId.find('#name').val(),
        'lastname': userAddFormId.find('#lastname').val(),
        'age': userAddFormId.find('#age').val(),
        'purchaseItem': userAddFormId.find('#newpurchaseItem').val(),
        'count': userAddFormId.find('#count').val(),
        'amount': userAddFormId.find('#amount').val(),
        'purchaseDate': userAddFormId.find('#purchaseDate').val()
     }

    console.log(purchase);

    let request = new Request('/api/addPurchase', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(purchase)
    });

    fetch(request)
        .then( function (response)  {
            if(response.ok){
                console.info("Purchase with id = " + purchase.id + " was inserted");
                sleep(200);
                $('#tableLink').trigger('click');
            }
        });

}

function getAllUsers() {
    userTableId.children('#purchaseTableBody').empty();
    fetch('api/index').then(function (response) {
        if (response.ok) {
            response.json().then(purchases => {
                purchases.forEach(purchase => {
                    newRow(purchase);
                });
            });
        }
    });
}

function newRow(purchase) {
    userTableId
        .append($('<tr class="border-top bg-light">').attr('id', 'purchaseRow[' + purchase.id + ']')
            .append($('<td>').attr('id', 'purchaseData[' + purchase.id + '][id]').text(purchase.id))
            .append($('<td>').attr('id', 'purchaseData[' + purchase.id + '][name]').text(purchase.name))
            .append($('<td>').attr('id', 'purchaseData[' + purchase.id + '][lastname]').text(purchase.lastname))
            .append($('<td>').attr('id', 'purchaseData[' + purchase.id + '][age]').text(purchase.age))
            .append($('<td>').attr('id', 'purchaseData[' + purchase.id + '][purchaseItem]').text(purchase.purchaseItem))
            .append($('<td>').attr('id', 'purchaseData[' + purchase.id + '][count]').text(purchase.count))
            .append($('<td>').attr('id', 'purchaseData[' + purchase.id + '][amount]').text(purchase.amount))
            .append($('<td>').attr('id', 'purchaseData[' + purchase.id + '][purchaseDate]').text(purchase.purchaseDate))
            .append($('<td>').append($('<button class="btn btn-sm btn-info">')
                .click(() => {
                    loadModal(purchase.id);
                }).text('Редактировать')))
            .append($('<td>').append($('<button class="btn btn-sm btn-danger">')
                .click(() => {
                    loadModal(purchase.id, false);
                }).text('Удалить')))
        );
}

function loadModal(id, editMode = true) {

    fetch('api/aboutThisPurchase/' + id, {method: 'GET'})
        .then(function (response) {
                response.json().then(function (purchase) {

                    deleteFormId.find('#id').val(purchase.id);
                    deleteFormId.find('#name').val(purchase.name);
                    deleteFormId.find('#lastname').val(purchase.lastname);
                    deleteFormId.find('#age').val(purchase.age);
                    // deleteFormId.find('#purchaseItem').val(purchase.purchaseItem);
                    deleteFormId.find('#count').val(purchase.count);
                    deleteFormId.find('#amount').val(purchase.amount);
                    deleteFormId.find('#purchaseDate').val(purchase.purchaseDate);

                    if (editMode) {
                        deleteFormId.find('.modal-title').text('Исправить отчет');
                        deleteFormId.find('#deleterButton').removeClass('btn-danger').addClass('btn-primary')
                            .removeAttr('value')
                            .attr('value', 'Редактировать')
                            .removeAttr('onClick')
                            .attr('onClick', 'editUser(' + id + ');');
                        Readonly(false);
                    } else {
                        deleteFormId.find('.modal-title').text('Удалить?');
                        deleteFormId.find('#deleterButton').removeClass('btn-primary').addClass('btn-danger')
                            .removeAttr('value')
                            .attr('value', 'Удалить')
                            .removeAttr('onClick')
                            .attr('onClick', 'deleteUser(' + id + ');');
                        Readonly();
                    }

                    fetch('/api/products').then(function (response) {
                        if (response.ok) {
                            deleteFormId.find('#purchaseItems').empty();
                            response.json()
                                .then(productList => {
                                    productList.forEach(product => {
                                        deleteFormId.find('#purchaseItems')
                                            .append($('<option>')
                                                .val(product.name).text(product.name));
                                    });
                                });
                        }
                    });

                    deleteFormId.modal();
                });
            }
        )
        .catch(function (err) {
            console.error('Fetch Error :-S', err);
        });

}


function deleteUser(id) {
    fetch('api/delete/' + id, {method: 'DELETE'})
        .then(function (response) {
            deleteFormId.modal('hide');
            if (response.status === 404 || response.status === 400) {
                response.text().then((value) => console.warn("Error message: " + value));
                return;
            }
            console.info("Purchase with id = " + id + " was deleted");
        });

    deleteFormId.modal('hide');
    userTableId.find('#purchaseRow\\[' + id + '\\]').remove();


}

function editUser(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    let purchase = {
        'id' : deleteFormId.find('#id').val(),
        'name': deleteFormId.find('#name').val(),
        'lastname': deleteFormId.find('#lastname').val(),
        'age': deleteFormId.find('#age').val(),
        'purchaseItem': deleteFormId.find('#purchaseItems').val(),
        'count': deleteFormId.find('#count').val(),
        'amount': deleteFormId.find('#amount').val(),
        'purchaseDate': deleteFormId.find('#purchaseDate')
            .val()

    }

    let request = new Request('/api/update', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(purchase)
    });

    fetch(request)
        .then( function (response) {
            if (response.ok) {
                console.info("Purchase with id = " + purchase.id + " was edited");
            }
        });


    deleteFormId.modal('hide');
    sleep(200);
    getAllUsers();

}


function Readonly(value = true) {
    deleteFormId.find('#name').prop('readonly', value);
    deleteFormId.find('#lastname').prop('readonly', value);
    deleteFormId.find('#age').prop('readonly', value);
    deleteFormId.find('#purchaseItems').prop('readonly', value);
    deleteFormId.find('#count').prop('readonly', value);
    deleteFormId.find('#amount').prop('readonly', value);
    deleteFormId.find('#purchaseDate').prop('readonly', value);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

$('#addButtonPurchase').click(() => {
    insertUser();
    userAddFormId.find('#name').val('');
    userAddFormId.find('#lastname').val('');
    userAddFormId.find('#age').val('');
    userAddFormId.find('#purchaseItem').val('');
    userAddFormId.find('#count').val('');
    userAddFormId.find('#amount').val('');
    userAddFormId.find('#purchaseDate').val('');
});

$('#newPurchaseLink').click(() => {


    fetch('/api/products').then(function (response) {
        if (response.ok) {
            userAddFormId.find('#newpurchaseItem').empty();
            response.json()
                .then(productList => {
                productList.forEach(product => {
                    userAddFormId.find('#newpurchaseItem')
                        .append($('<option>')
                            .val(product.name).text(product.name));
                });
            });
        }
    });
});

$('#tableLink').click(() => {
    getAllUsers();
});

$(document).ready(
    () => {
        getAllUsers();
    }
);
