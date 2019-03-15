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

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

$(document).ready(function () {
    var timerID = null;
    var interval = Math.floor((Math.random() * (1800 * 1000)) + (3600 * 1000));
    $.getJSON("peopleGot8000.json", function (data) {
        var storageIndex = localStorage.getItem("i");
        var balance = localStorage.getItem("balance");
        var $banner = $('.banner');
        var $balance = $banner.find('.balance');
        if (storageIndex != null && balance != null) {
            $balance.text(balance);
            for (var i = 0; i <= storageIndex; i++) {
                $banner.append('<em>' + data[i] + '</em><br>');
            }
        }

        timerID = setInterval(new_customer, interval, data);
        if (storageIndex >= data.length || balance <= 8000) {
            clearInterval(timerID);
        }
    });

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

    function new_customer(data) {
        var i = 0;
        var balance = 360000;
        var $banner = $('.banner');
        var $balance = $banner.find('.balance');
        var storageIndex = localStorage.getItem('i');
        var storageBalance = localStorage.getItem('balance')
        if (storageIndex != null && storageBalance != null) {
            balance = parseInt(storageBalance);
            i = parseInt(storageIndex);
        }
        if (i == data.length || balance <= 8000) {
            return clearInterval(timerID);
        }
        i++;
        balance -= 8000;
        localStorage.setItem('i', i);
        localStorage.setItem('balance', balance);
        $banner.append('<em>' + data[i] + '</em><br>');
        $balance.text(balance);
        clearInterval(timerID);
        interval = Math.floor((Math.random() * (1800 * 1000)) + (3600 * 1000));
        timerID = setInterval(new_customer, interval, data);

    }
});
