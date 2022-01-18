$(document).ready(function () {

    checkMM();
    $('#submit').click(function () {
        prevBackround();
        var checked = validate();
        if (!checked) {
            return;
        }
        connectMM().then((data) => {
            var wallet = data[0];
            $.post('./signup', {
                name: $("#txtName").val(),
                pass: $("#txtPass").val(),
                phone: $("#txtPhone").val(),
                email: $("#txtEmail").val(),
                address: $("#txtAddress").val(),
                wallet: wallet,
                type: document.querySelector('input[name="rActor"]:checked').value,
            }, function (value) {
                if (value.err == 2) {
                    $.Zebra_Dialog("Số điện thoại này đã được sử dụng", {
                        position: ["center", "top+50"],
                        title: "Thông báo đăng ký",
                        width: 460
                    });
                    return;
                }
                if (value.err > 0) {
                    $.Zebra_Dialog("Đăng ký không thành công", {
                        position: ["center", "top+50"],
                        title: "Thông báo đăng ký",
                        width: 460
                    });
                    return;
                }
                $("#divBody").css("background-color", "white");
                document.getElementById("divBody").innerHTML = "";
                $.Zebra_Dialog("Đăng ký thành công", {
                    position: ["center", "top+50"],
                    title: "Thông báo đăng ký",
                    width: 460
                });
            });
        });
    })
});
async function connectMM() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function prevBackround() {
    $("#divrGVaiTro").css("background-color", "white");
    $("#divName").css("background-color", "white");
    $("#divPhone").css("background-color", "white");
    $("#divPass").css("background-color", "white");
    $("#divGmail").css("background-color", "white");
    $("#divAddress").css("background-color", "white");
}

function validate() {
    var checked = false;
    if (!(document.querySelector('input[name="rActor"]:checked'))) {
        $("#divrGVaiTro").css("background-color", "rgb(255, 199, 199)");
    } else if ($("#txtName").val() == "") {
        $("#divName").css("background-color", "rgb(255, 199, 199)");
    } else if ($("#txtPhone").val() == "") {
        $("#divPhone").css("background-color", "rgb(255, 199, 199)");
    } else if ($("#txtPass").val() == "") {
        $("#divPass").css("background-color", "rgb(255, 199, 199)");
    } else if ($("#txtGmail").val() == "") {
        $("#divGmail").css("background-color", "rgb(255, 199, 199)");
    } else if ($("#txtAddress").val() == "") {
        $("#divAddress").css("background-color", "rgb(255, 199, 199)");
    } else checked = true;

    return checked;

}

function checkMM() {
    if (typeof window.ethereum !== 'undefined') {
        $.Zebra_Dialog("Metamask đã cài đặt", {
            auto_close: 2000,
            position: ["right - 20", "top + 20"],
            buttons: false,
            modal: false,
            type: "confirmation"
        });
    } else {
        $.Zebra_Dialog("Metamask chưa được cài đặt", {
            auto_close: 2000,
            position: ["right - 20", "top + 20"],
            buttons: false,
            modal: false,
            type: "confirmation"
        });
    }


}


