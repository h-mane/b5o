function callcheck() {
    var msg = $('#formcheck').serialize();
    $.ajax({
        type: 'POST',
        url: 'model/forms/ref.php',
        data: msg,
        success: function (data) {
            alert('Success: ' + data);
        },
        error: function (xhr, str) {
            alert('Возникла ошибка: ' + xhr.responseCode);
        }
    });
}

$(document).ready(function () {
    $('#footerModal').on('shown.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var template = button.data('template');
        var modal = $(this);
        $.get(template, function (data) {
            modal.find('.modal-body').html(data);
        });
    })

    $('#footerModal').on('hidden.bs.modal', function () {
        $(this).find('.modal-body').html('');
    })
});
