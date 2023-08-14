$(document).ready(function () {

    var get = $.ajax({
        type: "GET",
        url: "http://localhost:3000/kursevi"
    });
    get.done(function (kursevi) {
        $.each(kursevi, function (i, kurs) {
        $("#tabela1 tbody").append(`<tr>
        <td class="classValue_${kurs.id}">` + kurs.id + `</td>
        <td id="courseNameZ">` + kurs.courseName + `</td>
        <td>` + kurs.startDate + `</td>
        <td>` + kurs.duration + `</td>
        <td class="price">` + kurs.price + `</td>
        <td><button id="` + kurs.details + `" class="btn button_kurs dugme_${kurs.id}">
        Details</button></td>
        <td><button id="` + kurs.reservation + `" class="btn button_kurs2 dugme2_${kurs.id}">
        Reserve</button></td>
        </tr>`);
        });
        $("#tabela1").dataTable({
            order: [[0, 'asc']]
        });

    });
    get.fail(function (kursevi) {
        alert("Nije moguce povezivanje sa bazom podataka!");
    });

    var get2 = $.ajax({
        type: "GET",
        url: "http://localhost:3000/rezervisano"
    });
    get2.done(function (rezervisano) {
        $.each(rezervisano, function (i, rezer) {
        $("#tabela2 tbody").append(`<tr>
        <td class="classValue_${rezer.name}">` + rezer.name + `</td>
        <td>` + rezer.surname + `</td>
        <td>` + rezer.email + `</td>
        <td>` + rezer.coursename + `</td>
        <td class="price">` + rezer.price + `</td>
        <td>` + rezer.note + `</td>
        <td><button id="change_${rezer.id}" class="btn button_kurs button_change dugme_${rezer.name}">
        Change Reservation</button></td>
        <td><button id="delete_${rezer.id}" class="btn button_kurs3 button_delete dugme2_${rezer.name}" >
        Delete Reservation</button></td>
        </tr>`);
        });
        $("#tabela2").dataTable({
            searching: false,
            ordering: false,
            lengthChange: false
        });

    });
    get2.fail(function (rezervisano) {
        alert("Nije moguce povezivanje sa bazom podataka!");
    });

    $("#tabela1 tbody").on('click', 'button', function () {

        if ($(this).hasClass("button_kurs2")) {
            var tr = this.parentNode.parentNode;
            $("#coursename").attr('value', ((tr.cells[1].childNodes[0].data)));
            $("#price").attr('value', ((tr.cells[4].childNodes[0].data)));
            $("#modalUpis").modal("toggle");

        }
        else if ($(this).hasClass("button_kurs")) {

            $(document).ready(function () {
                $('button[class*=dugme_]').click(function () {
                    var getBtnClassID = $(this).attr('class').match(/\d/g);
                    $("#modal" + getBtnClassID + "text").css('display', 'block');
                });

                $('#modalInfo').on('hidden.bs.modal', function () {
                    $('[id*=modal]').css('display', 'none');
                })
            });
            var tr = this.parentNode.parentNode;
            $("#modalInfo").modal("toggle");
            $("#createEditModalLabel").text(tr.cells[1].childNodes[0].data);
        }

    });
    $("#unosForma").on('submit', function (event) {
        event.preventDefault();
        saveData();
    });

    function saveData() {
        var name = $("#name").val();
        var surname = $("#surname").val();
        var email = $("#email").val();
        var coursename = $("#coursename").val();
        var price = $("#price").val();
        var note = $("#note").val();

        var noviUnos = {
            name: name,
            surname: surname,
            email: email,
            coursename: coursename,
            price: price,
            note: note
        };

        var izmenaId = $("#izmenaID").text();
        if (izmenaId) {

            $.ajax({
                url: "http://localhost:3000/rezervisano/" + izmenaId,
                type: "PUT",
                data: noviUnos,
                success: function (rezervisano) {
                    getujPodatke();
                    $("#modalUpis").modal('toggle');
                }
            })
        }
        else {
            var postzahtev = $.ajax({
                type: "POST",
                url: "http://localhost:3000/rezervisano",
                data: noviUnos
            });
            postzahtev.done(function (rezervisano) {
                $("#tabela2 tbody").append(`<tr>
                
                    <td>${rezervisano.name}</td>
                    <td>${rezervisano.surname}</td>
                    <td>${rezervisano.email}</td>
                    <td>${rezervisano.coursename}</td>
                    <td class="price">${rezervisano.price}</td>
                    <td>${rezervisano.note}</td>
                    <td><button id="` + rezervisano.change + `" class="btn button_kurs button_change dugme_${rezervisano.name}">
        Change Reservation</button></td>
        <td><button id="` + rezervisano.delete + `" class="btn button_kurs3 button_delete dugme2_${rezervisano.name}" >
        Delete Reservation</button></td>
                    </tr>`);

            });
            postzahtev.fail(function (greska) {
                alert(greska.statusText);
            });
        }
    }

    function getujPodatke() {
        $("#tabela2 tbody").empty();
        var getzahtev = $.ajax({
            type: "GET",
            url: "http://localhost:3000/rezervisano"
        });
        getzahtev.done(function (rezervisano) {
            $.each(rezervisano, function (i, rezer) {
                $("#tabela2 tbody").append(`<tr>
                
         <td class="classValue_${rezer.name}">` + rezer.name + `</td>
        <td>` + rezer.surname + `</td>
        <td>` + rezer.email + `</td>
        <td>` + rezer.coursename + `</td>
        <td class="price">` + rezer.price + `</td>
        <td>` + rezer.note + `</td>
        <td><button id="change_${rezer.id}" class="btn button_kurs button_change dugme_${rezer.name}">
        Change Reservation</button></td>
        <td><button id="delete_${rezer.id}" class="btn button_kurs3 button_delete dugme2_${rezer.name}" >
        Delete Reservation</button></td>
        </tr>`);
            });
        });
        getzahtev.fail(function (greska) {
            alert(greska.statusText);
        });
    }

    $(document).ready(function () {
        $('#tableRezervisano').hide();
        $('#mainSwitchButton').on('click',
            function () {
                $('#tableKursevi, #tableRezervisano').toggle();
            }
        );
    });

    $('.reserv_button').click(function () {
        var $this = $(this);
        $this.toggleClass('reserv_button');
        if ($this.hasClass('reserv_button')) {
            $this.text('View Reservations');
        } else {
            $this.text('Back to Courses');
        }
    });


    $("#tabela2 tbody").on('click', 'button', function () {
        if ($(this).hasClass("button_delete")) {
            //brisanje
            var selektovaniId = $(this).attr("id").split("_")[1];
            $.ajax({
                url: "http://localhost:3000/rezervisano/" + selektovaniId,
                type: "DELETE",
                dataType: "json",
                success: function () {
                    alert("Uspesno obrisan korisnik.");
                    uspesnoBrisanje = true;
                },
                error: function () {
                    alert("Neuspesno brisanje.");
                    uspesnoBrisanje = false;
                }
            });
            $(this).parent().parent().remove();
        }
        else if ($(this).hasClass("button_change")) {
            let btnThis = $(this);
            let tr = this.parentNode.parentNode;
            $("#modalUpis").modal("toggle");
            $("#createEditModalLabel").text("Izmena");
            $("#name").val(tr.cells[0].childNodes[0].data);
            $("#surname").val(tr.cells[1].childNodes[0].data);
            $("#email").val(tr.cells[2].childNodes[0].data);
            $("#coursename").val(tr.cells[3].childNodes[0].data);
            $("#price").val(tr.cells[4].childNodes[0].data);
            $("#note").val(tr.cells[5].childNodes[0].data);
            $("#izmenaID").text(btnThis.attr("id").split("_")[1]);
        }
    });

    $("#unosForma").validate({

        messages: {
            name: {
                required: "Name is required!",
                minlength: "Your name must have more than 3 characters!"
            },
            surname: {
                required: "Surname is required!",
                minlength: "Your surname must have more than 3 characters!"
            },
            email: {
                required: "Enter valid e-mail!"
            }
        }
    });
});
