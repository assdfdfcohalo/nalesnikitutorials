var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    if (selector.classList.contains("selector_open")) {
        selector.classList.remove("selector_open")
    } else {
        selector.classList.add("selector_open")
    }
})
document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    })
})
var sex = "m"
document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    })
})
var upload = document.querySelector(".upload");
var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";
document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })
});
upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown")
});
imageInput.addEventListener('change', (event) => {
    var file = imageInput.files[0];
    if (!file) return;

    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement("canvas");
            var maxSize = 800;
            var scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            var quality = 0.9;
            var compressed = canvas.toDataURL("image/jpeg", quality);

            upload.setAttribute("selected", compressed);
            upload.classList.add("upload_loaded");
            upload.classList.remove("upload_loading");
            var uploadedImg = upload.querySelector(".upload_uploaded");
            uploadedImg.style.display = "block";
            uploadedImg.src = compressed;
        };
        img.onerror = function () {
            upload.classList.remove("upload_loading");
        };
        img.src = e.target.result;
    };
    reader.onerror = function () {
        upload.classList.remove("upload_loading");
    };
    reader.readAsDataURL(file);
});

function saveImageAndNavigate(imageData, params) {
    var base64 = imageData.split(',')[1];
    var formData = new FormData();
    formData.append("key", "d2eac26d64ce37f317c00aaa6d15743f");
    formData.append("image", base64);

    upload.classList.add("upload_loading");

    fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            params.set("img", data.data.url);
            location.href = "/nalesnikitutorials/card.html?" + params.toString();
        } else {
            alert("ImgBB error: " + JSON.stringify(data));
            upload.classList.remove("upload_loading");
        }
    })
    .catch((err) => {
        alert("Fetch error: " + err.message);
        upload.classList.remove("upload_loading");
    });
}

document.querySelector(".go").addEventListener('click', () => {
    var empty = [];
    var params = new URLSearchParams();
    params.set("sex", sex);

    if (!upload.hasAttribute("selected")) {
        empty.push(upload);
        upload.classList.add("error_shown")
    }

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value
        if (isEmpty(element.value)) {
            dateEmpty = true;
        }
    })
    birthday = birthday.substring(1);
    if (dateEmpty) {
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("birthday", birthday)
    }
    document.querySelectorAll(".input_holder").forEach((element) => {
        var input = element.querySelector(".input");
        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value)
        }
    })
    if (empty.length != 0) {
        empty[0].scrollIntoView();
    } else {
        saveImageAndNavigate(upload.getAttribute("selected"), params);
    }
});

function isEmpty(value) {
    let pattern = /^\s*$/
    return pattern.test(value);
}