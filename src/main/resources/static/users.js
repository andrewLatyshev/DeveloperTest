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
        'purchaseItem': userAddFormId.find('#product').val(),
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
            .append($('<td>').attr('id', 'purchaseData[' + purchase.id + '][product]').text(purchase.purchaseItem))
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
                    deleteFormId.find('#purchaseItem').val(purchase.purchaseItem);
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

                    // fetch('/api/products').then(function (response) {
                    //     if (response.ok) {
                    //         deleteFormId.find('#purchaseItem').empty();
                    //         response.json().then(roleList => {
                    //             roleList.
                    //             forEach(role => {
                    //                 deleteFormId.find('#purchaseItem')
                    //                     .append($('<option>')
                    //                         .prop('selected', purchase.filter(e => e.id === product.id).length)
                    //                         .val(role.name).text(role.name));
                    //             });
                    //         });
                    //     }
                    // });

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
        'purchaseItem': deleteFormId.find('#purchaseItem').val(),
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
    deleteFormId.find('#purchaseItem').prop('readonly', value);
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
    userAddFormId.find('#product').val('');
    userAddFormId.find('#count').val('');
    userAddFormId.find('#amount').val('');
    userAddFormId.find('#purchaseDate').val('');
});

$('#newPurchaseLink').click(() => {


    fetch('/api/products').then(function (response) {
        // if (response.ok) {
        //     userAddFormId.find('#product').empty();
        //     response.json()
        //         .then(productList => {
        //         productList.forEach(product => {
        //             userAddFormId.find('#product')
        //                 .append($('<option>')
        //                     .val(product.name).text(product.name));
        //         });
        //     });
        // }
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




// $(async function() {
//     await allUsers();
// });
// const table = $('#userTable');
// async function allUsers() {
//     table.empty()
//     fetch("api/index")
//         .then(res => res.json())
//         .then(data => {
//             data.forEach(purchase => {
//                 let tableWithUsers = `$(
//                         <tr>
//                             <td>${purchase.id}</td>
//                             <td>${purchase.name}</td>
//                             <td>${purchase.lastname}</td>
//                             <td>${purchase.age}</td>
//                             <td>${purchase.purchaseItem}</td>
//                             <td>${purchase.count}</td>
//                             <td>${purchase.amount}</td>
//                             <td>${purchase.purchaseDate}</td>
//
//                             <td>
//                                 <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
//                                 data-action="edit" data-id="${purchase.id}" data-target="#edit">Редактировать</button>
//                             </td>
//                             <td>
//                                 <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
//                                 data-action="delete" data-id="${purchase.id}" data-target="#delete">Удалить</button>
//                             </td>
//                         </tr>)`;
//                 table.append(tableWithUsers);
//             })
//         })
// }
//
//
//
//
//
//
//     //Modal Edit
// $('#edit').on('show.bs.modal', ev => {
//     let button = $(ev.relatedTarget);
//     let id = button.data('id');
//     showEditModal(id);
// })
//
// async function showEditModal(id) {
//     let purchase = await getPurchase(id);
//     let form = document.forms["formEditUser"];
//     form.id.value = purchase.id;
//     form.name.value = purchase.name;
//     form.lastname.value = purchase.lastname;
//     form.age.value = purchase.age;
//     form.purchaseItem.value = purchase.purchaseItem;
//     form.count.value = purchase.count;
//     form.amount.value = purchase.amount;
//     form.purchaseDate.value = purchase.purchaseDate;
//
// }
//
//
//
// $(async function() {
//     editUser();
//
// });
// function editUser() {
//     const editForm = document.forms["formEditUser"];
//     editForm.addEventListener("submit", ev => {
//         ev.preventDefault();
//         fetch("/api/update/" + editForm.id.value, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 id: editForm.id.value,
//                 name: editForm.name.value,
//                 lastname: editForm.lastname.value,
//                 age: editForm.age.value,
//                 purchaseItem: editForm.purchaseItem.value,
//                 count: editForm.count.value,
//                 amount: editForm.amount.value,
//                 purchaseDate: editForm.purchaseDate.value
//             })
//         }).then(() => {
//             $('#editFormCloseButton').click();
//             allUsers();
//         })
//     })
// }
//
//
//
// //Delete purchase
//
// $('#delete').on('show.bs.modal', ev => {
//     let button = $(ev.relatedTarget);
//     let id = button.data('id');
//     showDeleteModal(id);
// })
//
// async function showDeleteModal(id) {
//     let user = await getPurchase(id);
//     let form = document.forms["formDeleteUser"];
//     form.id.value = user.id;
//     form.firstName.value = user.firstName;
//     form.lastName.value = user.lastName;
//     form.age.value = user.age;
//     form.username.value = user.username;
//
//
//     $('#rolesDeleteUser').empty();
//
//     await fetch("http://localhost:8080/api/roles")
//         .then(res => res.json())
//         .then(roles => {
//             roles.forEach(role => {
//                 let selectedRole = false;
//                 for (let i = 0; i < user.roles.length; i++) {
//                     if (user.roles[i].name === role.name) {
//                         selectedRole = true;
//                         break;
//                     }
//                 }
//                 let el = document.createElement("option");
//                 el.text = role.name.substring(5);
//                 el.value = role.id;
//                 if (selectedRole) el.selected = true;
//                 $('#rolesDeleteUser')[0].appendChild(el);
//             })
//         });
// }
// async function getPurchase(id) {
//     let url = "/api/aboutThisPurchase/" + id;
//     let response = await fetch(url);
//     return await response.json();
// }




// $(async function() {
//
//     deleteUser();
// });
// function deleteUser(){
//     const deleteForm = document.forms["modalDelete"];
//     deleteForm.addEventListener("submit", ev => {
//         ev.preventDefault();
//         fetch("/api/delete/" + deleteForm.id.value, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(() => {
//                 $('#deleteFormCloseButton').click();
//                 allUsers();
//             })
//     })
// }