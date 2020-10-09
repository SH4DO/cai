app.directive('dropZone', ['upload', function (upload) {
    return function (scope, element, attrs) {
        element.dropzone({
            url: "/",
            maxFilesize: 100,
            addRemoveLinks: true,
            dictDefaultMessage: 'Ingresa el archivo pdf',
            dictRemoveFile: 'Eliminar',
            autoQueue: false,
            uploadMultiple: false,
            parallelUploads: 1,
            accept: function (file) {
                var formdata = new FormData();
                if (file.type === 'application/pdf') {
                    var blob = file.slice(0, file['size'], file['type']);
                    var separador = file['type'].split('/', 2);
                    var name = upload.uuid() + '.' + separador[1];
                    var newFiles = new File([blob], name, { type: 'application/pdf' });
                    var caden = newFiles['name'] + "/" + file['name'];
                    upload.almacenarArray(caden);
                    formdata.append('file', newFiles);
                    upload.uploads(formdata);
                } else {
                    showMessage('Archivo no valido', 'error');
                }
            }
        });

        var showMessage = function (message, type) {
            Swal.fire({
                position: 'center',
                type: type,
                title: message,
                showConfirmButton: false,
                timer: 2000
            });
        } // ....

    }

}]);